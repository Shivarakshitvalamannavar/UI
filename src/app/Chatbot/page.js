"use client";

import { useState } from "react";
import axios from "axios";
import './index.css';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [file, setFile] = useState(null);

    const sendMessage = async () => {
        if (!message.trim() && !file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            if (message.trim()) {
                // formData.append('message', `${message} limit your response to 10 lines and try to make it points and give a new line after each point`); // Adjust based on API requirements
                formData.append('message', `${message} Respond in bullet points with each point on a new line.`);
            }
            if (file) {
                formData.append('file', file);
            }

            const res = await axios.post('/api/Chatbot', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const botResponse = res.data.reply.replace(/\.\s/g, ".\n"); // Adds a new line after each sentence

            setHistory([...history, { user: message || file.name, bot: botResponse }]);
            setMessage('');
            setFile(null);
        } catch (error) {
            setHistory([...history, { user: message || file.name, bot: 'Error communicating with chatbot' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container text-black">
            <h2 className="chatbot-title text-black">Chatbot</h2>
            <div className="chatbot-history text-black">
                {history.map((entry, index) => (
                    <div key={index} className="chatbot-message text-black">
                        <p><strong>You:</strong> {entry.user}</p>
                        <p><strong>Bot:</strong> {entry.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
                disabled={loading}
                className="chatbot-input text-black" 
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={loading}
                className="chatbot-file-input text-black"
            />
            <button onClick={sendMessage} disabled={loading} className="chatbot-button text-black">
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default Chatbot;