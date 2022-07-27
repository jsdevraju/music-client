import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";

const DashboardNavbar = () => {
  const router = useRouter();

  const dashboardNav = [
    {
      id: 1,
      url: "/dashboard",
      name: "Dash Home",
      className:
        router.pathname == "/dashboard"
          ? `nav-links active_links`
          : `nav-links`,
    },
    {
      id: 2,
      url: "/dashboard/users",
      name: "User",
      className:
        router.pathname == "/dashboard/users"
          ? `nav-links active_links`
          : `nav-links`,
    },
    {
      id: 13,
      url: "/dashboard/songs",
      name: "Songs",
      className:
        router.pathname == "/dashboard/songs"
          ? `nav-links active_links`
          : `nav-links`,
    },
    {
      id: 4,
      url: "/dashboard/artist",
      name: "Artist",
      className:
        router.pathname == "/dashboard/artist"
          ? `nav-links active_links`
          : `nav-links`,
    },
    {
      id: 5,
      url: "/dashboard/album",
      name: "Album",
      className:
        router.pathname == "/dashboard/album"
          ? `nav-links active_links`
          : `nav-links`,
    },
  ];

  return (
    <div>
      <ul className="flex items-center gap-10 justify-center">
        {dashboardNav.map((item) => (
          <li key={item.id}>
            <Link href={item.url}>
              <a className={item.className}>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardNavbar;
