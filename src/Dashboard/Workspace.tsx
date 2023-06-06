import React, {useState, useEffect} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import axios from "axios";

interface WorkspaceProps {
  selectedChannel: number | null;
  selectedChannelName: string | null;
}

const Workspace: React.FC<WorkspaceProps> = ({
  selectedChannel,
  selectedChannelName,
}) => {
  const [messages, setMessages] = useState<
    {id: number; text: string; sender: string}[]
  >([]);

  const addMessage = (message: {id: number; text: string; sender: string}) =>
    setMessages([...messages, message]);

  useEffect(() => {
    console.log(messages); // console log for debugging
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChannel) {
        setMessages([]);
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
          setMessages(
            response.data.map((message: any) => ({
              id: message.id,
              text: message.body,
              sender: message.sender,
            }))
          );
        } else {
          setMessages([]);
        }
      } catch (err) {
        setMessages([]);
      }
    };

    fetchMessages();
  }, [selectedChannel]);

  return (
    <div className="flex flex-col flex-grow bg-gray-700">
      <div>
        {selectedChannelName
          ? `Channel: ${selectedChannelName}`
          : "No Channel Selected"}
      </div>

      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} selectedChannel={selectedChannel} />
    </div>
  );
};

export default Workspace;
