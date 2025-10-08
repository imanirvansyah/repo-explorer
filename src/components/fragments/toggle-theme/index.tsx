import { Button } from "@/components/ui/button"
import { Icon } from "@iconify-icon/react"
import { useState } from "react";

export const ToggleTheme = () => {
  const [isDark, setIsDark] = useState("light")
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setIsDark(isDark ? "dark" : "light");
  };

  return (
    <Button variant="ghost" onClick={toggleTheme}>
      <Icon icon={isDark === "dark" ? "solar:moon-bold" : "solar:sun-bold"} width={24} />
    </Button>
  )
}