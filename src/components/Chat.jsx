import { useEffect } from 'react';

import "./Chat.css"

/**
 * Chat box used for real-time communication b/w players
 */
export const Chat = ({ socket, chatMessages }) => {
    // auto-scrolls chat window to bottom of messages
    useEffect(() => {
        const el = document.getElementById('chat');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [chatMessages]);

    // triggers prompt for user to send message to websocket
    const sendChatMessage = () => {
        const message = prompt("Enter your message here.");
        if (message) {
            socket.send(JSON.stringify({ "action": "sendMessage", "message": message }));
        }
    }

    return (
        <div className="row">
            <div className="column">
                <h3>Chat:</h3>
                <div id="chat" className="chatBox">
                    <b>Welcome! Click 'Post Message' below to get started...</b>
                    {chatMessages.map((chatMessage, idx) => (
                        <div key={`chatMessage-${idx}`}>
                            {`${chatMessage["senderId"]}: ${chatMessage["chatMessage"]}`}
                        </div>
                    ))}
                </div>
                <button onClick={sendChatMessage}>Post Message</button>
            </div>
        </div>
    );
}
