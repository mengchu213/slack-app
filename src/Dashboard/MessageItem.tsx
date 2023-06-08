import React from "react";

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
  senderEmail?: string;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
  return (
    <li className="px-4 py-2">
      <p className="text-sm text-gray-200">
        <strong className="text-white">{message.sender_id}:</strong>{" "}
        <p>{message.senderEmail}</p>
        {message.body}
      </p>
    </li>
  );
};

export default MessageItem;
