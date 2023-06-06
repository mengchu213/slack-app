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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
