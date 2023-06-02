import MessageItem from "./MessageItem";

const MessageList = () => {
  // This data would typically come from your backend.
  const messages = [
    {id: 1, text: "Hello, world!", sender: "User1"},
    {id: 2, text: "Hello, everyone!", sender: "User2"},
    // ...
  ];

  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default MessageList;
