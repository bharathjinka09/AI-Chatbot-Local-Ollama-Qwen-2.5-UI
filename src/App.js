import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="chat-container">
        <div className="chat-container">
          <h1>Ollama AI Chatbot (Qwen 2.5)</h1>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>Send</button>
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