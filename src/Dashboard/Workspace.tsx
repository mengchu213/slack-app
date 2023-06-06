import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface WorkspaceProps {
  selectedChannel: string | null;
}

const Workspace: React.FC<WorkspaceProps> = ({selectedChannel}) => {
  return (
    <div className="flex flex-col flex-grow bg-gray-700">
      <div>
        {selectedChannel
          ? `Channel: ${selectedChannel}`
          : "No Channel Selected"}
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Workspace;
