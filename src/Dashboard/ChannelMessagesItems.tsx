import {useEffect, useState} from "react";
import axios from "axios";

export const ChannelMessagesItems = () => {
  const [channels, setChannels] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
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
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/messages?receiver_id=${id}&receiver_class=Channel`,
        {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("channelMessages", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    </div>
  );
};
