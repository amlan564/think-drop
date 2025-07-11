import { FaStar } from "react-icons/fa";
import HeroSection from "./HeroSection";
import SearchBlog from "./SearchBlog";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 md:mx-30">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New AI feature integrated</p>
          <FaStar className="w-3 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold lg:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span>
          <br />
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-sm text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right there.
        </p>
      </div>
      <HeroSection />
      <SearchBlog />
    </div>
  );
};

export default Header;
