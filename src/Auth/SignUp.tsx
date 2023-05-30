import { useState } from "react";
import { registerUser } from "../utils/api";

interface SignUpForm {
  email: string;
  password: string;
  password_confirmation: string;
}

interface Props {
  handleBack: () => void;
  handleShowSignUp: (showSignUp: boolean) => void;
  handleError: (errorMessage: string) => void;
  handleSuccess: (successMessage: string) => void;
}

const SignUpForm = ({ handleBack, handleShowSignUp, handleError, handleSuccess }: Props) => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    password_confirmation: "",
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
      await registerUser(formData);
      handleShowSignUp(false);
      handleSuccess("Sign up successful. Please log in to continue.");
    } catch (error) {
      console.error(error);
      handleError("Failed to register user");
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
          className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
      <label>
        Repeat password:
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          required
          className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border rounded bg-gray-50 focus:ring-blue-300 cursor-pointer"
            required
          />
        </div>
        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
          I agree with the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            terms and conditions
          </a>
        </label>
      </div>
      <button className="w-full py-2 px-4 text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 rounded-md hover:bg-gradient-to-br focus:ring-4 focus:outline-none dark:focus:ring-cyan-800">
        Register new account
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="w-full py-2 px-4 text-white bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 rounded-md hover:bg-gradient-to-br focus:ring-4 focus:outline-none dark:focus:ring-cyan-800"
      >
        Back
      </button>
    </form>
  );
};

export default SignUpForm;
