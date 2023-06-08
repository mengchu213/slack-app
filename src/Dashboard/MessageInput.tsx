import React, {useState} from "react";
import axios from "axios";
import {sendMessage, getAuthHeaders} from "../utils/api"; // Import from your API file

interface MessageInputProps {
  addMessage: (channelId: number, message: Message) => void;
  selectedChannel: number | null;
}

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
  senderEmail?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  addMessage,
  selectedChannel,
}) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedChannel) {
      return;
    }

    const sender_id = Number(localStorage.getItem("uid"));
    const currentUserEmail = localStorage.getItem("email");
    const newMessage = {
      body: message,
      sender_id,
      receiver_id: selectedChannel,
      receiver_class: "Channel",
      senderEmail: currentUserEmail,
    };

    try {
      const response = await sendMessage(newMessage, getAuthHeaders());

      if (response.errors) {
        console.log("API errors:", response.errors);
      } else {
        const returnedMessage = response;
        addMessage(selectedChannel, returnedMessage);
        setMessage("");
      }
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
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
