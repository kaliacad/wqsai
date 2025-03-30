import { FaReadme } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAttribution } from "react-icons/md";
import { IoBugSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();
  const media = [
    {
      icon: <FaReadme size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/wiki",
      title: `${t("footer.text1")}`,
    },
    {
      icon: <FaCode size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA",
      title: `${t("footer.text2")}`,
    },
    {
      icon: <IoBugSharp size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: `${t("footer.text3")}`,
    },
    {
      icon: <LuMessagesSquare size={25} />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: `${t("footer.text4")}`,
    },
    {
      icon: <FaUsers size={25} />,
      link: "https://github.com/kaliacad",
      title:`${t("footer.text5")}`,
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
