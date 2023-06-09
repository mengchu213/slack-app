import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Workspace = () => {

  return (
    <div className="flex flex-col flex-grow bg-gray-700 ">
      <div className="text-blue-500  px-5 py-5 text-2xl font-semibold">
        "Default"
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Workspace;
