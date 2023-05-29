import {useState} from "react";
import {registerUser} from "../utils/api";
import Modal from "./Modal";

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
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
      >
        Sign Up
      </button>
      {isModalOpen && (
        <Modal>
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={handleCloseModal}
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white p-4 rounded-lg shadow">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  >
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
                          value=""
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
                    {errorMessage && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                    {successMessage && (
                      <p className="text-green-500">{successMessage}</p>
                    )}
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Register new account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default RegistrationForm;
