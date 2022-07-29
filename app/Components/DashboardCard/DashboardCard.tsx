import React, { FC } from "react";

interface IProps {
  icon: JSX.Element;
  name: string;
  length: number;
  color: string;
}

const DashboardCard: FC<IProps> = ({ icon, name, length, color }) => {
  return (
    <div
      className={`${color} text-white w-[100%] sm:w-[50%] md:w-[45%] p-4 flex items-center justify-center flex-col rounded-md cursor-pointer`}
    >
      {icon}
      <h4 className="text-white font-semibold">{name}</h4>
      <span>{length}</span>
    </div>
  );
};

export default DashboardCard;
