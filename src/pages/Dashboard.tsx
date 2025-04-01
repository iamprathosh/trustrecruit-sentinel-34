
import React from "react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
