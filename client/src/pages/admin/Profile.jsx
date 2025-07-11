import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { CiEdit } from "react-icons/ci";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { axios, token, userAccount, setUserAccount } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All password fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      const { data } = await axios.put("/api/admin/update", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (data.success) {
        toast.success(data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full"
    >
      <div className="bg-white max-sm:m-4 md:max-w-2xl p-10 sm:m-10 shadow rounded relative">
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="absolute right-10 top-8 flex items-center gap-2 p-2 bg-green-500 text-white rounded-md font-semibold text-xs sm:text-sm hover:bg-green-600 transition-all cursor-pointer"
          >
            <CiEdit />
            Change Password
          </button>
        )}
        <p className="mt-16 text-sm lg:text-base">
          Username:{" "}
          <span className="text-gray-500 ml-2">{userAccount.userName}</span>
        </p>

        <p className="mt-4 text-sm lg:text-base">
          User Email:{" "}
          <span className="text-gray-500 ml-2">{userAccount.email}</span>
        </p>

        {isEditing && (
          <>
            <p className="mt-4 text-sm lg:text-base">Old Password</p>
            <div className="relative w-full max-w-lg">
              <input
                value={oldPassword}
                onChange={handleOldPasswordChange}
                type={showOldPassword ? "text" : "password"}
                className="w-full mt-2 p-2 border border-gray-300 outline-none rounded text-sm lg:text-base"
                placeholder="Enter old password"
                required
              />
              <button
                onClick={toggleOldPasswordVisibility}
                className="absolute right-2 top-5 text-gray-500 cursor-pointer"
              >
                {!showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="mt-4 text-sm lg:text-base">New Password</p>
            <div className="relative w-full max-w-lg">
              <input
                value={newPassword}
                onChange={handleNewPasswordChange}
                type={showNewPassword ? "text" : "password"}
                className="w-full mt-2 p-2 border border-gray-300 outline-none rounded text-sm lg:text-base"
                placeholder="Enter new password"
                required
              />
              <button
                onClick={toggleNewPasswordVisibility}
                className="absolute right-2 top-5 text-gray-500 cursor-pointer"
              >
                {!showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="mt-4 text-sm lg:text-base">Confirm Password</p>
            <div className="relative w-full max-w-lg">
              <input
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full mt-2 p-2 border border-gray-300 outline-none rounded text-sm lg:text-base"
                placeholder="Confirm new password"
                required
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-5 text-gray-500 cursor-pointer"
              >
                {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </>
        )}

        {isEditing && (
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="mt-8 px-4 py-2 border border-red-600 text-red-600 rounded cursor-pointer text-xs sm:text-sm hover:bg-red-600 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-8 px-4 py-2 bg-primary text-white rounded cursor-pointer text-xs sm:text-sm hover:bg-blue-800 transition-all"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Profile;
