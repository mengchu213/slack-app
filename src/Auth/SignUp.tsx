import { useState } from "react";
import { registerUser } from "../utils/api";

interface SignUpForm {
  email: string;
  password: string;
  password_confirmation: string;
}

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const headers = await registerUser(formData);
      console.log(headers);
      setSuccessMessage("Register successful");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to register user");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded px-2 py-1"
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
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500">{successMessage}</p>
      )}
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
        Sign Up
      </button>
    </form>
  );
};

