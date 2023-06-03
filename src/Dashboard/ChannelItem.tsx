interface ChannelItemProps {
  name: string;
}

const ChannelItem: React.FC<ChannelItemProps> = ({name}) => {
  return (
    <div className="px-5 py-1 hover:bg-gray-600 cursor-pointer">#{name}</div>
  );
};

export default ChannelItem;
