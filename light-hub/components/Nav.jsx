"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import React from "react";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { APP_NAME, links } from "@/contants";
import Link from "next/link";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  return (
    <Navbar isBlurred isBordered className="backgroundColor">
      <NavbarBrand>
        <p className="font-bold text-inherit">{APP_NAME}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <NavbarItem>
            <Link className="relative" href={link.href}>
              {link.href === path && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[1px] w-full bg-black"
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
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
