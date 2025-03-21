import { FaReadme } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAttribution } from "react-icons/md";
import { IoBugSharp } from "react-icons/io5";

export default function Footer() {
  const media = [
    {
      icon: <FaReadme size={15} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/wiki",
      title: "Documentation",
    },
    {
      icon: <FaCode size={15} />,
      link: "https://github.com/kaliacad/wikidataqueriIA",
      title: "View source",
    },
    {
      icon: <IoBugSharp size={15} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: "Report an issue",
    },
    {
      icon: <LuMessagesSquare size={15} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: "Feedback",
    },
    {
      icon: <FaUsers size={15} />,
      link: "https://github.com/kaliacad",
      title: "Developed by Kali Academy",
    },
    {
      icon: <MdOutlineAttribution size={15} />,
      link: "https://kaliacademy.org/",
      title: "kaliacad",
    },
  ];

  const showMenu = media.map(function (m, i) {
    return (
      <li key={i}>
        <a
          href={`${m?.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5"
        >
          <div>{m.icon}</div>
          <p className="font-bold">{m.title}</p>
        </a>
      </li>
    );
  });

  return (
    <footer className="flex items-center justify-center h-auto py-2 absolute bottom-0 w-full bg-[#506efa] opacity-100">
      <ul className="text-white flex flex-wrap justify-around items-center w-full text-xs sm:text-sm">
        {showMenu}
      </ul>
    </footer>
  );
}