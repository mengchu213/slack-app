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
  messages: Record<number, Message[]>;
}

const MessageList: React.FC<MessageListProps> = ({channelId, messages}) => {
  const messagesForChannel =
    channelId !== null && messages[channelId] ? messages[channelId] : [];
  console.log("Received these messages:", messagesForChannel);

  return (
    <ul className="flex-grow overflow-auto">
      {messagesForChannel.map((message: Message, index: number) =>
        message.id ? <MessageItem key={index} message={message} /> : null
      )}
    </ul>
  );
};

export default MessageList;
