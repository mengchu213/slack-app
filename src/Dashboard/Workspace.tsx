import React, {useState, useEffect} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {getMessages, getAuthHeaders} from "../utils/api";
interface Sender {
  id: number;
  provider: string;
  uid: string;
}

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
}

interface WorkspaceProps {
  selectedChannel: number | null;
  selectedChannelName: string | null;
  messages: Record<number, Message[]>;
  addMessage: (channelId: number, message: Message) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  selectedChannel,
  selectedChannelName,
  addMessage,
}) => {
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  useEffect(() => {
    console.log("messages state changed:", messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChannel) {
        return;
      }

      try {
        const response = await getMessages(
          selectedChannel,
          "Channel",
          getAuthHeaders()
        );
        if (response.data && Array.isArray(response.data)) {
          const fetchedMessages = response.data;
          setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedChannel]: fetchedMessages,
          }));
          console.log("Current state of messages:", messages);
        } else {
          console.log("Unexpected data structure", response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedChannel, addMessage]);

  console.log(
    "Passing these messages to MessageList:",
    selectedChannel !== null && messages.hasOwnProperty(selectedChannel)
      ? messages[selectedChannel]
      : []
  );

  return (
    <div className="flex flex-col flex-grow bg-gray-700 ">
      <div className="text-blue-500  px-5 py-5 text-2xl font-semibold">
        {selectedChannelName
          ? `Channel: ${selectedChannelName}`
          : "No Channel Selected"}
      </div>

      <MessageList
        channelId={selectedChannel}
        messages={
          selectedChannel !== null && messages.hasOwnProperty(selectedChannel)
            ? messages[selectedChannel]
            : []
        }
      />

      <MessageInput addMessage={addMessage} selectedChannel={selectedChannel} />
    </div>
  );
};

export default Workspace;
