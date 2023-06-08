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
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <button
          onClick={handleOpenModal}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign Up
        </button>
      </p>

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
              <div className="inline-block align-bottom dark:bg-gray-800 dark:border-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <RegistrationFormFields
                    setModalOpen={setModalOpen}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Login here
                    </button>
                  </p>

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
