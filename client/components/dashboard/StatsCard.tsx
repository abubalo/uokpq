import React from "react";

type Props = {
  title: string;
  quantity: string;
  info: string;
  icon: React.ReactNode
};
const StatsCard: React.FC<Props> = ({title, quantity, info, icon}) => {
  return (
    <div className="w-full bg-neutral-700/30 backdrop-blur-md space-y-3 p-4 rounded-md">
      <div className="flex justify-between">
        <div>{title}</div>
        <div>{icon}</div>
      </div>
      <div className="text-4xl font-semibold">{quantity}</div>
      <div>{info}</div>
    </div>
  );
};

export default StatsCard;
