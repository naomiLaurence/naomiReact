import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext({
    theme: "light",
    toggle: () => { },
});



export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        //read from local storage:
        let t = localStorage.getItem("theme") ?? "light";
        // update the class on the body
        if (t === "dark") {
            document.body.classList.add("dark");
        }
        // update the state:
        setTheme(t);
    }, []);

    // localStorage + useEffect
    // toggle button to change theme
    const toggle = () => {
        // toggle the theme
        const newValue = theme === "light" ? "dark" : "light";

        // save to local storage
        localStorage.setItem("theme", newValue);

        // update the class on the body
        if (newValue === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        // update the state
        setTheme(newValue);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
