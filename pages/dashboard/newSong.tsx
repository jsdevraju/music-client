import React, { useEffect, useRef, useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import ImageLoader from "../../app/Components/ImgLoader/ImageLoader";
import ImageUploader from "../../app/Components/ImageUploader/ImageUploader";
import DisabledButton from "../../app/Components/DisableButton/DisableButton";
import AddNewArtist from "../../app/Components/Add/Artist";
import AddNewAlbum from "../../app/Components/Add/Add";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import { FILTER, LANGUAGE } from "../../app/data";
import { getAlbums, getArtists, saveNewSong } from "../../app/api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FilterButtons from "../../app/Components/FilterButton/FilterButton";
import { useRouter } from "next/router";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";

const DashboardNewSong = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageUrl, setSongImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [filterArtist, setFilterArtist] = useState<any[]>();
  const [filterAlbum, setFilterAlbum] = useState<any[]>();
  const [songName, setSongName] = useState("");
  const [audioAsset, setAudioAsset] = useState("");
  const [filter, setFilter] = useState<string[]>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const deleteImageObject = (songURL: string, action?: string) => {
    const deleteRef = ref(storage, songURL);
    deleteObject(deleteRef).then(() => {
      toast.success("success");
      toast.error("File removed successfully");
      setAudioAsset("");
      if (action === "image") setSongImageUrl("");
    });
  };

  const getArtist = async () => {
    const data = await getArtists(token);
    const obj = data?.map((newData: any) => {
      return { name: newData._id, imageUrl: newData.imageUrl };
    });
    setFilterAlbum(obj);
  };

  const getAlbum = async () => {
    const data = await getAlbums(token);
    const obj = data?.map((newData: any) => {
      return { name: newData._id, imageUrl: newData.imageUrl };
    });
    setFilterArtist(obj);
  };

  useEffect(() => {
    token && getArtist();
    token && getAlbum();
  }, [token]);

  const saveNewSongToDB = async () => {
    if (!filter) return;
    try {
      await saveNewSong(token, {
        name: songName,
        imageUrl: songImageUrl,
        songUrl: audioAsset,
        album: filter[3],
        artist: filter[2],
        language: filter[1],
        category: filter[0],
      });
      toast.success("Created new song");
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-gray-100 sec_p">
        <div className="container mx-auto">

    {/* Navbar */}
    <DashboardNavbar />

          <div className=" mt-[3em] flex items-center justify-center p-4 border border-gray-300 rounded-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <input
                  type="text"
                  placeholder="Type your song name"
                  className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                />

                <div className="flex w-full justify-between flex-wrap items-center gap-4">
                  {filterAlbum && filterArtist && (
                    <>
                      <FilterButtons
                        filter={filter}
                        setFilter={setFilter}
                        filterData={filterArtist}
                        flag={"Artist"}
                      />
                      <FilterButtons
                        filter={filter}
                        setFilter={setFilter}
                        filterData={filterAlbum}
                        flag={"Albums"}
                      />
                      <FilterButtons
                        filter={filter}
                        setFilter={setFilter}
                        filterData={LANGUAGE}
                        flag={"Language"}
                      />
                      <FilterButtons
                        filter={filter}
                        setFilter={setFilter}
                        filterData={FILTER}
                        flag={"Category"}
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 w-full flex-wrap">
                  <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                    {isImageLoading && (
                      <ImageLoader progress={uploadProgress} />
                    )}
                    {!isImageLoading && (
                      <>
                        {!songImageUrl ? (
                          <ImageUploader
                            setImageURL={setSongImageUrl}
                            isLoading={setIsImageLoading}
                            setProgress={setUploadProgress}
                            isImage={true}
                          />
                        ) : (
                          <div className="relative w-full h-full overflow-hidden rounded-md">
                            <img
                              src={songImageUrl}
                              alt="uploaded image"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                              onClick={() => {
                                deleteImageObject(songImageUrl, "image");
                              }}
                            >
                              <MdDelete className="text-white" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                    {isAudioLoading && (
                      <ImageLoader progress={uploadProgress} />
                    )}
                    {!isAudioLoading && (
                      <>
                        {!audioAsset ? (
                          <ImageUploader
                            setImageURL={setAudioAsset}
                            isLoading={setIsAudioLoading}
                            setProgress={setUploadProgress}
                            isImage={false}
                          />
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                            <audio ref={audioRef} src={audioAsset} controls />
                            <button
                              type="button"
                              className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                              onClick={() => {
                                deleteImageObject(audioAsset);
                              }}
                            >
                              <MdDelete className="text-white" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-end w-full p-4">
                    {isImageLoading || isAudioLoading ? (
                      <DisabledButton />
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.75 }}
                        className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                        onClick={saveNewSongToDB}
                      >
                        Send
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full p-4">
                <AddNewArtist />
                <AddNewAlbum />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardNewSong;
