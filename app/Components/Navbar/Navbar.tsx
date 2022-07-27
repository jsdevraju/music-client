import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";

const Navbar = () => {
  const router = useRouter();

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

  return (
    <>
      <header className="p-2 shadow-md">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <h5 className="text-red-400 font-bold">Music App</h5>
            </Link>
            {/* Navigation Items */}
            <ul className="flex gap-4 items-center">
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
              onMouseEnter={() => setMenu(!menu)}
              onMouseLeave={() => setMenu(!menu)}
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
                  className="absolute top-[50px] bg-gray-200 p-4 rounded-sm leading-7 z-10"
                >
                  {afterLogin.map(({ id, url, name, className }) => (
                    <li key={id}>
                      <Link href={url}>
                        <a className={`${className} text-gray-500`}>{name}</a>
                      </Link>
                    </li>
                  ))}
                  <Button className="btn-primary">Logout</Button>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
