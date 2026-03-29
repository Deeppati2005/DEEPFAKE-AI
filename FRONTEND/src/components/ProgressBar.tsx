interface ProgressBarProps {
  value: number;
  color?: 'green' | 'red' | 'blue';
}

export const ProgressBar = ({ value, color = 'blue' }: ProgressBarProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-600 dark:bg-green-500';
      case 'red':
        return 'bg-red-600 dark:bg-red-500';
      default:
        return 'bg-blue-600 dark:bg-purple-600';
    }
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full ${getColorClasses()} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  );
};
