import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiEndPoint } from "../../utils";
import axios from "axios";
import toast from "react-hot-toast";
import { setAuth } from "../../slices/authSlice";
import cookie from "js-cookie";
import Loader from "../Loader/Loader";
import { GetServerSideProps } from "next";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const menuData = [
    {
      id: 1,
      url: "/",
      name: "Home",
      className:
        router.pathname == "/" ? `nav-links active_links` : `nav-links`,
    },
    {
      id: 2,
      url: "/music",
      name: "Music",
      className:
        router.pathname == "/music" ? `nav-links active_links` : `nav-links`,
    },
    {
      id: 13,
      url: "/premium",
      name: "Premium",
      className:
        router.pathname == "/premium" ? `nav-links active_links` : `nav-links`,
    },
    {
      id: 4,
      url: "/contact",
      name: "Contact",
      className:
        router.pathname == "/contact" ? `nav-links active_links` : `nav-links`,
    },
  ];

  const afterLogin = [
    {
      id: 1,
      url: "/profile",
      name: "Profile",
      className:
        router.pathname == "/profile" ? `nav-links actibe_link` : `nav-links`,
    },
    {
      id: 2,
      url: "/favorites",
      name: "Favorites",
      className:
        router.pathname == "/favorites" ? `nav-links actibe_link` : `nav-links`,
    },
  ];

  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiEndPoint}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      toast.success("Logout Successfully");
      dispatch(setAuth(data));
      localStorage.removeItem("user");
      cookie.remove("token");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        token && (
          <header className="p-2 shadow-md">
            <div className="container mx-auto p-4 sm:p-0">
              <nav className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                  <h5 className="text-red-400 font-bold">Music App</h5>
                </Link>
                {/* Navigation Items */}
                <ul className="hidden sm:flex gap-4 items-center">
                  {menuData.map(({ id, url, name, className }) => (
                    <li key={id}>
                      <Link href={url}>
                        <a className={className}>{name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* User Information*/}
                <div
                  className="user cursor-pointer relative"
                  onMouseEnter={() => setMenu(true)}
                  onMouseLeave={() => setMenu(false)}
                >
                  <Image
                    src="https://randomuser.me/api/portraits/men/88.jpg"
                    width={50}
                    height={50}
                    alt="Razu Islam"
                    className="object-cover"
                  />
                  {menu && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      className="absolute top-[50px] right-0 bg-gray-200 p-4 rounded-sm leading-7 z-10"
                    >
                      {afterLogin.map(({ url, name, className }, index) => (
                        <li key={index}>
                          <Link href={url && url}>
                            <a className={`${className} text-gray-500`}>
                              {name}
                            </a>
                          </Link>
                        </li>
                      ))}

                      {user && user.role === "admin" && (
                        <li>
                          <Link href="/dashboard">
                            <a className="nav-links">Admin</a>
                          </Link>
                        </li>
                      )}
                      <Button className="btn-primary" onClick={handleLogout}>
                        Logout
                      </Button>
                    </motion.div>
                  )}
                </div>
              </nav>
            </div>
          </header>
        )
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
  return {
    props: { isLogin: false },
  };
};

export default Navbar;
