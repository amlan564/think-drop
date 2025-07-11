const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-20 lg:my-32 px-8 sm:px-16 md:px-30">
      <h1 className="md:text-4xl text-xl font-semibold">Never miss a Blog!</h1>
      <p className="text-sm md:text-lg text-gray-500/70 pb-6 lg:pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <form className="flex items-center justify-between w-full max-w-2xl md:h-13 h-10">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 max-sm:text-sm"
          type="text"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-6 h-full text-white max-sm:text-sm bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
