import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const signupInitialValues = {
  userName: "",
  email: "",
  password: "",
};

const Login = () => {
  const [account, setAccount] = useState("signup");
  const [signup, setSignup] = useState(signupInitialValues);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { axios, setToken, setUserAccount, navigate } = useAppContext();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/signup", {
        userName: signup.userName,
        email: signup.email,
        password: signup.password,
      });

      if (data.success) {
        toast.success(data.message);
        setAccount("signup");
        setSignup(signupInitialValues);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);

        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["Authorization"] = data.token;

        setUserAccount({ userName: data.userName, email: data.email });

        toast.success(data.message);

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {account === "signup" ? (
        <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full py-6 text-center">
              <h1 className="text-3xl font-bold">
                <span className="text-primary">User</span> Login
              </h1>
              <p className="font-light">
                Enter your credentials to access your blogs
              </p>
            </div>
            <form
              onSubmit={handleLoginSubmit}
              className="mt-6 w-full sm:max-w-md text-gray-600"
            >
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Enter your email"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
              <button
                onClick={handleLoginSubmit}
                type="submit"
                className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
              >
                Login
              </button>
            </form>
            <div className="flex items-center gap-2 mt-6 text-sm text-gray-700">
              <p>Don't have an account?</p>
              <p
                onClick={() => setAccount("login")}
                className="cursor-pointer hover:text-primary hover:underline"
              >
                Sign up
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full py-6 text-center">
              <h1 className="text-3xl font-bold">
                <span className="text-primary">User</span> Signup
              </h1>
              <p className="font-light">
                Enter your credentials to create an account
              </p>
            </div>
            <form
              onSubmit={handleSignupSubmit}
              className="mt-6 w-full sm:max-w-md text-gray-600"
            >
              <div className="flex flex-col">
                <label>Username</label>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="userName"
                  type="text"
                  placeholder="Enter your username"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
              <button
                onClick={handleSignupSubmit}
                type="submit"
                className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
              >
                Sign Up
              </button>
            </form>
            <div className="flex items-center gap-2 mt-6 text-sm text-gray-700">
              <p>Already have an account?</p>
              <p
                onClick={() => setAccount("signup")}
                className="cursor-pointer hover:text-primary hover:underline"
              >
                Login
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
