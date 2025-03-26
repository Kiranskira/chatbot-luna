import React from "react";
import { User, Palette, Settings as SettingsIcon, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Settings = ({
  setSettingsModel,
}: {
  setSettingsModel: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const { user } = useAuth();

  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex w-3/4 h-2/6">
          <div className="px-2 border-r border-gray-200">
            <h3 className="font-semibold text-gray-700 text-xl px-2 py-1">
              Settings
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="flex h-fit items-center text-gray-700 gap-1 px-2 py-1 cursor-pointer bg-gray-100 rounded-md">
                <User size={20} />
                <p>Profile</p>
              </li>
              <li className="flex h-fit items-center text-gray-700 gap-1 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-md">
                <SettingsIcon size={20} />
                <p>General</p>
              </li>
              <li className="flex h-fit items-center text-gray-700 gap-1 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-md">
                <Palette size={20} />
                <p>Appearance</p>
              </li>
            </ul>
          </div>

          <div className="px-6 flex-1">
            <div className="flex h-fit justify-between items-center">
              <h3 className="text-gray-700 text-lg px-2 py-1">Profile</h3>
              <button onClick={() => setSettingsModel(false)}>
                <X className="text-gray-700" size={20} />
              </button>
            </div>
            <hr className="w-full my-2" />

            {user ? (
              <div className="flex h-fit justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={user.image}
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-gray-700 text-lg">
                      {user.displayName}
                    </h3>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button className="mt-4 text-black p-1 px-10 rounded-full flex gap-2 border border-black text-base">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-10">
                <a href="http://localhost:3000/auth/google">
                  <button className=" text-black p-2 px-10 rounded-full flex gap-2 border border-black text-base">
                    <img src="/google.svg" alt="google" />
                    Sign in with Google
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
