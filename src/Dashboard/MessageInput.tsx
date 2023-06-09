import React, {useState} from "react";
import {sendMessages} from "../utils/api";

const MessageInput = ({headers = {}}) => {
  const [body, setBody] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const receiver = JSON.parse(localStorage.getItem("receiver") || "{}");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendMessages(
        {
          receiver_id: receiver.receiverId,
          receiver_class: receiver.receiverClass,
          body: body,
        },
        headers
      );
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
        className="flex-grow px-4 py-2 mr-2 bg-gray-300 rounded-lg focus:outline-none "
      />
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 text-center"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
