"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { signIn, useSession, signOut } from "next-auth/react";
import React from "react";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { APP_NAME, links } from "@/utils/constants";
import Link from "next/link";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";
import GradientBR from "./GradientBR";

export default function Nav() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);
  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBlurred
        className="backgroundColor"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <Link href={"/"}>
          <NavbarBrand className="sm:hidden pr-3 justify-center">
            <Icon></Icon>
            <h1 className="font-title font-bold pl-1">{APP_NAME}</h1>
          </NavbarBrand>
        </Link>

        <NavbarContent className="hidden sm:flex gap-4 justify-center">
          <Link href={"/"}>
            <NavbarBrand>
              <Icon></Icon>
              <h1 className="font-title2 font-bold pl-15">{APP_NAME}</h1>
            </NavbarBrand>
          </Link>
          {links.map((link) => (
            <NavbarItem key={link.label}>
              <Link className="relative font-title2" href={link.href}>
                {link.href === path && (
                  <motion.span
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.35 }}
                    className="absolute left-0 top-full block h-[3px] w-full bg-black dark:bg-white"
                  />
                )}
                {link.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher></ThemeSwitcher>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            {session?.user == null ? (
              <Link
                onClick={async () => {
                  const data = await signIn("", {
                    redirect: false,
                    callbackUrl: "/secure/mis-proyectos",
                  });
                  console.log(data);
                  router.push(data.url);
                }}
                href="/"
              >
                Login
              </Link>
            ) : (
              <>{session?.user?.name}</>
            )}
          </NavbarItem>
          <NavbarItem>
            <Link href="/register" color="primary" variant="bordered">
              Sign Up
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={async () => {
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/",
                });
                router.push(data.url);
              }}
              as={Link}
              color="primary"
              href="#"
              variant="bordered"
            >
              Sign Out
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <GradientBR />
    </>
  );
}
