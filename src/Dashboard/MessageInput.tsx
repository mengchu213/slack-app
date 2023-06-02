import React, {useState} from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Send message:", message);
    setMessage("");
    // Here you would typically send the message to your backend.
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message here"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
