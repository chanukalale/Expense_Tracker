import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white boder-r border-gray-200/50  p-5 sticky top-[61px] z-20">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-6">
            {user?.profileImageUrl ? (
              <img
                src={user?.profileImageUrl}
                alt="Profile Image"
                className="w-16 h-16 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName || "User"}
                width="w-20"
                height="h-20"
                style="text-xl"
              />
            )}
      
            <h5 className="mt-2 text-lg font-medium text-gray-800">
              {user?.fullName || "User"}
            </h5>
          </div>
      
          {/* Side Menu Items */}
          {SIDE_MENU_DATA.map((item, index) => (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
                activeMenu === item.label ? "text-white bg-primary" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleClick(item.path)}
            >
              {item.icon && <item.icon className="text-xl" />}
              {item.label}
            </button>
          ))}
        </div>
      );
}

export default SideMenu;