export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-purple-900 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 dark:border-purple-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};
