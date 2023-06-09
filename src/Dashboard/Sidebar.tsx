import ChannelSection from "./ChannelSection";
import DirectMessageSection from "./DirectMessageSection";

interface SidebarProps {
  onAddChannel: () => void;
  onAddUser: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddChannel, onAddUser }) => {
  return (
    <div className="w-64 bg-gray-800 text-white overflow-auto h-[94.9vh] scrollbar">
      <div className="px-5 py-5">
        <h1 className="text-2xl font-semibold">Avion School</h1>
      </div>
      <hr />
      <ChannelSection onAddChannel={onAddChannel}/>
      <DirectMessageSection onAddUser={onAddUser} />
    </div>
  );
};

export default Sidebar;
