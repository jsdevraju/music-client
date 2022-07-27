import type { NextPage } from "next";
import Input from "../app/Components/Input/Input";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import Option from "../app/Components/Select/Option";
import Card from "../app/Components/Card/Card";
import { motion } from 'framer-motion'

const artits = [
  {
    name: "Vaw",
  },
  {
    name: "sd",
  },
  {
    name: "Vasdw",
  },
  {
    name: "Vawsd",
  },
];

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

const Home: NextPage = () => {
  const [album, setAlbum] = useState("");

  return (
    <>
      {/* Home Section */}
      <section className="sec_p">
        <div className="container mx-auto">
          {/* Search Bar  */}
          <div className="relative shadow-md">
            <Input
              type="text"
              placeholder="Search Here..."
              className="rounded-md outline-none block w-full border border-1 border-gray-300 px-12 py-2"
            />
            <BiSearch
              size={20}
              className="text-gray-300 absolute top-[12px] left-[15px]"
            />
          </div>
          {/* List of filter */}
          <div className="mt-8 flex items-center justify-around">
            {/* Artist List */}
            <select
              className="selectColor"
              id=""
              onChange={(e) => setAlbum(e.target.value)}
            >
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </select>
            {/* Album List */}
            <div className="flex items-center gap-6">
              <p className="text cursor-pointer font-sm">Jasp</p>
              <p className="text cursor-pointer font-sm">Rock</p>
              <p className="text cursor-pointer font-sm">Melody</p>
              <p className="text cursor-pointer font-sm">Karoke</p>
            </div>
            {/* Main Album List */}
            <select
              className="selectColor"
              onChange={(e) => setAlbum(e.target.value)}
            >
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </select>
            {/* Music Language List */}
            <select
              className="selectColor"
              onChange={(e) => setAlbum(e.target.value)}
            >
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </select>
          </div>
          {/* Render Music List */}
          <motion.div
            className="flex justify-between items-center mt-[3em] flex-wrap"
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
      </section>
    </>
  );
};

export default Home;
