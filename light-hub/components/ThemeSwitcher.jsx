"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(theme);
  return (
    <>
      <Switch
        defaultSelected={theme == "light"}
        size="lg"
        color="primary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={(evt) => {
          if (evt.target.checked == false) {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      ></Switch>
    </>
  );
}
