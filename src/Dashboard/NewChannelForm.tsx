import React, {useState, useEffect} from "react";
import {createChannel, getUsers} from "../utils/api";
import Select from "react-select";

interface NewChannelFormProps {
  onHideModal: () => void;
}
interface ChannelData {
  name: string;
  user_ids: number[];
}

const NewChannelForm = ({ onHideModal }: NewChannelFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        };
        const response = await getUsers();
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      };
      const channelData: ChannelData = {
        name: channelName,
        user_ids: [localStorage.currentUser, ...selectedUsers.map((user) => user.value)],
      };
      console.log(channelData);
      const response = await createChannel(channelData);
      const newChannel = response.data;
      console.log(response);
      console.log(newChannel);
      setSuccessMessage("Channel created successfully");
      onHideModal();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create channel");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  };

  const handleUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  const options = users.map((user) => ({value: user.id, label: user.email}));

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <label
        htmlFor="channel-name"
        className="flex justify-center items-center "
      >
        Channel Name:
      </label>
      <input
        id="channel-name"
        type="text"
        value={channelName}
        onChange={handleInputChange}
      />
      <label htmlFor="users" className="px-5">
        Users:
      </label>
      <Select
        id="users"
        options={options}
        isMulti
        onChange={handleUserChange}
        className="w-1/2 flex justify-center items-center"
      />
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex justify-center items-center"
      >
        Create Channel
      </button>
    </form>
  );
};

export default NewChannelForm;
