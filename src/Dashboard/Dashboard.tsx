import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import Header from "./Header";
import Modal from "../Auth/Modal";
import NewChannelForm from "./NewChannelForm";
import NewDirectMessageForm from "./NewDirectMessageForm";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showNewDirectMessage, setShowNewDirectMessage] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const navigate = useNavigate();

  const handleAddChannel = () => {
    setShowNewChannel(true);
  };

  const handleAddUser = () => {
    setShowNewDirectMessage(true);
  };

  const handleHideDirectMessageModal = () => {
    setShowNewDirectMessage(false);
  }

  const handleHideChannelMessageModal = () => {
    setShowNewChannel(false);
  }

  const handleLogout = () => {
    const keys = ["auth", "currentUser", "uid", "expiry", "client", "access-token", "receiver", "message"];

    keys.forEach(key => {
      localStorage.removeItem(key);
    });
    navigate("/");
  };

  useEffect(() => {
    const { "access-token": accessToken, client, expiry, uid } = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!accessToken && !client && !expiry && !uid) {
      setTimeout(() => {
        navigate("/");
      }, 10);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <button
        className="absolute top-1.5 right-2  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Header />
      <div className="flex flex-grow h-[95vh]">
        <Sidebar
          onAddChannel={handleAddChannel}
          onAddUser={handleAddUser}
        />
        <Workspace/>
      </div>

      {showNewChannel && (
        <Modal onClose={handleHideChannelMessageModal}>
          <NewChannelForm onHideModal={handleHideChannelMessageModal} />
        </Modal>
      )}
      {showNewDirectMessage && (
        <Modal onClose={handleHideDirectMessageModal}>
          <NewDirectMessageForm onHideModal={handleHideDirectMessageModal} />
        </Modal>
      )}
      {showUserProfile && (
        <Modal onClose={() => setShowUserProfile(false)}>
          <UserProfile name="User Name" email="user@example.com" userId={0} />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
