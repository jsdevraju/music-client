import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import { motion } from "framer-motion";
import ArtistCard from "../../app/Components/ArtistCard";
import { getAlbums } from "../../app/api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IAlbum } from "../../app/utils";
import Loader from "../../app/Components/Loader/Loader";
import { GetServerSideProps } from "next";

const Album = () => {
  const [album, setAlbum] = useState<IAlbum[]>();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const getAlbum = async () => {
    const data = await getAlbums(token);
    setLoading(false);
    setAlbum(data);
  };

  useEffect(() => {
    token && getAlbum();
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
                2
              </p>
              <motion.div
                className="flex justify-between items-center mt-[3em] flex-wrap w-full"
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {album && album.map((album) => <ArtistCard artist={album} />)}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.cookies?.token) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    };
  }
  else return {
    props: { isLogin: true },
  };
};

export default Album;
