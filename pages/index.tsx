import type { GetServerSideProps, NextPage } from "next";
import Input from "../app/Components/Input/Input";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import Card from "../app/Components/Card/Card";
import { motion } from "framer-motion";
import { IAlbum, IArtis, IMusic } from "../app/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAlbums, getArtists, getSongs } from "../app/api";
import { FILTER, LANGUAGE } from "../app/data";
import MusicPlayer from "../app/Components/MusicPlayer/MusicPlayer";
import { setAllSong } from "../app/slices/musicSlice";
import FilterButtons from "../app/Components/FilterButton/FilterButton";
import Meta from "../app/Components/Meta/Meta";
import Loader from "../app/Components/Loader/Loader";

const Home: NextPage = () => {
  const [songs, setSongs] = useState<IMusic[]>();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);
  const { allSongs } = useSelector((state: RootState) => state.music);
  const { artistFilter, filterTerm, albumFilter, languageFilter } = useSelector(
    (state: RootState) => state.filter
  );
  const [searchTerm, setSearchTerm] = useState("");
  const { isSongPlaying, song } = useSelector(
    (state: RootState) => state.music
  );
  const [artist, setArtist] = useState<IArtis[]>();
  const [albums, setAlbums] = useState<IAlbum[]>();
  const dispatch = useDispatch();

  const getSong = async () => {
    const data = await getSongs(token);
    setLoading(false);
    dispatch(setAllSong({ allSongs: data } as any));
  };

  const getAlbum = async () => {
    const data = await getAlbums(token);
    setLoading(false);
    setAlbums(data);
  };

  const getArtist = async () => {
    const data = await getArtists(token);
    setLoading(false);
    setArtist(data);
  };

  useEffect(() => {
    if (token) {
      getSong();
      getAlbum();
      getArtist();
    }
  }, [token]);

  useEffect(() => {
    if (searchTerm.length > 0 && allSongs) {
      const filtered = allSongs.filter(
        (data) =>
          (data.artist?.name &&
            data.artist?.name.toLowerCase().includes(searchTerm)) ||
          data.language?.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm)
      );
      setSongs(filtered);
      console.log(filtered);
    } else {
      setSongs(undefined);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.artist?.name && data.artist?.name === artistFilter
    );
    if (filtered) {
      setSongs(filtered);
    } else {
      setSongs(undefined);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setSongs(filtered);
    } else {
      setSongs(undefined);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setSongs(filtered);
    } else {
      setSongs(undefined);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setSongs(filtered);
    } else {
      setSongs(undefined);
    }
  }, [languageFilter]);

  //haha checking pull

  return (
    <>
      <Meta title="Music Client - Home" />
      {/* Home Section */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="sec_p bg-[#f6f2f4]">
            <div className="container mx-auto p-4 sm:p-0">
              {/* Search Bar  */}
              <div className="relative shadow-md">
                <Input
                  type="text"
                  placeholder="Search Here..."
                  className="input_search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch
                  size={20}
                  className="text-gray-300 absolute top-[12px] left-[15px]"
                />
              </div>
              {/* List of filter */}
              <div className="flex w-full justify-between flex-wrap items-center gap-4 mt-12">
                {artist && albums && (
                  <>
                    <FilterButtons filterData={artist} flag={"Artist"} />
                    <FilterButtons filterData={albums} flag={"Albums"} />
                    <FilterButtons filterData={LANGUAGE} flag={"Language"} />
                    <FilterButtons filterData={FILTER} flag={"Category"} />
                  </>
                )}
              </div>
              {/* Render Music List */}
              <motion.div
                className="flex justify-between items-center mt-[3em] flex-wrap gap-6 lg:gap-0"
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {songs && songs.length > 0
                  ? songs?.map((data, index) => (
                      <Card music={data} key={data._id} index={index} />
                    ))
                  : allSongs?.map((data: any, index: any) => (
                      <Card music={data} key={data._id} index={index} />
                    ))}
              </motion.div>
            </div>
          </section>
          {isSongPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
            >
              <MusicPlayer />
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.cookies?.token) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    };
  }
  return {
    props: { isLogin: false },
  };
};
