import React, { useState } from "react";

interface Message {
  id: number;
  body: string;
  created_at: string;
  receiver: { id: number; provider: string; uid: string };
  sender: { id: number; provider: string; uid: string };
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [showTime, setShowTime] = useState(false);
  const isSender = localStorage.uid === message.sender.uid;

  const messageLines = message.body.split("\n");

  return (
    <li
      className={`chat-message flex ${
        isSender ? "justify-end" : "justify-start"
      }`}
      onMouseEnter={() => setShowTime(true)}
      onMouseLeave={() => setShowTime(false)}
    >
      {!isSender && (
        <div className="sender-avatar w-6 h-6 rounded-full flex-shrink-0 mr-2">
          <img
            src={`https://ui-avatars.com/api/?name=${message.sender.uid}&background=0D8ABC&color=fff&size=32`}
            alt={message.sender.uid}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}
      <div
        className={`message-content bg-gray-200 text-gray-800 p-2 rounded-xl max-w-md ${
          isSender ? "ml-auto" : "mr-auto"
        }`}
      >
        {messageLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== messageLines.length - 1 && <br />}
          </React.Fragment>
        ))}
        {showTime && (
          <div className="timestamp text-xs text-gray-400 mt-1">
            {new Date(message.created_at).toLocaleString()}
          </div>
        )}
      </div>
    </li>
  );
};

export default MessageItem;
