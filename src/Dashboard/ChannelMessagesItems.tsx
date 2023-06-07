import {useState} from "react";
import {getMessages} from "../utils/api";

export const ChannelMessageItems = () => {
  const currentUserId: string = localStorage.currentUser || "";
  const channelListsObject = JSON.parse(
    localStorage.getItem(currentUserId) || "{}"
  );
  const channelLists = channelListsObject.channelLists || [];

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleButtonClick = async (id: number) => {
    console.log(id);
    setSelectedId(id);
    try {
      const response = await getMessages(id, "Channel");
      console.log(response);
      localStorage.setItem("message", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {channelLists.map((list: any, index: number) => (
        <div key={index}>
          {list.map((channel: any) => (
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
      ))}
    </div>
  );
};
