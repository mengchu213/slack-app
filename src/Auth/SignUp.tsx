import {useState} from "react";
import Modal from "./Modal";
import RegistrationFormFields from "./RegistrationFormFields";

export const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    handleModalClose(successMessage, errorMessage);
    setModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleModalClose = (successMessage: string, errorMessage: string) => {
    setSuccessMessage(successMessage);
    setErrorMessage(errorMessage);
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
        <Modal onClose={handleCloseModal}>
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white p-4 rounded-lg shadow">
                  <RegistrationFormFields
                    setModalOpen={setModalOpen}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 mt-6"
                  >
                    Back
                  </button>
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
export default SignUp;
