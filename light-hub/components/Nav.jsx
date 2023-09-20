"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import React from "react";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { APP_NAME, links } from "@/utils/contants";
import Link from "next/link";

import { delay, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import GradientBR from "./GradientBR";

export default function Nav() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
            <p className="font-bold text-inherit">{APP_NAME}</p>
          </NavbarBrand>
        </Link>

        <NavbarContent className="hidden sm:flex gap-4 justify-center">
          <Link href={"/"}>
            <NavbarBrand>
              <Icon></Icon>
              <p className="font-bold text-inherit">{APP_NAME}</p>
            </NavbarBrand>
          </Link>
          {links.map((link) => (
            <NavbarItem>
              <Link className="relative" href={link.href}>
                {link.href === path && (
                  <motion.span
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.35 }}
                    className="absolute left-0 top-full block h-[1px] w-full bg-black dark:bg-white"
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
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="bordered">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <GradientBR />
    </>
  );
}
