import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage]=useState(" ");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
  if (message.trim() === "") return;

  let botReply = "";

  if (message.toLowerCase() === "hello") {
    botReply = "Hi! 👋 How can I help you?";
  } 
  else if (message.toLowerCase() === "java") {
    botReply = "Great! Let's learn Java together. ☕";
  } 
  else if (message.toLowerCase() === "dsa") {
    botReply = "Let's practice DSA! 💻";
  } 
  else {
    botReply = "Sorry, I don't understand that yet.";
  }

  setMessages([
    ...messages,
    { sender: "user", text: message },
    { sender: "bot", text: botReply }
  ]);

  setMessage("");
};
  return (
    <>
      <div className="chatbot">

      <header className="chat-header">
        <h2>🤖 Study Buddy </h2>
      </header>

      <main className="chat-body">

        {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}-message`}>
              {msg.text}
               </div>
        ))}

      </main>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
            

    </>
  )
}

export default App
