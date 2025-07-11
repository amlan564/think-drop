import { FaArrowRight, FaPenAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import AccountMenu from "./AccountMenu";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  const handleClick = () => {
    if (!token) {
      toast.error("Plaease login to create a blog");
    }
  };

  return (
    <div className="flex items-center justify-between h-[70px] px-8 sm:px-16 md:px-30">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaPenAlt className="text-primary" />
        <span>ThinkDrop</span>
      </div>
      <ul className="hidden lg:flex items-center gap-10 xl:gap-20">
        <NavLink
          end={true}
          to="/"
          className={({ isActive }) =>
            `px-4 py-1.5 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive && "bg-primary text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/addblog"
          onClick={handleClick}
          className={({ isActive }) =>
            `px-4 py-1.5 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive && "bg-primary text-white"
            }`
          }
        >
          Create
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-1.5 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive && "bg-primary text-white"
            }`
          }
        >
          About
        </NavLink>
      </ul>
      <div className="hidden lg:block">
        {token ? (
          <AccountMenu />
        ) : (
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
          >
            Login
            <FaArrowRight />
          </button>
        )}
      </div>
      {/* Menu for mobile device */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="btn px-2 text-gray-600 border border-primary/20 rounded"
            >
              <MdMenu size={26} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu gap-0.5 bg-white min-h-full w-80">
              <NavLink
                end={true}
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
                    isActive && "bg-primary text-white"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/addblog"
                onClick={handleClick}
                className={({ isActive }) =>
                  `px-4 py-2 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
                    isActive && "bg-primary text-white"
                  }`
                }
              >
                Create
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
                    isActive && "bg-primary text-white"
                  }`
                }
              >
                About
              </NavLink>
              <div className="pt-2">
                {token ? (
                  <AccountMenu />
                ) : (
                  <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 w-full rounded text-sm cursor-pointer hover:bg-primary hover:text-white px-4 py-2.5 transition-all duration-300"
                  >
                    Login
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
