import React from "react";
import { SignUp } from "@clerk/nextjs";

const login = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <SignUp
        path="/register"
        routing="path"
        signInUrl="/login"
        afterSignUpUrl={"/login"}
      />
    </main>
  );
};

export default login;
