import React from 'react';

type SizeClass = 'sm' | 'md' | 'lg';
type ColorClass = 'blue' | 'green' | 'red' | 'yellow';

interface LoadingSpinnerProps {
  size?: SizeClass;
  color?: ColorClass;
}

const sizeClasses: Record<SizeClass, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colorClasses: Record<ColorClass, string> = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  red: 'border-red-500',
  yellow: 'border-yellow-500',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;