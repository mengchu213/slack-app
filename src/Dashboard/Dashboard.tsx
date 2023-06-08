import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import Header from "./Header";
import Modal from "../Auth/Modal";
import NewChannelForm from "./NewChannelForm";
import NewDirectMessageForm from "./NewDirectMessageForm";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";


interface DashboardProps {
  channels: any[];
  setChannels: Dispatch<SetStateAction<any[]>>;
  selectedChannel: { id: number; name: string } | null;
  setSelectedChannel: Dispatch<
    SetStateAction<{ id: number; name: string } | null>
  >;
  messages: Record<number, Array<Message>>;

  addMessage: (channelId: number, message: Message) => void;
}
interface Sender {
  id: number;
  provider: string;
  uid: string;
}

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
  senderEmail?: string;
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
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  const addMessage = (channelId: number, newMessage: Message) => {
    setMessages((prevMessages) => {
      const channelMessages = prevMessages[channelId] || [];
      const updatedMessages = {
        ...prevMessages,
        [channelId]: [...channelMessages, newMessage],
      };

      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        localStorage.setItem(
          `${currentUser}.messages`,
          JSON.stringify(updatedMessages)
        );
      }

      return updatedMessages;
    });
  };

  const navigate = useNavigate();

  const handleAddChannel = () => {
    setShowNewChannel(true);
  };

  const handleAddUser = () => {
    setShowNewDirectMessage(true);
  };

  const handleDeleteChannel = (id: number) => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      let storedChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      storedChannels = storedChannels.filter(
        (channel: { id: number }) => channel && channel.id !== id
      );

      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(storedChannels)
      );
      setChannels(storedChannels);
    }
  };

  const handleHideDirectMessageModal = () => {
    setShowNewDirectMessage(false);
  }

  const handleLogout = () => {
    const keys = ["auth", "currentUser", "message", "uid", "expiry", "client", "access-token", "receiver"];

    keys.forEach(key => {
      localStorage.removeItem(key);
    });
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

      const storedMessages = JSON.parse(
        localStorage.getItem(`${currentUser}.messages`) || "{}"
      );
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    const { "access-token": accessToken, client, expiry, uid } = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!accessToken && !client && !expiry && !uid) {
      setTimeout(() => {
        navigate("/");
      }, 10);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <button
        className="absolute top-1.5 right-2  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
          onAddUser={handleAddUser}
        />

        <Workspace
          selectedChannel={selectedChannel ? selectedChannel.id : null}
          selectedChannelName={selectedChannel ? selectedChannel.name : null}
          messages={messages}
          addMessage={addMessage}
        />
      </div>

      {showNewChannel && (
        <Modal onClose={() => setShowNewChannel(false)}>
          <NewChannelForm setChannels={setChannels} />
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
