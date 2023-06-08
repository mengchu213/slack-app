import {useState, useEffect} from "react";
import MessageItem from "./MessageItem";

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
  senderEmail?: string;
}

interface MessageListProps {
  channelId: number | null;
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({
  channelId,
  messages = [],
}) => {
  console.log("Received these messages:", messages);
  return (
    <ul className="flex-grow overflow-auto">
      {Array.isArray(messages) &&
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
    </ul>
  );
};

export default MessageList;
