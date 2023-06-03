import React, {useState} from "react";
import {registerUser} from "../utils/api";

export interface RegistrationFormFields {
  email: string;
  password: string;
  password_confirmation: string;
}

interface Props {
  setModalOpen: (showSignUp: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  setSuccessMessage: (successMessage: string) => void;
}

export const RegistrationFormFields = ({
  setModalOpen,
  setErrorMessage,
  setSuccessMessage,
}: Props) => {
  const [formData, setFormData] = useState<RegistrationFormFields>({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await registerUser(formData);
      setSuccessMessage("Sign up successful. Please log in to continue.");
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to register user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
      </div>
      <div className="mb-6">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Repeat password
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 cursor-pointer"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900 "
        >
          I agree with the{" "}
          <a href="#" className="text-blue-600 hover:underline ">
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      >
        Register new account
      </button>
    </form>
  );
};

export default RegistrationFormFields;
