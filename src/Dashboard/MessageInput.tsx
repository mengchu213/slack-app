import React, {useState} from "react";
import {sendMessages, getAuthHeaders} from "../utils/api";

interface MessageInputProps {
  selectedChannel?: number | null;
}

const MessageInput: React.FC<MessageInputProps> = ({selectedChannel}) => {
  const [body, setBody] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedChannel != null) {
      try {
        const headers = getAuthHeaders();
        await sendMessages(
          {
            receiver_id: selectedChannel,
            receiver_class: "Channel",
            body: body,
          },
          headers
        );
        setBody("");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No channel selected");
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
        className="flex-grow px-4 py-2 mr-2 bg-gray-300 rounded-lg focus:outline-none"
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
