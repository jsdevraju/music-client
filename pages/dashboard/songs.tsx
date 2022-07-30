import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import Card from "../../app/Components/Card/Card";
import { IMusic } from "../../app/utils";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../app/api";
import Loader from "../../app/Components/Loader/Loader";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { setAllSong } from "../../app/slices/musicSlice";
import Meta from "../../app/Components/Meta/Meta";

const Songs = () => {
  const [songs, setSongs] = useState<IMusic[]>();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);
  const { allSongs } = useSelector((state: RootState) => state.music);
  const [songFilter, setSongFilter] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<IMusic[]>();
  const dispatch = useDispatch()

  const getSong = async () => {
    const data = await getSongs(token);
    setLoading(false);
    dispatch(setAllSong({ allSongs: data } as any));
    setSongs(data);
  };

  useEffect(() => {
    token && getSong();
  }, [token]);

  useEffect(() => {
    if (songFilter.length > 0 && allSongs) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.name?.toLowerCase().includes(songFilter) ||
          data.language?.toLowerCase().includes(songFilter) ||
          data.name?.toLowerCase().includes(songFilter)
      );
        console.log(filtered)
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(undefined);
    }
  }, [songFilter]);

  return (
    <>
     <Meta title="Music Client - Songs" />
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
                className={`w-52 px-4 py-2 border "border-gray-500 shadow-md" : "border-gray-300 rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
                value={songFilter}
                onChange={(e) => setSongFilter(e.target.value)}
              />
            </div>

            {/* Render Music List */}
            <div className="mt-10 w-full flex flex-col items-start justify-start p-4 border border-gray-300 rounded-md gap-3">
              <p className="text-xl font-bold">
                <span className="text-sm font-semibold text-left mr-2">
                  Count :
                </span>
                {filteredSongs ? filteredSongs?.length : allSongs?.length}
              </p>
              <motion.div
                className="flex justify-between items-center mt-[3em] flex-wrap w-full gap-10 lg:gap-0"
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {filteredSongs
                  ? filteredSongs?.map((data) => (
                      <Card music={data} key={data._id} />
                    ))
                  : songs?.map((data) => <Card music={data} key={data._id} />)}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Songs;

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
