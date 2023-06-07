import {useState, useEffect} from "react";
import MessageItem from "./MessageItem";
import axios from "axios";

interface MessageListProps {
  channelId: number | null;
  messages: Array<{id: number; text: string; sender: string}>;
}

const MessageList: React.FC<MessageListProps> = ({channelId, messages}) => {
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
