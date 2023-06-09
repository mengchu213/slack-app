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
  senderEmail?: string;
}

interface WorkspaceProps {
  selectedChannel?: number | null;
  selectedChannelName: string | null;
  messages: Record<number, Message[]>;
  addMessage: (channelId: number, newMessage: Message) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  selectedChannel,
  selectedChannelName,
  messages,
  addMessage,
}) => {
  useEffect(() => {
    if (selectedChannel) {
      localStorage.setItem(
        "receiver",
        JSON.stringify({receiverId: selectedChannel, receiverClass: "Channel"}) // receiverClass could be something else based on your requirements
      );
    }
  }, [selectedChannel]);

  useEffect(() => {
    let isCancelled = false;

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
        if (!isCancelled && response.data && Array.isArray(response.data)) {
          response.data.forEach((message) => {
            addMessage(selectedChannel, message);
          });
        } else {
          console.log("Unexpected data structure", response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    return () => {
      isCancelled = true;
    };
  }, [selectedChannel, addMessage]);

  return (
    <div className="flex flex-col flex-grow bg-gray-700 ">
      <div className="text-blue-500  px-5 py-5 text-2xl font-semibold">
        {selectedChannelName
          ? `Channel: ${selectedChannelName}`
          : "No Channel Selected"}
      </div>

      <MessageList channelId={selectedChannel ?? null} messages={messages} />
      <MessageInput selectedChannel={selectedChannel ?? null} />
    </div>
  );
};

export default Workspace;
