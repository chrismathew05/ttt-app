import { useEffect } from 'react';

import "./Chat.css"

export const Chat = ({ chatMessages }) => {
    useEffect(() => {
        const el = document.getElementById('chat');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div id="chat" className="chatBox">
            {chatMessages.map((chatMessage, idx) => (
                <div key={`chatMessage-${idx}`}>
                    {`${chatMessage["senderId"]}: ${chatMessage["chatMessage"]}`}
                </div>
            ))}
        </div>
    );
}
