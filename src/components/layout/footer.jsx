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
      link: "https://github.com/kaliacad/wqsai/wiki",
      title: `${t("footer.text1")}`,
    },
    {
      icon: <Code />,
      link: "https://github.com/kaliacad/wqsai",
      title: `${t("footer.text2")}`,
    },
    {
      icon: <Bug />,
      link: "https://github.com/kaliacad/wqsai/issues",
      title: `${t("footer.text3")}`,
    },
    {
      icon: <MessagesSquareIcon />,
      link: "https://github.com/kaliacad/wqsai/issues",
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
      // Added responsive widths to list items so they wrap nicely on small screens
      <li key={i} className="my-1 shrink-0 md:w-auto">
        <a
          href={`${m?.link}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.title}
          className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-foreground transition-colors duration-200"
        >
          <div className="shrink-0">{m.icon}</div>
          <p className="hidden lg:block truncate max-w-[10rem] sm:max-w-[12rem]">{m.title}</p>
        </a>
      </li>
    );
  });

  return (
    // Allow height to grow on small screens, keep fixed height on md+; add small vertical padding on mobile
    <footer className="bg-background text-foreground flex items-center w-full border-t opacity-100 flex-shrink-0 h-auto md:h-[50px] py-2 md:py-0">
      {/* Center items on mobile, spread out on md+; add gaps and horizontal padding */}
      <ul className="flex flex-nowrap overflow-x-auto justify-center md:justify-around items-center w-full gap-2 sm:gap-3 md:gap-6 px-2">
        {showMenu}
      </ul>
    </footer>
  );
}
