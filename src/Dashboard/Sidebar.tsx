import ChannelSection from "./ChannelSection";
import DirectMessageSection from "./DirectMessageSection";

const Sidebar = () => {
  return (
    <div className="h-screen w-80 bg-gray-800 text-white overflow-auto">
      <div className="px-5 py-5">
        <h1 className="text-2xl font-semibold">Workspace Name</h1>
      </div>
      <hr />
      <ChannelSection />
      <DirectMessageSection />
    </div>
  );
};

export default Sidebar;
