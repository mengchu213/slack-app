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
    <li>
      <p>
        <strong>{message.sender}:</strong> {message.text}
      </p>
    </li>
  );
};

export default MessageItem;
