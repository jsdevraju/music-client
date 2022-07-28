import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import ArtistCard from "../../app/Components/ArtistCard";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IArtis } from "../../app/utils";
import { getArtists } from "../../app/api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../../app/Components/Loader/Loader";

const Artist = () => {
  const [artist, setArtist] = useState<IArtis[]>();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const getArtist = async () => {
    const data = await getArtists(token);
    setLoading(false);
    setArtist(data);
  };

  useEffect(() => {
    token && getArtist();
  }, [token]);

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
                {artist && artist?.length}
              </p>
              <motion.div
                className="flex justify-between items-center mt-[3em] flex-wrap w-full"
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {artist &&
                  artist.map((artist) => (
                    <ArtistCard artist={artist}>
                      <div className="flex justify-center items-center gap-2">
                        <a
                          href={artist.linkedinLink}
                          rel="noreferrer"
                          target="_blank"
                          className="text-blue-500"
                        >
                          <FaLinkedinIn />
                        </a>
                        <a
                          href={artist.instagramLink}
                          rel="noreferrer"
                          target="_blank"
                          className="text-yellow-500"
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </ArtistCard>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Artist;
