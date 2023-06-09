import React, {useState, useEffect} from "react";
import {getUsersInChannel} from "../utils/api";

const ViewChannelDetailsModal = ({channelID}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsersInChannel(channelID);
      setUsers(fetchedUsers.data);
    };

    fetchUsers();
  }, [channelID]);

  return (
    <div>
      <h2>Channel Details</h2>
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  );
};

export default ViewChannelDetailsModal;
