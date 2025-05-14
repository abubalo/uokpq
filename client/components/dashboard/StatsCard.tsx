import React from "react";

type Props = {
  title: string;
  quantity: number;
  info: string;
  icon: React.ReactNode;
};

const StatsCard: React.FC<Props> = ({ title, quantity, info, icon }) => {
  const formattedQuantity = new Intl.NumberFormat("en-US").format(quantity);

  return (
    <div className="w-full bg-white dark:bg-neutral-950 shadow-md p-4 rounded-md overflow-hidden transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {title}
        </div>
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
      </div>
      <div className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mt-2">
        {formattedQuantity}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {info}
      </div>
    </div>
  );
};

export default StatsCard;
