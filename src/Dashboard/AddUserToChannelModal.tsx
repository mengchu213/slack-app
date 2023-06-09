import React, {useState, useEffect} from "react";
import {getUsers, addUserToChannel} from "../utils/api";

const AddUserToChannelModal = ({channelID}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers.data);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (userID) => {
    try {
      await addUserToChannel(channelID, userID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add User to Channel</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
          <button onClick={() => handleAddUser(user.id)}>Add to Channel</button>
        </div>
      ))}
    </div>
  );
};

export default AddUserToChannelModal;
