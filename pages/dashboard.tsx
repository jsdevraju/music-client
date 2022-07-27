import React from "react";
import { FaUserFriends } from "react-icons/fa";
import DashboardCard from "../app/Components/DashboardCard/DashboardCard";
import DashboardNavbar from "../app/Components/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
  return (
    <>
      <section className="sec_p">
        <div className="container mx-auto">
          <DashboardNavbar />
          <div className="mt-8 flex items-center gap-10 flex-wrap">
            <DashboardCard
              icon={<FaUserFriends />}
              name="Users"
              length={2}
              color="bg-red-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Users"
              length={2}
              color="bg-green-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Users"
              length={2}
              color="bg-yellow-400"
            />
            <DashboardCard
              icon={<FaUserFriends />}
              name="Users"
              length={2}
              color="bg-emerald-400"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
