import {useState} from "react";
import {getMessages} from "../utils/api";

export const DirectMessageItems = () => {
  const currentUserId: string = localStorage.currentUser || "";
  const userListsObject = JSON.parse(
    localStorage.getItem(currentUserId) || "{}"
  );
  const userLists = userListsObject.userLists || [];

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleButtonClick = async (id: number) => {
    console.log(id);
    setSelectedId(id);
    try {
      const response = await getMessages(id, "User");
      console.log(response);
      localStorage.setItem("message", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

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
    </div>
  );
};
