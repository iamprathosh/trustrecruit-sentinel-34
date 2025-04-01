
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/layout/Navbar";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-aliceblue to-seasalt dark:from-ruddyblue2/30 dark:to-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back to TrustRecruit India</h1>
            <p className="text-muted-foreground">Log in to access trusted job opportunities</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
