import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const userSignup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      userName: userName,
      email: email,
      password: hashedPassword,
    };

    const newUser = new User(user);

    await newUser.save();

    res.json({ success: true, message: "Signup successful! Please log in." });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      { userName: user.userName, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ success: true, message: "Logged in successfully!", token });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail }).select(
      "userName email"
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userEmail = decoded.email;

    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validate passwords if any password field is provided
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Old password, new password, and confirm password are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Incorrect old password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userName;

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ success: true, blogs });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userName;

    // Find blog IDs authored by the logged-in user
    const userBlogIds = await Blog.find({ author: userId }).distinct("_id");

    const comments = await Comment.find({ blog: { $in: userBlogIds } })
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const userId = decoded.userName;

    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments({ author: userId });

    // Find blog IDs authored by the logged-in user
    const userBlogIds = await Blog.find({ author: userId }).distinct("_id");

    // Count comments on the user's blogs
    const comments = await Comment.countDocuments({
      blog: { $in: userBlogIds },
    });

    const drafts = await Blog.countDocuments({
      author: userId,
      isPublished: false,
    });

    const dashboardData = { blogs, comments, drafts, recentBlogs };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    await Comment.findByIdAndDelete(id);

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    await Comment.findByIdAndUpdate(id, { isApproved: true });

    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
