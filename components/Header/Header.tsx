import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggler } from "./theme-toggler";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16">
      <Link href="/" className="flex items-center h-full">
        <div className="bg-[#0160FE] flex h-full">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            alt="Dropbox"
            width="50"
            height="50"
            className="invert object-contain"
          />
        </div>
        <h2 className="ml-3 font-semibold text-xl">Hms-Dropbox</h2>
      </Link>

      <div className="flex items-center justify-between gap-4 pe-2">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/dashboard" />
        </SignedOut>
        <Button variant={"outline"}>Sign Up</Button>
      </div>
    </header>
  );
}