import React, {useState, useEffect} from "react";
import MessageItem from "./MessageItem";

interface Message {
  id: number;
  body: string;
  created_at: string;
  sender: string;
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const messagesFromStorage: any[] = JSON.parse(
        localStorage.getItem("message") || "[]"
      );

      const formattedMessages: Message[] = messagesFromStorage.map(
        (message) => ({
          id: message.id,
          body: message.body,
          created_at: message.created_at,
          sender: message.sender.email,
        })
      );

      setMessages(formattedMessages);
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
