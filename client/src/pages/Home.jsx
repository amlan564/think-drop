import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import TrendingBlogs from "../components/TrendingBlogs";
import PopularPostList from "../components/PopularPostList";
import Tags from "../components/Tags";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex items-center md:items-start gap-10 w-full px-8 sm:px-16 md:px-30">
        <BlogList />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full px-8 sm:px-16 md:px-30 mt-10 lg:mt-20">
        <PopularPostList />
        <TrendingBlogs />
      </div>
      <Tags />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
