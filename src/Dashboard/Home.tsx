import { GetUserButton } from "../Auth/getUserButton";

export const Home = () => {
  const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
  }

  return (
      <>
          <nav className="p-6 bg-white flex justify-between">
              <a className="font-bold text-lg">Home</a>
              <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                  Logout
              </button>
          </nav>
          <h1 className="text-lg text-center">Welcome</h1>
          <p className="text-lg text-center">
              If you are seeing this, you are currently logged in.
              you can click log out or clear localStorage then refresh the page
          </p>
          <GetUserButton />
      </>
  );
};
