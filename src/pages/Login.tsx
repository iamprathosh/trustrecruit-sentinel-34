
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/layout/Navbar";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
