// Workspace.tsx
import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Workspace: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow bg-gray-700">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Workspace;
