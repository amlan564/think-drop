import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/blog-website`);
  } catch (eroor) {
    console.log(eroor.message);
  }
};

export default connectDB;
