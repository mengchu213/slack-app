import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
  createChannel,
  getUsers,
  addUserToChannel,
  getUsersInChannel,
} from "../utils/api";
import Select from "react-select";
import Modal from "../Auth/Modal";
import AddUserToChannelModal from "./AddUserToChannelModal";
import ViewChannelDetailsModal from "./ViewChannelDetailsModal";

interface NewChannelFormProps {
  setChannels: React.Dispatch<React.SetStateAction<any[]>>;
}

interface ChannelData {
  name: string;
  user_ids: number[];
}

interface User {
  id: number;
  email: string;
  value?: number;
  label?: string;
}

interface OptionType {
  value: number;
  label: string;
}

const NewChannelForm: React.FC<NewChannelFormProps> = ({setChannels}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<OptionType[]>([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [channelId, setChannelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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

  const handleAddUser = () => {
    if (channelId !== null) {
      setUserModalOpen(true);
    } else {
      console.log("Channel ID is not available!");
    }
  };

  const handleChannelDetail = () => {
    if (channelId !== null) {
      setChannelModalOpen(true);
    } else {
      console.log("Channel ID is not available!");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const channelData: ChannelData = {
        name: channelName,
        user_ids: selectedUsers.map((user) => user.value),
      };
      const response = await createChannel(channelData);
      const newChannel = response.data;
      setChannelId(newChannel.id);
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setSuccessMessage("Channel created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create channel");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  };

  const handleUserChange = (selectedOptions: readonly OptionType[], _: any) => {
    setSelectedUsers(selectedOptions as OptionType[]);
  };

  const options = users.map((user) => ({value: user.id, label: user.email}));

  return (
    <div>
      <button onClick={handleAddUser}>Add User to Channel</button>
      <button onClick={handleChannelDetail}>View Channel Details</button>
      {userModalOpen && channelId && (
        <Modal onClose={() => setUserModalOpen(false)}>
          <AddUserToChannelModal channelID={channelId} />
        </Modal>
      )}
      {channelModalOpen && channelId && (
        <Modal onClose={() => setChannelModalOpen(false)}>
          <ViewChannelDetailsModal channelID={channelId} />
        </Modal>
      )}

      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <label htmlFor="channel-name">Channel Name:</label>
        <input
          id="channel-name"
          type="text"
          value={channelName}
          onChange={handleInputChange}
        />
        <label htmlFor="users">Users:</label>
        <Select
          id="users"
          options={options}
          isMulti
          onChange={handleUserChange}
        />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default NewChannelForm;
