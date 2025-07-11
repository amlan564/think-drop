import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <>
      {/* <div className="flex items-center justify-between h-[70px] px-4 py-2 sm:px-12 border-b border-gray-200">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaPenAlt className="text-primary" />
          <span>My Blog</span>
        </div>
        <AccountMenu />
      </div> */}
      <Navbar />
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
