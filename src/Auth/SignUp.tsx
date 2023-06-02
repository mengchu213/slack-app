import {useState} from "react";
import {registerUser} from "../utils/api";
import Modal from "./Modal";
import RegistrationFormFields from "./RegistrationFormFields";
import {useNavigate} from "react-router-dom";

interface RegistrationData {
  email: string;
  password: string;
  password_confirmation: string;
}

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (formData: RegistrationData) => {
    try {
      const headers = await registerUser(formData);
      console.log(headers);
      setSuccessMessage("Register successful");

      localStorage.setItem("user", JSON.stringify(formData));

      navigate("/dashboard");
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
                  <RegistrationFormFields handleFormSubmit={handleSubmit} />
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
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
