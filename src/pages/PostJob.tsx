
import React from "react";
import JobForm from "@/components/jobs/JobForm";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Shield } from "lucide-react";

const PostJob: React.FC = () => {
  const { isAuthenticated, isRecruiter, user } = useAuth();
  
  // Redirect if not authenticated or not a recruiter
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isRecruiter()) {
    return <Navigate to="/jobs" />;
  }
  
  // Redirect if not verified (in a real app)
  // For demo purposes, we'll just show a warning
  const showVerificationWarning = !user?.verified;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
        <p className="text-muted-foreground mb-6">
          Create a new job listing to find the perfect candidate in India
        </p>
        
        {showVerificationWarning && (
          <div className="mb-6 p-4 border rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 flex items-start">
            <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Verification Required</h3>
              <p className="text-sm">
                Your account is not yet verified. As per Indian employment regulations, job listings from unverified recruiters have lower visibility. 
                Please complete the verification process with your company PAN/GST details to improve your trust score.
              </p>
            </div>
          </div>
        )}
        
        <JobForm />
      </main>
    </div>
  );
};

export default PostJob;
