import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getArtists, getSongs, getUsers } from "../app/api";
import DashboardCard from "../app/Components/DashboardCard/DashboardCard";
import DashboardNavbar from "../app/Components/DashboardNavbar/DashboardNavbar";
import Loader from "../app/Components/Loader/Loader";
import { RootState } from "../app/store";
import { IArtis, IMusic, IUser } from "../app/utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<IUser[]>();
  const [artist, setArtist] = useState<IArtis[]>();
  const [songs, setSongs] = useState<IMusic[]>();

  const getUser = async () => {
    const data = await getUsers(token);
    setLoading(false)
    setUsers(data)
  };

  const getArtist = async () => {
    const data = await getArtists(token);
    setLoading(false)
    setArtist(data)
  };

  const getSong = async () => {
    const data = await getSongs(token);
    setLoading(false)
    setSongs(data)
  };

  useEffect(() => {
    token && getUser();
    token && getArtist();
    token && getSong();
  }, [token]);

  return (
    <>
      {loading ? <Loader /> : (
        <section className="sec_p">
        <div className="container mx-auto">
          <DashboardNavbar />
          <div className="mt-8 flex items-center gap-10 flex-wrap">
            {users && artist && songs && (
              <>
              <DashboardCard
              icon={<FaUserFriends />}
              name="Users"
              length={users && users?.length}
              color="bg-red-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Artist"
              length={artist && artist?.length}
              color="bg-green-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Songs"
              length={songs && songs?.length}
              color="bg-yellow-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Album"
              length={users && users?.length}
              color="bg-emerald-400"
            />
              </>
            )}
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Dashboard;
