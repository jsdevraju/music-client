import React, { useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMusicalNote } from "react-icons/io5";
import ImageLoader from "../../app/Components/ImgLoader/ImageLoader";
import ImageUploader from "../../app/Components/ImageUploader/ImageUploader";
import DisabledButton from "../../app/Components/DisableButton/DisableButton";
import AddNewArtist from "../../app/Components/Add/Artist";
import AddNewAlbum from "../../app/Components/Add/Add";
import { storage } from "../../firebase";
import toast from "react-hot-toast";

const DashboardNewSong = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageUrl, setSongImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [songName, setSongName] = useState("");
  const [audioAsset, setAudioAsset] = useState("");
  const [duration, setDuration] = useState(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const deleteImageObject = (songURL: string, action?:string) => {
    const deleteRef = ref(storage, songURL);
    deleteObject(deleteRef).then(() => {
      toast.success("success");
      toast.error("File removed successfully");
      setAudioAsset("")
      if(action === "image") setSongImageUrl("")
    });
  };

  return (
    <>
      <section className="bg-gray-100 sec_p">
        <div className="container mx-auto">
          <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <input
                  type="text"
                  placeholder="Type your song name"
                  className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                />

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
                        onClick={() => {}}
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
