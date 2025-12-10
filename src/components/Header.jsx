import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

export default function Header({ onClick }) {
  const { t } = useTranslation();
  return (
    <header className="h-[50px] flex justify-between items-center gap-2">
      <Button onClick={onClick}>
        <Play />
        {t("header.text1")}
      </Button>
      <LanguageSelector />
    </header>
  );
}
