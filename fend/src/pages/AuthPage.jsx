import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      <div className="hidden lg:flex lg:w-[60%] items-center justify-center p-12">
        <img
          src="/authImage.png"
          alt="Chat App"
          className="max-w-full h-auto object-contain"
        />
      </div>

      <div className="flex w-full lg:w-[40%] items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-black mb-2 text-center">
            ChatBoX
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Connect with your friends, wherever they are.
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;