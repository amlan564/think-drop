import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AccountMenu = () => {
  const { token, setToken, axios, userAccount, setUserAccount, navigate } =
    useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  const closeCollapse = () => {
    setIsOpen(false);
  };

  const fetchUserData = async () => {
    if (token) {
      try {
        const { data } = await axios.get("/api/admin/profile");
        if (data.success) {
          setUserAccount({
            userName: data.user.userName,
            email: data.user.email,
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const avatarLetter = userAccount.userName
    ? userAccount.userName.charAt(0).toUpperCase()
    : "?";

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <div>
      <div className="hidden lg:block">
        <div className="dropdown dropdown-bottom lg:dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="btn border-0 w-10 h-10 rounded-full bg-primary text-white">
              <span className="text-xl">{avatarLetter}</span>
            </div>
            <div className="bg-white">{userAccount.userName}</div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-box z-1 w-52 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <div
                onClick={() => navigate("/admin/profile")}
                className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-all duration-300"
              >
                <FaUserCircle size={24} />
                <span className="text-sm lg:text-base">My Account</span>
              </div>
              <div
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-all duration-300"
              >
                <MdLogout size={24} />
                <span className="text-sm lg:text-base">Logout</span>
              </div>
            </div>
          </ul>
        </div>
      </div>

      {/* updated code */}

      <div className="lg:hidden">
        <div className="px-4 py-2 rounded">
          {/* Radio input for toggling */}
          <input
            type="radio"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)}
            className="hidden"
          />
          {/* Collapse title */}
          <div
            className="flex items-center gap-2 cursor-pointer p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <span className="text-xl font-semibold">{avatarLetter}</span>
            </div>
            <div>{userAccount.userName}</div>
            {/* Arrow indicator */}
            <div className="ml-auto mr-2">
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* Collapse content */}
          <div
            className={`overflow-hidden px-4 transition-all duration-300 ${
              isOpen ? "" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-start gap-1 mt-2">
              <div
                onClick={() => navigate("/admin/profile")}
                className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-all duration-300"
              >
                <FaUserCircle size={24} />
                <span className="text-sm lg:text-base">My Account</span>
              </div>
              <div
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-all duration-300"
              >
                <MdLogout size={24} />
                <span className="text-sm lg:text-base">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
