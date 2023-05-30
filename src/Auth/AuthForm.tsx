import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import { GetUserButton } from "./getUserButton";
import { Home } from "../Dashboard/Home";

export const AuthForm = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleShowSignUp = (show: boolean) => {
    setShowSignUp(show);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const checkAuthentication = () => {
    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
    const { "access-token": accessToken, client, expiry, uid } = authData;
    if (accessToken && client && expiry && uid) {
      setAuthenticated(true);
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  useEffect(() => {
    checkAuthentication();
    setSuccessMessage("");
    setErrorMessage("");
  }, []);

  const handleBack = () => {
    setSuccessMessage("");
    setShowSignUp(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-lg shadow-md">
      {authenticated ? <Home /> : null}
        {showSignUp && (
          <SignUpForm
            handleShowSignUp={handleShowSignUp}
            handleBack={handleBack}
            handleError={errorMessage => setErrorMessage(errorMessage)}
            handleSuccess={successMessage => setSuccessMessage(successMessage)}
          />
        )}
        {!showSignUp && !authenticated && (
          <>
            <LoginForm
              handleShowSignUp={handleShowSignUp}
              handleError={errorMessage => setErrorMessage(errorMessage)}
              handleSuccess={successMessage => setSuccessMessage(successMessage)}
              checkAuthentication={checkAuthentication}
            />
            <GetUserButton />
          </>
        )}
        {errorMessage &&
          <p className="text-red-500">{errorMessage}</p>
        }
        {successMessage &&
          <p className="text-green-500">{successMessage}</p>
        }
      </div>
    </div>
  )
}