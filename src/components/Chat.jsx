import { useState } from 'react';

import "./Chat.css"

export const Chat = ({ chatMessages }) => {
    return (
        <div className="chatBox">
            {chatMessages.map((chatMessage, idx) => (
                <span key={`chatMessage-${idx}`}>
                    {`${chatMessage}`}
                </span>
            ))}
        </div>
    );
}
