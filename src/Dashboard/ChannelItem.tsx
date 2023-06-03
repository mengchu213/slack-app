import React from "react";

interface ChannelItemProps {
  name: string;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChannelItem: React.FC<ChannelItemProps> = ({
  name,
  setSelectedChannel,
}) => {
  return (
    <div
      className="px-5 py-2 cursor-pointer hover:bg-gray-700"
      onClick={() => setSelectedChannel(name)}
    >
      <h3 className="font-medium text-sm">{name}</h3>
    </div>
  );
};

export default ChannelItem;
