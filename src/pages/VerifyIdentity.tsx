
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Upload } from "lucide-react";
import { toast } from "sonner";

const VerifyIdentity: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to a real verification service in a production app
    toast.success("Verification documents submitted successfully. We'll review them shortly.");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-aliceblue to-seasalt dark:from-ruddyblue2/30 dark:to-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ShieldCheck className="h-12 w-12 text-ruddyblue2" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verify Your Identity</h1>
            <p className="text-muted-foreground">
              To ensure the safety of our platform, we need to verify your identity using government-issued documents
            </p>
          </div>
          
          <Card className="border-powderblue dark:border-ruddyblue/40">
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                {user?.role === "recruiter" 
                  ? "Please provide your company registration details and a government ID" 
                  : "Please provide a government-issued ID for verification"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {user?.role === "recruiter" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your company name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst">GST Number</Label>
                      <Input id="gst" placeholder="e.g., 22AAAAA0000A1Z5" required />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="id-type">ID Type</Label>
                  <select 
                    id="id-type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select ID type</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="voter">Voter ID</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input id="id-number" placeholder="Enter your ID number" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="id-upload">Upload ID (Front & Back)</Label>
                  <div className="border border-dashed border-powderblue dark:border-ruddyblue/40 rounded-md p-6 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Drag & drop your files here or click to browse
                    </p>
                    <input id="id-upload" type="file" multiple className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('id-upload')?.click()}
                      className="border-ruddyblue2 text-ruddyblue2 hover:bg-aliceblue/50"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
                
                {user?.role === "recruiter" && (
                  <div className="space-y-2">
                    <Label htmlFor="company-proof">Company Registration Proof</Label>
                    <div className="border border-dashed border-powderblue dark:border-ruddyblue/40 rounded-md p-6 flex flex-col items-center justify-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground text-center">
                        Drag & drop your files here or click to browse
                      </p>
                      <input id="company-proof" type="file" className="hidden" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('company-proof')?.click()}
                        className="border-ruddyblue2 text-ruddyblue2 hover:bg-aliceblue/50"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  <p>We take your privacy seriously. All documents are encrypted and will only be used for verification purposes.</p>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full bg-ruddyblue2 hover:bg-ruddyblue">Submit for Verification</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VerifyIdentity;
