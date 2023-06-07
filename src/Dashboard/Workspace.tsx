import React, {useState, useEffect} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import axios from "axios";

interface WorkspaceProps {
  selectedChannel: number | null;
  selectedChannelName: string | null;
  messages: Array<{id: number; text: string; sender: string}>;
  addMessage: (
    channelId: number,
    message: {id: number; text: string; sender: string}
  ) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  selectedChannel,
  selectedChannelName,
  messages,
  addMessage,
}) => {
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChannel) {
        return;
      }

      const headers = {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      };

      try {
        const response = await axios.get(
          `http://206.189.91.54/api/v1/messages?receiver_id=${selectedChannel}&receiver_class=Channel`,
          {headers}
        );

        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            const fetchedMessages = response.data.map((message: any) => ({
              id: message.id,
              text: message.body,
              sender: message.sender,
            }));
            console.log("fetchedMessages:", fetchedMessages);

            fetchedMessages.forEach((message) => {
              addMessage(selectedChannel, message);
            });
          } else {
            console.log("Unexpected data structure", response.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedChannel, addMessage]);
  const handleAddMessage = (
    channelId: number,
    message: {id: number; text: string; sender: string}
  ) => {
    addMessage(channelId, message);
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-700 ">
      <div className="text-blue-500  px-5 py-5 text-2xl font-semibold">
        {selectedChannelName
          ? `Channel: ${selectedChannelName}`
          : "No Channel Selected"}
      </div>

      <MessageList messages={messages} />

      <MessageInput
        addMessage={handleAddMessage}
        selectedChannel={selectedChannel}
      />
    </div>
  );
};

export default Workspace;
