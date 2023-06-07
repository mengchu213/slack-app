import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: Array<{id: number; text: string; sender: string}>;
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
  console.log("MessageList messages:", messages);
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
