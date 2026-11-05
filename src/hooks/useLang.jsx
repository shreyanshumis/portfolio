import { createContext, useContext, useState, useCallback } from "react";
import { t as translate } from "../translations";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");

  const switchLang = useCallback((target) => {
    setLang(target);
    document.documentElement.lang = target;
  }, []);

  // t(str) — returns translated string for current lang
  const t = useCallback((str) => translate(str, lang), [lang]);

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
