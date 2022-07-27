import React from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import Card from "../../app/Components/Card/Card";

const data = {
  _id: "62e0b8e78b77da47286b5b5c",
  name: "test1",
  imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
  songUrl: "test1",
  album: "62dfd005aaffd8fada845d2b",
  artist: {
    _id: "62dfae79b5ed778cb95f300e",
    name: "test2",
    imageUrl: "test1",
  },
  language: "english",
  category: "pop",
  createdAt: "2022-07-27T04:02:47.077Z",
  updatedAt: "2022-07-27T04:02:47.077Z",
  __v: 0,
};

const songs = () => {
  return (
    <>
      <section className="sec_p">
        <div className="container mx-auto">
          <DashboardNavbar />
          {/* Render Music List */}
          <div className="mt-10 w-full flex flex-col items-start justify-start p-4 border border-gray-300 rounded-md gap-3">
            <p className="text-xl font-bold">
              <span className="text-sm font-semibold text-left mr-2">
                Count :
              </span>
              2
            </p>
            <motion.div
            className="flex justify-between items-center mt-[3em] flex-wrap w-full"
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card music={data} />
            <Card music={data} />
            <Card music={data} />
            <Card music={data} />
            <Card music={data} />
          </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default songs;
