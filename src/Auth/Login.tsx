import {useEffect, useState} from "react";
import {loginUser, getUsers, getMessages} from "../utils/api";
import {useNavigate} from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthData {
  "access-token"?: string;
  client?: string;
  expiry?: string;
  uid?: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const {headers} = await loginUser(formData);
      localStorage.setItem("auth", JSON.stringify(headers));
      localStorage.setItem("currentUserEmail", formData.email);

      const email = formData.email;
      const userListResponse = await getUsers();

      const userList = userListResponse.data;
      const matchingUser = userList.find((user) => user.uid === email);
      let receiverId = null;
      if (matchingUser) {
        receiverId = matchingUser.id;
        localStorage.setItem("currentUser", JSON.stringify(receiverId));
      }

      if (receiverId !== null) {
        const messages = await getMessages(receiverId, "User");
        localStorage.setItem("currentUserMessages", JSON.stringify(messages));
      } else {
        throw new Error("User ID not found");
      }

      setSuccessMessage("Login successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password");
    }
  };

  useEffect(() => {
    console.log("Checking localStorage:", localStorage.getItem("auth"));
    const authData = localStorage.getItem("auth");
    let auth: AuthData = {};

    if (authData) {
      try {
        auth = JSON.parse(authData);
      } catch (e) {
        console.error("Error parsing auth data from localStorage:", e);
        auth = {};
      }
    } else {
      console.warn("No auth data in localStorage");
      return;
    }

    const {"access-token": accessToken, client, expiry, uid} = auth;
    if (accessToken && client && expiry && uid) {
      setTimeout(() => {
        navigate("/dashboard");
        setSuccessMessage("");
        setErrorMessage("");
      }, 10);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block mb-2 text-sm font-medium text-white ">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-gray-50 border mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-white">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="bg-gray-50 border mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
        />
      </label>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            ></input>
          </div>
          <div className="ml-3 text-sm">
            <label className="text-gray-500 dark:text-gray-300">
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium  hover:underline text-blue-500 dark:text-blue-400"
        >
          Forgot password?
        </a>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        type="submit"
        className="group relative w-full flex justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg py-2.5 sm:py-3 text-sm sm:text-base border border-transparent sm:px-6"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
