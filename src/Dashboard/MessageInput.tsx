import React, { useState } from "react";
import { sendMessages } from "../utils/api";

const MessageInput = ({ headers = {} }) => {
  const [body, setBody] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const receiver = JSON.parse(localStorage.getItem("receiver") || "{}");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendMessages({
        receiver_id: receiver.receiverId,
        receiver_class: receiver.receiverClass,
        body: body
      }, headers);
      setBody("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center p-4 bg-gray-600"
    >
      <input
        type="text"
        value={body}
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
