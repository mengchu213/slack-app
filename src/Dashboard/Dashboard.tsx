import React, {useState} from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import Header from "./Header";
import Modal from "../Auth/Modal";
import NewChannelForm from "./NewChannelForm";
import NewDirectMessageForm from "./NewDirectMessageForm";
import UserProfile from "./UserProfile";

const Dashboard = () => {
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showNewDirectMessage, setShowNewDirectMessage] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleAddChannel = () => {
    setShowNewChannel(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar onAddChannel={handleAddChannel} />
        <Workspace />
      </div>

      {showNewChannel && (
        <Modal onClose={() => setShowNewChannel(false)}>
          <NewChannelForm />
        </Modal>
      )}
      {showNewDirectMessage && (
        <Modal onClose={() => setShowNewDirectMessage(false)}>
          <NewDirectMessageForm />
        </Modal>
      )}
      {showUserProfile && (
        <Modal onClose={() => setShowUserProfile(false)}>
          <UserProfile name="User Name" email="user@example.com" />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
