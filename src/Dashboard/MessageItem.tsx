import React from "react";

interface Sender {
  id: number;
  provider: string;
  uid: string;
}

interface Message {
  id: number;
  body: string;
  created_at: string;
  receiver: {id: number; provider: string; uid: string};
  sender: Sender;
}

interface MessageItemProps {
  message: {id: number; text: string; sender: string};
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
