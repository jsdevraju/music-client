import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import Card from "../../app/Components/Card/Card";
import { IMusic } from "../../app/utils";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { getSongs } from "../../app/api";
import Loader from "../../app/Components/Loader/Loader";

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

  console.log(songs)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="sec_p">
          <div className="container mx-auto">
            <DashboardNavbar />
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

export default songs;
