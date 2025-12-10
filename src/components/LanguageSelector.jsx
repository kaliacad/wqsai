import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  let defaultValue;

  const languages = [
    { lang: "en", name: "English", flag: "🇬🇧" },
    { lang: "fr", name: "Français", flag: "🇫🇷" },
    { lang: "es", name: "Español", flag: "🇪🇸" },
  ];

  const changeLanguage = (lang) => {
    window.localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  defaultValue = window.localStorage.getItem("lang");

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Select onValueChange={changeLanguage} defaultValue={defaultValue}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map(({ lang, name, flag }) => (
            <SelectItem key={lang} value={lang}>
              {flag} <span>{"  "}</span> {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
