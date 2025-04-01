
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/layout/Navbar";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-aliceblue to-seasalt dark:from-ruddyblue2/30 dark:to-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Join TrustRecruit India</h1>
            <p className="text-muted-foreground">Create an account to find verified job opportunities or post trusted job listings across India</p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default Register;
