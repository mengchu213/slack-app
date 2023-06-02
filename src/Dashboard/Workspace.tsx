import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Workspace: React.FC = () => {
  return (
    <main className="workspace">
      <MessageList />
      <MessageInput />
    </main>
  );
};

export default Workspace;
