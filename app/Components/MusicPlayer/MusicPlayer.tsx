import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { RiPlayListFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAllSong, setMiniPlayer, setPlaySong, setSong } from "../../slices/musicSlice";
import { getSongs } from "../../api";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const dispatch = useDispatch();
  const { isSongPlaying, miniPlayer, song, allSongs } = useSelector(
    (state: RootState) => state.music
  );

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      const isPlay = { isSongPlaying: false } as any;
      dispatch(setPlaySong(isPlay));
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      const miniPlay = { miniPlayer: false } as any;
      dispatch(setMiniPlayer(miniPlay));
    } else {
      const miniPlay = { miniPlayer: true } as any;
      dispatch(setMiniPlayer(miniPlay));
    }
  };

  const nextTrack = () => {
    if (!song || !allSongs) return;
    if(song || allSongs){
      if (song > allSongs?.length) dispatch(setSong({ song: 0 } as any));
      else dispatch(setSong({ song: song + 1 } as any));
    }
  };

  const previousTrack = () => {
    if (!song || !allSongs) return;
    else if (song === 0) dispatch(setSong({ song: 0 } as any));
    else dispatch(setSong({ song: song - 1 } as any));
  };

  useEffect(() => {
    if (!song || !allSongs) return;
    else if (song > allSongs.length) dispatch(setSong({ song: 0 } as any));
  }, [song, allSongs]);


  return (
    <>
      { allSongs && (
          <div className="w-full full flex items-center gap-3 overflow-hidden">
            <div
              className={`w-full full items-center gap-3 p-4 ${
                miniPlayer ? "absolute top-40" : "flex relative"
              }`}
            >
              <img
                src={allSongs && allSongs[song]?.imageUrl}
                className="w-40 h-20 object-cover rounded-md"
                alt="Razu Islam"
              />
              <div className="flex items-start flex-col">
                <p className="text-xl text-headingColor font-semibold">
                  {`${
                    allSongs[song]?.name.length > 20
                      ? allSongs[song]?.name.slice(0, 20)
                      : allSongs[song]?.name
                  }`}
                  <span className="text-base">({allSongs[song]?.album})</span>
                </p>
                <p className="text-textColor">
                  {allSongs[song]?.artist.name}
                  <span className="text-sm text-textColor font-semibold">
                    ({allSongs[song]?.category})
                  </span>
                </p>
                <motion.i
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsPlayList(!isPlayList)}
                >
                  <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
                </motion.i>
              </div>
              <div className="flex-1">
                <AudioPlayer
                  src={allSongs && allSongs[song]?.songUrl}
                  onPlay={() => console.log("is playing")}
                  autoPlay={true}
                  showSkipControls={true}
                  onClickNext={nextTrack}
                  onClickPrevious={previousTrack}
                />
              </div>
              <div className="h-full flex items-center justify-center flex-col gap-3">
                <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
                  <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                </motion.i>
                <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
                  <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                </motion.i>
              </div>
            </div>
  
            {isPlayList && <PlayListCard />}
  
            {miniPlayer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed right-2 bottom-2 "
              >
                <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
                  <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
                  <img
                    onClick={togglePlayer}
                    src={allSongs[song]?.imageUrl}
                    className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                </div>
              </motion.div>
            )}
          </div>
        
      )}
    </>
  );
};

export const PlayListCard = () => {
  const { isSongPlaying, song, allSongs } = useSelector(
    (state: RootState) => state.music
  );
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allSongs) {
      getSongs(token).then((data) => {
        dispatch(setAllSong({allSongs: data} as any));
      });
    }
  }, []);

  const setCurrentPlaySong = (songindex: number) => {
    if (!isSongPlaying) {
      dispatch(setPlaySong({ isSongPlaying: true } as any));
    }
    else if (song !== songindex) {
      dispatch(setSong({ song: songindex } as any));
    }
  };

  return (
    <>
      {allSongs && (
        <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
          {allSongs?.length > 0 ? (
            allSongs?.map((music, index) => (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer `}
                onClick={() => setCurrentPlaySong(index)}
                key={index}
              >
                <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

                <div className="flex items-start flex-col">
                  <p className="text-lg text-headingColor font-semibold">
                    {`${
                      music?.name.length > 20
                        ? music?.name.slice(0, 20)
                        : music?.name
                    }`}
                    <span className="text-base">({music?.album})</span>
                  </p>
                  <p className="text-textColor">
                    {music?.artist.name}
                    <span className="text-sm text-textColor font-semibold">
                      ({music?.category})
                    </span>
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
