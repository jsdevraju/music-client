import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import Card from "../../app/Components/Card/Card";
import { IMusic } from "../../app/utils";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { getSongs } from "../../app/api";
import Loader from "../../app/Components/Loader/Loader";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const songs = () => {
  const [songs, setSongs] = useState<IMusic[]>();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);

  const getSong = async () => {
    const data = await getSongs(token);
    setLoading(false);
    setSongs(data);
  };

  useEffect(() => {
    token && getSong();
  }, [token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="sec_p">
          <div className="container mx-auto">
            <DashboardNavbar />
            {/* Search And */}
            <div className="mt-[2em] w-full flex justify-center items-center gap-24">
              <Link href={"/dashboard/newSong"}>
                <a className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer">
                  <IoAdd />
                </a>
              </Link>
              <input
                type="text"
                placeholder="Search here"
                className={`w-52 px-4 py-2 border "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
              />
            </div>

            {/* Render Music List */}
            <div className="mt-10 w-full flex flex-col items-start justify-start p-4 border border-gray-300 rounded-md gap-3">
              <p className="text-xl font-bold">
                <span className="text-sm font-semibold text-left mr-2">
                  Count :
                </span>
                {songs && songs?.length}
              </p>
              <motion.div
                className="flex justify-between items-center mt-[3em] flex-wrap w-full"
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {songs &&
                  songs?.map((data) => <Card music={data} key={data._id} />)}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.cookies?.token) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    };
  } else
    return {
      props: { isLogin: true },
    };
};

export default songs;
