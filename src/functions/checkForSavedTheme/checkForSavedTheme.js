import { themeToggle } from "../themeToggle/themeToggle";

const checkForSavedTheme = () => {
    const isThemeDark = localStorage.getItem('theme');
    if (isThemeDark === 'darkTheme'){
       themeToggle()
    }
}

export default checkForSavedTheme