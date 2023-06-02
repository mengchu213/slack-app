const DirectMessageSection = () => {
  return (
    <div>
      <div className="px-5 py-3 flex justify-between items-center">
        <h2 className="font-semibold">Direct Messages</h2>
        <button className="bg-blue-500 text-white rounded p-1">+</button>
      </div>
      <div className="px-5 py-1 hover:bg-gray-600 cursor-pointer">
        User Name
      </div>
      {/* ... */}
    </div>
  );
};

export default DirectMessageSection;
