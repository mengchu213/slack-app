import React, {useState} from "react";
import axios from "axios";

interface MessageInputProps {
  addMessage: (
    channelId: number,
    message: {id: number; text: string; sender: string}
  ) => void;
  selectedChannel: number | null;
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

    const newMessage = {
      receiver_id: selectedChannel,
      receiver_class: "Channel",
      body: message,
    };

    const headers = {
      "access-token": localStorage.getItem("access-token"),
      client: localStorage.getItem("client"),
      expiry: localStorage.getItem("expiry"),
      uid: localStorage.getItem("uid"),
    };

    try {
      const response = await axios.post(
        "http://206.189.91.54/api/v1/messages",
        newMessage,
        {headers}
      );

      console.log("Response data:", response.data); // Check the structure of the response data

      if (response.data.errors) {
        console.log("API errors:", response.data.errors);
      }

      console.log("API response:", response);

      const sender = localStorage.getItem("currentUserEmail");

      console.log("Sender:", sender); // Check if sender is what you expect

      if (response.status === 200 && sender) {
        const newMessage = {
          id: response.data.data.id,
          text: response.data.data.body,
          sender: sender,
        };
        console.log("New message:", newMessage); // Check the new message
        addMessage(selectedChannel, newMessage);
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to post message:", error);
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
