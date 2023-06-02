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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <Workspace />
      </div>

      {showNewChannel && (
        <Modal>
          <NewChannelForm />
        </Modal>
      )}
      {showNewDirectMessage && (
        <Modal>
          <NewDirectMessageForm />
        </Modal>
      )}
      {showUserProfile && (
        <Modal>
          <UserProfile />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
