import { useState } from "react";
import { loginUser, getUsers } from "../utils/api";

interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  handleShowSignUp: (showSignUp: boolean) => void;
  handleError: (errorMessage: string) => void;
  handleSuccess: (successMessage: string) => void;
  checkAuthentication: () => void;
}


export const LoginForm = ({ handleShowSignUp, handleError, handleSuccess, checkAuthentication }: Props) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSuccess("");
    handleError("");
    try {
      const headers = await loginUser(formData);
      localStorage.setItem("auth", JSON.stringify(headers));
      const authData = JSON.parse(localStorage.getItem("auth") || "{}");
      console.log(authData);
      handleSuccess("Login successful"); 
      const userList = await getUsers(headers);
      console.log(userList);
      checkAuthentication();
    } catch (error) {
      console.error(error);
      handleError("Invalid email or password");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </label>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      >
        Log In
      </button>
      <button
        onClick={() => handleShowSignUp(true)}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      >
        Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
