import { FaPenAlt } from "react-icons/fa";
import { footerData } from "../config";

const Footer = () => {
  return (
    <div className="px-8 sm:px-16 md:px-30 bg-primary/3">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaPenAlt className="text-primary" />
            <span className="text-black">ThinkDrop</span>
          </div>
          <p className="lg:max-w-[410px] mt-6 text-sm lg:text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            nobis eveniet, nesciunt eius accusantium quae harum error amet
            temporibus ipsa?
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full lg:w-[45%] gap-5">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                  >
                    <a href="#" className="hover:underline transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm lg:text-base text-gray-500/80">
        Copyright 2025 &copy; My Blog All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
