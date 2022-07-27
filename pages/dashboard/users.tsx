import React from "react";
import DashboardNavbar from "../../app/Components/DashboardNavbar/DashboardNavbar";
import Input from "../../app/Components/Input/Input";
import DashboardUserCard from "../../app/Components/UserCard";


const data = {
  _id: "1",
  name: "hello",
  email: "test1@gmail.com",
  avatar:"https://randomuser.me/api/portraits/men/58.jpg",
  formGoogle:true,
  role: "user",
  createdAt:"2022-07-26T07:52:39.808+00:00",
  updatedAt:"2022-07-26T07:52:39.808+00:00",
  __v:0
}

const Users = () => {
  return (
    <>
      <section className="sec_p">
        <div className="container mx-auto">
          <DashboardNavbar />
          {/* Search Bar */}
          <div className="flex items-center justify-center mt-8">
            <Input
              placeholder="Search..."
              type="text"
              className="border border-1 border-gray-300 p-2 rounded-md outline-none"
            />
          </div>
          {/* User List */}
          <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
            <div className="absolute top-4 left-4">
              <p className="text-xl font-bold">
                <span className="text-sm font-semibold text-textColor mr-2">
                  Count :
                </span>
                2
              </p>
            </div>

            <div className="w-full min-w-[750px] flex items-center justify-between mt-2">
              {/* prettier-ignore */}
              <p className="table">Image</p>
              {/* prettier-ignore */}
              <p className="table">Name</p>
              {/* prettier-ignore */}
              <p className="table">Email</p>
              {/* prettier-ignore */}
              <p className="table">FormGoogle</p>
              {/* prettier-ignore */}
              <p className="table">Created</p>
              {/* prettier-ignore */}
              <p className="table">Role</p>
            </div>
            <DashboardUserCard data={data} key={data._id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
