import Image from "next/image";
import Link from "next/link";
import { menuData } from "../../data";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="container mx-auto">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <h5 className="text-red-400 font-bold">Music App</h5>
            </Link>
            {/* Navigation Items */}
            <ul className="flex gap-4 items-center">
              {menuData.map(({ id, url, name }) => (
                <li key={id}>
                  <Link href={url}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
            {/* User Information*/}
            <div className="user">
              <Image
                src="https://randomuser.me/api/portraits/men/88.jpg"
                width={50}
                height={50}
                alt="Razu Islam"
                className="object-cover"
              />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
