import LoginForm from "./Login";
import RegistrationForm from "./SignUp";

export const AuthForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-lg shadow-md">
        <LoginForm />
        <RegistrationForm />
      </div>
    </div>
  );
};
export default AuthForm;
