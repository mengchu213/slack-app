import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getUserss } from "../utils/api";

interface NewDirectMessageFormProps {
  onHideModal: () => void;
}
interface User {
  id?: string;
  email?: string;
}

interface selectedUsers {
  value: string;
  email: string;
}


const NewDirectMessageForm: React.FC<NewDirectMessageFormProps> = ({ onHideModal }) => {
  const [, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<selectedUsers>({ value: "", email: "" });
  const [userLists, setUserLists] = useState<any[]>([]);
  const [, setErrorMessage] = useState("");

  useEffect(() => {
    const currentUserId: string = localStorage.currentUser || "";
    const userListsObject = JSON.parse(localStorage.getItem(currentUserId) || '{}');
    const userLists = userListsObject.userLists || [];
    setUserLists(userLists);
  }, []);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const selectedUser = { id: selectedUsers.value, uid: selectedUsers.email };
  
      const currentUserId: string = localStorage.currentUser || "";
  
      const userListsObject = JSON.parse(localStorage.getItem(currentUserId) || '{}');
      const userLists = userListsObject.userLists || [];
  
      const updatedUserLists = [...userLists, [selectedUser]];
      localStorage.setItem(currentUserId, JSON.stringify({ ...userListsObject, userLists: updatedUserLists }));
  
      setUserLists(updatedUserLists);
      setSelectedUsers({ value: "", email: "" });
      setUsername("");
      onHideModal();
    } catch (error) {
      console.error(error);
    }
  };
  


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        };
        const response = await getUserss(headers);
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleUserChange = (selectedOptions: any) => {
    setSelectedUsers({ value: selectedOptions.value, email: selectedOptions.label });
  };

  let options = users.map((user) => ({ value: user.id || "", label: user.email || "" }));

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <Select
        id="users"
        options={options}
        value={{ value: selectedUsers.value, label: selectedUsers.email }}
        onChange={handleUserChange}
        className="w-1/2 flex justify-center items-center"
      />
      <button
        type="submit"
        disabled={!selectedUsers.value || userLists.some(list => list.some((user: { id: string; }) => user.id === selectedUsers.value))}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Send Direct Message
      </button>

    </form>
  );
};

export default NewDirectMessageForm;