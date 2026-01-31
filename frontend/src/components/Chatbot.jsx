import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();

            const botMessage = { text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
        }

        setInput('');
        setLoading(false);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
            <h3>{t('chatbot.title', 'Insurance Assistant')}</h3>

            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #eee', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '10px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Assistant'}:</strong> {msg.text}
                    </div>
                ))}
                {loading && <div>Typing...</div>}
            </div>

            <div style={{ marginTop: '10px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={t('chatbot.placeholder', 'Ask about insurance...')}
                    style={{ width: '80%', padding: '10px' }}
                />
                <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>
                    {t('common.send', 'Send')}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
