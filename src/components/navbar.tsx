import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full flex items-center justify-between py-5">
      <h1>Todo</h1>
      <div className="flex items-center gap-2">
        <SignedIn>
          <Button>Todo</Button>
          <SignOutButton>
            <Button>Sign out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <Link href={"/login"} className={buttonVariants({ variant: "link" })}>
            Sign In
          </Link>
          <Link
            href={"/register"}
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
