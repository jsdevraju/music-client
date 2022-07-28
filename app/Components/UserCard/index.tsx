import React, { FC, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { IUser } from "../../utils";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IProps {
  data: IUser;
}

const DashboardUserCard: FC<IProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {user && user.role === "admin" && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}
      <div className="w-[275px] min-w-[160px] flex items-center justify-center">
        {/* prettier-ignore */}
        <Image src={data.avatar} alt="Razu Islam" width={35} height={35} className="object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/* prettier-ignore */}
      <p className="table">{data.name}</p>
      {/* prettier-ignore */}
      <p className="table">{data.email}</p>
      {/* prettier-ignore */}
      <p className="table">{data.formGoogle ? 'True' : 'False'}</p>
      {/* prettier-ignore */}
      <p className="table">{createdAt}</p>
      <div className="w-[275px] min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text"> {data.role}</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="text-[10px]  font-semibold px-1 bg-purple-200 rounded-sm hover:shadow-md"
          onClick={() => setIsUpdateRole(true)}
        >
          {data.role === "admin" ? "Member" : "Admin"}
        </motion.p>
        {isUpdateRole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 rounded-md p-4 flex items-start flex-col gap-4 bg-white shadow-xl"
          >
            <p className="text-sm font-semibold">
              Are you sure do u want to mark the user as{" "}
              <span>{data.role === "admin" ? "Member" : "Admin"}</span> ?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={() => setIsUpdateRole(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-card animate-pulse"></div>
      )}
    </motion.div>
  );
};

export default DashboardUserCard;
