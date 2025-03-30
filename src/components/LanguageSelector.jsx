import React from "react";
import { useTranslation } from "react-i18next";


const LanguageSelector = () => {
  const { i18n } = useTranslation();
  let defaultValue;

  const languages = [
    { lang: "en", name: "English",flag: "🇬🇧" },
    { lang: "fr", name: "Français",flag: "🇫🇷"  },
    { lang: "es", name: "Español",flag: "🇪🇸"},
  ];

  const changeLanguage = (lang) => {
    window.localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);

  };

  defaultValue = window.localStorage.getItem("lang")

//   const index = defaultValue
//   ? flags?.filter((item) => item.lang === defaultValue)
//   : flags[0];

// const [selected, setSelected] = useState(index[0]);



  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        {languages.map(({ lang, name,flag}) => (
          <option key={lang} value={lang}>
             {name} {flag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
