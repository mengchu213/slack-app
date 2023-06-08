import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import AuthForm from "./Auth/AuthForm";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [messages, setMessages] = useState<
    Record<number, Array<{id: number; text: string; sender: string}>>
  >({});

  const addMessage = (
    channelId: number,
    message: {id: number; text: string; sender: string}
  ) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [channelId]: [...(prevMessages[channelId] || []), message],
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              channels={channels}
              setChannels={setChannels}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              messages={messages}
              addMessage={addMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
