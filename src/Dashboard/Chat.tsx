import React, {useState} from "react";
import Workspace from "./Workspace";

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <div className="flex-grow bg-white">
      <Workspace
        selectedChannel={selectedChannel ? selectedChannel.id : null}
        selectedChannelName={selectedChannel ? selectedChannel.name : null}
      />
    </div>
  );
};

export default Chat;
