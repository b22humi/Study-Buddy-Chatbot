import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text) => {
    const userMessage = text || message;

    if (userMessage.trim() === "") return;

    let botReply = "";
    const lowerMessage=userMessage.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")|| lowerMessage.includes("how are you")) {
      botReply = "Hi! 👋 How can I help you?";
    } 
    else if (lowerMessage.includes("java") ) {
      botReply = "Great! ☕ Java is an object-oriented programming language. What would you like to learn about Java?";
    }
    
    else if (lowerMessage.includes("dsa") ) {
      botReply = "Let's practice DSA! 💻";
    } 
    else if (lowerMessage.includes("react")) {
       botReply = "React is a JavaScript library used to build user interfaces and web applications. ⚛️";
    }

    else if (
  lowerMessage.includes("git") ||
  lowerMessage.includes("github")
) {
  botReply = "Git is a version control system, while GitHub is a platform where you can store and collaborate on Git repositories. 🚀";
}

else if (
  lowerMessage.includes("ai") ||
  lowerMessage.includes("machine learning")
) {
  botReply = "AI is the broader field of making machines perform tasks that normally require human intelligence. Machine Learning is a part of AI that learns patterns from data. 🤖";
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
 
  if (!isLoggedIn) {
  return <Login onLogin={() => setIsLoggedIn(true)} ></Login>;
}

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