import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text) => {
    const userMessage = text || message;

    if (userMessage.trim() === "") return;

    let botReply = "";

    if (userMessage.toLowerCase() === "hello") {
      botReply = "Hi! 👋 How can I help you?";
    } 
    else if (userMessage.toLowerCase() === "java") {
      botReply = "Great! Let's learn Java together. ☕";
    } 
    else if (userMessage.toLowerCase() === "dsa") {
      botReply = "Let's practice DSA! 💻";
    } 
    else {
      botReply = "Sorry, I don't understand that yet.";
    }

    // Add user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage }
    ]);

    setMessage("");
    setIsTyping(true);

    // Bot reply after 1 second
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply }
      ]);

      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (question) => {
    sendMessage(question);
  };

  return (
    <div className="chatbot">

      <header className="chat-header">
        <h2>🤖 Study Buddy</h2>
      </header>

      <main className="chat-body">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}-message`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
          🤖....
          </div>
        )}

      </main>

      <div className="suggestions">

        <button onClick={() => handleSuggestion("hello")}>
          Say Hello
        </button>

        <button onClick={() => handleSuggestion("java")}>
          Learn Java
        </button>

        <button onClick={() => handleSuggestion("dsa")}>
          Learn DSA
        </button>

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={() => sendMessage()}>
          Send
        </button>

        <button onClick={() => {
          setMessages([]);
        }}>
          Clear Chat
        </button>

      </div>

    </div>
  );
}

export default App;