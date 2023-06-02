// Sidebar.tsx
import ChannelSection from "./ChannelSection";
import DirectMessageSection from "./DirectMessageSection";

interface SidebarProps {
  onAddChannel: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({onAddChannel}) => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white overflow-auto">
      <div className="px-5 py-5">
        <h1 className="text-2xl font-semibold">Avion School</h1>
      </div>
      <hr />
      <ChannelSection onAddChannel={onAddChannel} />
      <DirectMessageSection />
    </div>
  );
};

export default Sidebar;
