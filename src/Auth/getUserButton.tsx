import {getUsers} from "../utils/api";

interface GetUserButtonProps {
  headers?: any;
}

export const GetUserButton = ({headers = {}}: GetUserButtonProps) => {
  const handleButtonClick = async () => {
    console.log(headers);
    try {
      const userList = await getUsers();
      console.log(userList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      onClick={handleButtonClick}
    >
      Get User List
    </button>
  );
};
