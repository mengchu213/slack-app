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
            className={`flex items-center justify-between px-5 py-2 rounded-lg hover:bg-gray-600 cursor-pointer transition duration-200 w-11/12 text-left ${
              user.id === selectedId ? "bg-gray-600 text-white shadow-lg" : ""
            }`}
          >
            <span className="font-bold">{user.uid}</span>
            {user.id === selectedId && (
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
      {messages.map((message: any) => (
        <div key={message.id}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};
