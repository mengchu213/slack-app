import { useState, useEffect } from "react";
import { getMessages } from "../utils/api";

export const ChannelItem = () => {
  const currentUserId: string = localStorage.currentUser || "";
  const channelListsObject = JSON.parse(localStorage.getItem(currentUserId) || "{}");
  const channelLists = channelListsObject.channelLists || [];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleButtonClick = async (id: number) => {
    setSelectedId(id);
    localStorage.setItem("receiver", JSON.stringify({ receiverId: id, receiverClass: "Channel" }))
    try {
      const response = await getMessages(id, "Channel");
      setMessages(response.data);
      localStorage.setItem("message", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let interval: any;
    if (selectedId !== null && localStorage.receiver.receiverClass === "Channel") {
      interval = setInterval(async () => {
        try {
          const response = await getMessages(selectedId, "Channel");
          setMessages(response.data);
          localStorage.setItem("message", JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [selectedId]);


  return (
    <div className="border-b">
      {channelLists.map((list: any, index: number) => (
        <div key={index}>
          {list.map((channel: any) => (
            <button
              key={`${channel.id}-${index}`}
              onClick={() => handleButtonClick(channel.id)}
              className={`flex items-center justify-between px-5 py-2 rounded-lg hover:bg-gray-600 cursor-pointer transition duration-200 w-11/12 text-left ${channel.id === selectedId ? "bg-gray-600 text-white shadow-lg" : ""
                }`}
            >
              <span className="font-bold">{channel.name}</span>
              {channel.id === selectedId && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>

          ))}
        </div>
      ))}
      {messages.map((message: any, index) => (
        <div key={`${message.id}-${index}`}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};
