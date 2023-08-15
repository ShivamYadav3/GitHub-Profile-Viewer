import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handaleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div>
        <button onClick={handaleThemeSwitch}>
          {theme === "dark" ? <span>Light</span> : <span>Dark</span>}
        </button>
      </div>
    </>
  );
};
export default ThemeSwitcher;
