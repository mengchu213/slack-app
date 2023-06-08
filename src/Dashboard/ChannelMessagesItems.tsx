import {useState, useEffect} from "react";
import axios from "axios";
import {getMessages} from "../utils/api";

export const ChannelMessagesItems = () => {
  const [channels, setChannels] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const API_URL = "http://206.189.91.54/";

  useEffect(() => {
    const fetchUserChannels = async () => {
      const response = await axios.get(`${API_URL}/api/v1/channels`, {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
        },
      });

      if (response.status === 200) {
        setChannels(response.data);
      }
    };

    fetchUserChannels();
  }, []);

  const handleButtonClick = async (id: number) => {
    setSelectedId(id);
    localStorage.setItem(
      "receiver",
      JSON.stringify({receiverId: id, receiverClass: "Channel"})
    );
    try {
      const response = await getMessages(id, "Channel");
      setMessages(response.data);
      localStorage.setItem("channelMessages", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let interval: any;
    if (selectedId !== null) {
      interval = setInterval(async () => {
        try {
          const response = await getMessages(selectedId, "Channel");
          setMessages(response.data);
          localStorage.setItem(
            "channelMessages",
            JSON.stringify(response.data)
          );
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [selectedId]);

  return (
    <div>
      {channels.map((channel: any) => (
        <button
          key={channel.id}
          onClick={() => handleButtonClick(channel.id)}
          className={`px-5 py-1 hover:bg-gray-600 cursor-pointer ${
            channel.id === selectedId ? "bg-gray-600 text-white" : ""
          }`}
        >
          {channel.name}
        </button>
      ))}
      {messages.map((message: any) => (
        <div key={message.id}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};
