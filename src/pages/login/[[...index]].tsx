import React from "react";
import { SignIn } from "@clerk/nextjs";

const login = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/register"
        afterSignInUrl={"/todo"}
      />
    </main>
  );
};

export default login;
