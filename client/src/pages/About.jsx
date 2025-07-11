import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <section className="mx-8 sm:mx-16 md:mx-30 mt-10 max-w-2xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
            How This Blog Was Made
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            This AI powered blog was built using the MERN stack, a powerful combination of MongoDB, Express.js, React, and Node.js. This allows us to create a fast, scalable, and dynamic platform for sharing content.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Frontend</span>: Built with React for a responsive, component-based UI, styled with Tailwind CSS for a modern, customizable design.
            </li>
            <li>
              <span className="font-medium">Backend</span>: Powered by Node.js and Express.js, handling API requests and user authentication. MongoDB stores blog posts and user data efficiently. Google's Gemini API also used here to generate blog description according to the blog title.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
