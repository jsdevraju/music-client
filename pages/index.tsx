import type { NextPage } from "next";
import Input from "../app/Components/Input/Input";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import Option from "../app/Components/Select/Option";

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

const Home: NextPage = () => {
  const [album, setAlbum] = useState("");

  return (
    <>
      {/* Home Section */}
      <section className="px-[0px] py-[5em]">
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
            <select className="selectColor" id="" onChange={e => setAlbum(e.target.value)}>
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>{item.name}</Option>
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
            <select className="selectColor" onChange={e => setAlbum(e.target.value)}>
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>{item.name}</Option>
              ))}
            </select>
            {/* Music Language List */}
            <select className="selectColor" onChange={e => setAlbum(e.target.value)}>
              {artits.map((item) => (
                <Option key={item.name} value={item.name}>{item.name}</Option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
