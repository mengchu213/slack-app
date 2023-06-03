import React from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
  return (
    <li className="px-4 py-2">
      <p className="text-sm text-gray-200">
        <strong className="text-white">{message.sender}:</strong> {message.text}
      </p>
    </li>
  );
};

export default MessageItem;
