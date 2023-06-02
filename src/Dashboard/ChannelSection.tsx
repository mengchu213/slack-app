import ChannelItem from "./ChannelItem";

const ChannelSection = () => {
  return (
    <div>
      <div className="px-5 py-3 flex justify-between items-center">
        <h2 className="font-semibold">Channels</h2>
        <button className="bg-blue-500 text-white rounded p-1">+</button>
      </div>
      <ChannelItem />
      <ChannelItem />
      {/* ... */}
    </div>
  );
};

export default ChannelSection;
