import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default to dark mode

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Error sending message. Please try again.");
    }
      setLoading(false);
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark' : 'light'}`}> 
      <div className="chat-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ marginBottom: 10, background: darkMode ? '#333' : '#eee', color: darkMode ? '#fff' : '#222', border: '1px solid #888' }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <h1>Ollama AI Chatbot (Qwen 2.5)</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  disabled={loading}
                  style={{ flex: 1, height: '100px', minHeight: '100px', maxHeight: '100px', resize: 'none' }}
                />
                <button onClick={sendMessage} disabled={loading || !message.trim()} style={{ width: '60px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5em', padding: 0 }}>
                  <span style={{ display: 'inline-block' }}>↑</span>
                </button>
            </div>
        <div className="response">
          {loading ? (
            <div className="loading-msg">
              <span role="status" aria-live="polite">🤖 Thinking... Please wait while the AI prepares a response.</span>
            </div>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;