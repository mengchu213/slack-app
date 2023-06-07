import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";

interface Message {
  id: number;
  body: string;
  created_at: string;
  receiver: { id: number; provider: string; uid: string };
  sender: { id: number; provider: string; uid: string };
}

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const messagesFromStorage: Message[] = JSON.parse(
        localStorage.getItem("message") || "[]"
      );
      setMessages(messagesFromStorage);
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ul className="flex-grow overflow-auto border-t border-gray-200 mt-2 pt-2">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default MessageList;
