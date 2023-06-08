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
}

const MessageList: React.FC<MessageListProps> = ({channelId}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (channelId !== null) {
      const storedMessages = localStorage.getItem(channelId.toString());
      if (storedMessages !== null) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [channelId]);

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
