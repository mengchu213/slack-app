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

  return (
    <li
      className="px-4 py-2 mb-1 hover:bg-gray-200 cursor-pointer"
      onMouseEnter={() => setShowTime(true)}
      onMouseLeave={() => setShowTime(false)}
    >
      <p className="text-sm text-gray-200">
        <strong className="text-white">{message.sender.uid}:</strong> {message.body}
      </p>
      {showTime && (
        <p className="text-xs text-gray-400">{new Date(message.created_at).toLocaleString()}</p>
      )}
    </li>
  );
};

export default MessageItem;
