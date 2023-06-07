import {useState, useEffect, Dispatch, SetStateAction} from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import Header from "./Header";
import Modal from "../Auth/Modal";
import NewChannelForm from "./NewChannelForm";
import NewDirectMessageForm from "./NewDirectMessageForm";
import UserProfile from "./UserProfile";
import {useNavigate} from "react-router-dom";

interface DashboardProps {
  channels: any[];
  setChannels: Dispatch<SetStateAction<any[]>>;
  selectedChannel: {id: number; name: string} | null;
  setSelectedChannel: Dispatch<
    SetStateAction<{id: number; name: string} | null>
  >;
  messages: Record<number, Array<{id: number; text: string; sender: string}>>;
  addMessage: (
    channelId: number,
    message: {id: number; text: string; sender: string}
  ) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  channels,
  setChannels,
  selectedChannel,
  setSelectedChannel,
}) => {
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showNewDirectMessage, setShowNewDirectMessage] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [messages, setMessages] = useState<
    Record<number, Array<{id: number; text: string; sender: string}>>
  >({});

  const loadMessages = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const storedMessages = JSON.parse(
        localStorage.getItem(`${currentUser}.messages`) || "{}"
      );
      setMessages(storedMessages);
    }
  };

  const saveMessages = (
    newMessages: Record<
      number,
      Array<{id: number; text: string; sender: string}>
    >
  ) => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      localStorage.setItem(
        `${currentUser}.messages`,
        JSON.stringify(newMessages)
      );
    }
  };

  const addMessage = (
    channelId: number,
    newMessage: {id: number; text: string; sender: string}
  ) => {
    setMessages((prevMessages) => {
      const channelMessages = prevMessages[channelId] || [];
      const newMessages = {
        ...prevMessages,
        [channelId]: [...channelMessages, newMessage],
      };
      saveMessages(newMessages);
      return newMessages;
    });
  };

  const navigate = useNavigate();

  const handleAddChannel = () => {
    setShowNewChannel(true);
  };

  const handleDeleteChannel = (id: string) => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      let storedChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      storedChannels = storedChannels.filter(
        (channel: {id: string}) => channel && channel.id !== id
      );

      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(storedChannels)
      );
      setChannels(storedChannels);
    }
  };

  const handleLogout = () => {
    const currentUser = localStorage.getItem("currentUser");
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    if (currentUser) {
      localStorage.removeItem(`${currentUser}.messages`);
    }
    setChannels([]);
    setMessages({});
    navigate("/");
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const storedChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      setChannels(storedChannels);
      loadMessages();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <button
        className="absolute top-1 right-2   text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2 "
        onClick={handleLogout}
      >
        Logout
      </button>
      <Header />
      <div className="flex flex-grow">
        <Sidebar
          channels={channels}
          onAddChannel={handleAddChannel}
          handleDeleteChannel={handleDeleteChannel}
          setSelectedChannel={setSelectedChannel}
          setChannels={setChannels}
        />

        <Workspace
          selectedChannel={selectedChannel ? selectedChannel.id : null}
          selectedChannelName={selectedChannel ? selectedChannel.name : null}
          messages={selectedChannel ? messages[selectedChannel.id] || [] : []}
          addMessage={addMessage}
        />

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
    </div>
  );
};

export default Dashboard;
