import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-bounce-subtle"></div>

      <style jsx>{`
        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(-25%);
            opacity: 0.8;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
