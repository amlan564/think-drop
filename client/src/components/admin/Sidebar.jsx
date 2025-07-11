import { NavLink } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import {
  FaRegCheckSquare,
  FaRegCommentDots,
  FaRegPlusSquare,
  FaRegUserCircle,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div>
      <NavLink
        to="/admin/profile"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-10 md:min-w-60 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
        data-tip="Profile"
      >
        <FaRegUserCircle />
        <p className="hidden md:inline-block text-sm">Profile</p>
      </NavLink>

      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-10 md:min-w-60 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <MdOutlineDashboard />
        <p className="hidden md:inline-block text-sm">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-10 md:min-w-60 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaRegPlusSquare />
        <p className="hidden md:inline-block text-sm">Add blog</p>
      </NavLink>

      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-10 md:min-w-60 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaRegCheckSquare />
        <p className="hidden md:inline-block text-sm">Blog Lists</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-10 md:min-w-60 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaRegCommentDots />
        <p className="hidden md:inline-block text-sm">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
