(function () {
    const root = document.documentElement;
    const storageKey = "theme";
    const getToggleButton = () =>
        document.querySelector(
            '#theme-toggle, .theme-toggle, [data-theme-toggle]'
        );
    const getStoredTheme = () => localStorage.getItem(storageKey);
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        updateButtonIcon(theme);
    };
    const updateButtonIcon = (theme) => {
        const btn = getToggleButton();
        if (!btn) return;
        const icon = btn.querySelector(".icon");
        if (!icon) return;
        icon.setAttribute("icon", theme === "dark" ? "mdi:weather-night" : "mdi:white-balance-sunny");
    };
    const setTheme = (theme) => {
        localStorage.setItem(storageKey, theme);
        applyTheme(theme);
    };
    const toggleTheme = () => {
        const current = root.getAttribute("data-theme") || getSystemTheme();
        setTheme(current === "dark" ? "light" : "dark");
    };
    const init = () => {
        const stored = getStoredTheme();
        const theme = stored || getSystemTheme();
        applyTheme(theme);
        const btn = getToggleButton();
        if (btn) {
            btn.addEventListener("click", toggleTheme);
        }
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();