"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export const LayoutProvider = ({ children }) => {
  return (
    <>
      {pathname === "/posts" && <h1>Welcome to Posts page!</h1>}
      {children}
    </>
  );
};
export function Providers({ children }) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
