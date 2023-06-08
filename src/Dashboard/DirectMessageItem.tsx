import { useState, useEffect } from "react";
import { getMessages } from "../utils/api";

export const DirectMessageItems = () => {
  const currentUserId: string = localStorage.currentUser || "";
  const userListsObject = JSON.parse(localStorage.getItem(currentUserId) || "{}");
  const userLists = userListsObject.userLists || [];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleButtonClick = async (id: number) => {
    setSelectedId(id);
    localStorage.setItem("receiver", JSON.stringify({receiverId: id, receiverClass: "User"}))
    try {
      const response = await getMessages(id, "User");
      setMessages(response.data);
      localStorage.setItem("message", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let interval: any;
    if (selectedId !== null) {
      interval = setInterval(async () => {
        try {
          const response = await getMessages(selectedId, "User");
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
    <div>
      {userLists.map((list: any, index: number) => (
        <div key={index}>
          {list.map((user: any) => (
            <button
              key={user.id}
              onClick={() => handleButtonClick(user.id)}
              className={`px-5 py-1 hover:bg-gray-600 cursor-pointer ${
                user.id === selectedId ? "bg-gray-600 text-white" : ""
              }`}
            >
              {user.uid}
            </button>
          ))}
        </div>
      ))}
      {messages.map((message: any) => (
        <div key={message.id}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};
