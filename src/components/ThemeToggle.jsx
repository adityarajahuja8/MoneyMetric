import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggle() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <button
            id="theme-toggle"
            className="theme-toggle-btn"
            onClick={toggle}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
        >
            <span className={`theme-icon ${theme === "dark" ? "active" : ""}`}>
                <FiMoon />
            </span>
            <span className={`theme-icon ${theme === "light" ? "active" : ""}`}>
                <FiSun />
            </span>
            <span className="theme-toggle-slider" />
        </button>
    );
}
