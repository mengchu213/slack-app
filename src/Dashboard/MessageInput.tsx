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
    //send the message to your backend.
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center p-4 bg-gray-600"
    >
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message here"
        className="flex-grow px-4 py-2 mr-2 bg-gray-300 rounded-l-full focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-800 text-white rounded-r-full focus:outline-none"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
