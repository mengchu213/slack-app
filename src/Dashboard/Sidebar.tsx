import ChannelSection from "./ChannelSection";
import DirectMessageSection from "./DirectMessageSection";

interface SidebarProps {
  onAddChannel: () => void;
  channels: Array<{id: number; name: string}>;
  setChannels: React.Dispatch<
    React.SetStateAction<Array<{id: number; name: string}>>
  >;
  setSelectedChannel: React.Dispatch<
    React.SetStateAction<{id: number; name: string} | null>
  >;
  handleDeleteChannel: (id: number) => void;
  onAddUser: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddChannel,
  channels,
  setChannels,
  setSelectedChannel,
  handleDeleteChannel,
  onAddUser,
}) => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white overflow-auto">
      <div className="px-5 py-5">
        <h1 className="text-2xl font-semibold">Avion School</h1>
      </div>
      <hr />
      <ChannelSection
        onAddChannel={onAddChannel}
        channels={channels}
        setChannels={setChannels}
        setSelectedChannel={setSelectedChannel}
        handleDeleteChannel={handleDeleteChannel}
      />

      <DirectMessageSection onAddUser={onAddUser} />
    </div>
  );
};

export default Sidebar;
