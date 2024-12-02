import { FaReadme } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAttribution } from "react-icons/md";
import { IoBugSharp } from "react-icons/io5";

export default function Footer() {
  const media = [
    {
      icon: <FaReadme size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/wiki",
      title: "Documentation",
    },
    {
      icon: <FaCode size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA",
      title: "View source",
    },
    {
      icon: <IoBugSharp size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: "Report an issue",
    },
    {
      icon: <LuMessagesSquare size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: "Feedback",
    },
    {
      icon: <FaUsers size={25} />,
      link: "https://github.com/kaliacad",
      title: "Developed by Kali Academy",
    },
    {
      icon: <MdOutlineAttribution size={25} />,
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
          className="flex items-center gap-2"
        >
          <div>{m.icon}</div>
          <p className="font-bold">{m.title}</p>
        </a>
      </li>
    );
  });

  return (
    <footer className="flex items-center h-[50px] absolute bottom-0 w-full bg-[#506efa] opacity-100">
      <ul className="text-white flex justify-around items-center w-full">
        {showMenu}
      </ul>
    </footer>
  );
}
