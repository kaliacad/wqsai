import { FaUsers } from "react-icons/fa";
import { MdOutlineAttribution } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { BookOpenText } from "lucide-react";
import { Code } from "lucide-react";
import { Bug } from "lucide-react";
import { MessagesSquareIcon } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const media = [
    {
      icon: <BookOpenText />,
      link: "https://github.com/kaliacad/wikidataqueriIA/wiki",
      title: `${t("footer.text1")}`,
    },
    {
      icon: <Code />,
      link: "https://github.com/kaliacad/wikidataqueriIA",
      title: `${t("footer.text2")}`,
    },
    {
      icon: <Bug />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: `${t("footer.text3")}`,
    },
    {
      icon: <MessagesSquareIcon />,
      link: "https://github.com/kaliacad/wikidataqueriIA/issues",
      title: `${t("footer.text4")}`,
    },
    {
      icon: <FaUsers size={24} />,
      link: "https://github.com/kaliacad",
      title: `${t("footer.text5")}`,
    },
    {
      icon: <MdOutlineAttribution size={24} />,
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
          className="flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors duration-200"
        >
          <div>{m.icon}</div>
          <p>{m.title}</p>
        </a>
      </li>
    );
  });

  return (
    <footer className="bg-background text-foreground flex items-center h-[50px] w-full border-t opacity-100 flex-shrink-0">
      <ul className="flex flex-wrap justify-around items-center w-full">
        {showMenu}
      </ul>
    </footer>
  );
}
