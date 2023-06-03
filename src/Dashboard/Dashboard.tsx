import {useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import Header from "./Header";
import Modal from "../Auth/Modal";
import NewChannelForm from "./NewChannelForm";
import NewDirectMessageForm from "./NewDirectMessageForm";
import UserProfile from "./UserProfile";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";

interface DashboardProps {
  channels: any[]; // Or use a more specific type in place of `any` depending on your channels structure
  setChannels: Dispatch<SetStateAction<any[]>>; // Same here
  // Other props...
}
const Dashboard: React.FC<DashboardProps> = () => {
  const [channels, setChannels] = useState<Array<{id: string; name: string}>>(
    []
  );
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showNewDirectMessage, setShowNewDirectMessage] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const navigate = useNavigate();

  const handleAddChannel = () => {
    setShowNewChannel(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    setChannels([]);
    navigate("/");
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const storedChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      setChannels(storedChannels);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <button
        className="absolute top-10 right-0 m-4 p-2 bg-gray-300 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Header />
      <div className="flex flex-grow">
        <Sidebar
          onAddChannel={handleAddChannel}
          channels={channels}
          setChannels={setChannels}
        />

        <Workspace />
      </div>

      {showNewChannel && (
        <Modal onClose={() => setShowNewChannel(false)}>
          <NewChannelForm setChannels={setChannels} />
        </Modal>
      )}
      {showNewDirectMessage && (
        <Modal onClose={() => setShowNewDirectMessage(false)}>
          <NewDirectMessageForm />
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
