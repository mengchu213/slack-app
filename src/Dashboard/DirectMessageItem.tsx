import { useState } from "react";

export const DirectMessageItems = () => {
  const currentUserId: string = localStorage.currentUser || "";
  const userListsString = localStorage.getItem(`${currentUserId}`) ?? "[]";
  const userLists = JSON.parse(userListsString);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleButtonClick = (id: number) => {
    console.log(id);
    setSelectedId(id);
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
