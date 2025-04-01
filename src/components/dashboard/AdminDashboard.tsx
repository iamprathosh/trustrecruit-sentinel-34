
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  Building, 
  Check, 
  Flag, 
  Shield, 
  ShieldAlert, 
  ThumbsDown, 
  User as UserIcon, 
  Users 
} from "lucide-react";
import { getJobs, Job, updateJobStatus } from "@/services/jobService";
import { toast } from "sonner";
import { PieChart, Pie, Cell, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data
const users = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", verified: true, status: "active", reports: 0 },
  { id: "2", name: "Recruiter User", email: "recruiter@example.com", role: "recruiter", verified: true, status: "active", reports: 0 },
  { id: "3", name: "Job Seeker", email: "user@example.com", role: "job_seeker", verified: true, status: "active", reports: 0 },
  { id: "7", name: "John Money", email: "johnmoney@example.com", role: "recruiter", verified: false, status: "flagged", reports: 5 },
];

const reports = [
  { id: "1", type: "job", targetId: "4", reason: "Suspicious job posting", reportedBy: "3", date: "2023-05-10", status: "pending" },
  { id: "2", type: "job", targetId: "4", reason: "Asking for money", reportedBy: "2", date: "2023-05-11", status: "pending" },
  { id: "3", type: "user", targetId: "7", reason: "Posting fraudulent jobs", reportedBy: "3", date: "2023-05-12", status: "pending" },
];

const trustScoreData = [
  { name: "High Trust (80-100)", value: 65, color: "#00cc66" },
  { name: "Medium Trust (50-79)", value: 25, color: "#ffad33" },
  { name: "Low Trust (0-49)", value: 10, color: "#ff4d4d" },
];

const reportTypeData = [
  { name: "Suspicious Job", value: 45 },
  { name: "Payment Required", value: 25 },
  { name: "False Information", value: 15 },
  { name: "Too Good To Be True", value: 10 },
  { name: "Other", value: 5 },
];

const AdminDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reportedJobs, setReportedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await getJobs();
        setJobs(allJobs);
        
        // Filter reported jobs
        const reported = allJobs.filter(job => job.status === "reported");
        setReportedJobs(reported);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load job data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const handleJobAction = async (jobId: string, action: "approve" | "reject") => {
    try {
      const status = action === "approve" ? "approved" : "rejected";
      const updatedJob = await updateJobStatus(jobId, status);
      
      // Update jobs list
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === jobId ? updatedJob : job)
      );
      
      // Update reported jobs list
      setReportedJobs(prevJobs => 
        prevJobs.filter(job => job.id !== jobId)
      );
      
      toast.success(`Job ${action === "approve" ? "approved" : "rejected"} successfully`);
    } catch (error) {
      console.error(`Error ${action}ing job:`, error);
      toast.error(`Failed to ${action} job`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Listings</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {jobs.filter(job => job.status === "approved").length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(user => user.role === "recruiter").length} recruiters
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Jobs</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportedJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {reports.length} total reports
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Trust Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobs.length > 0 
                ? Math.round(jobs.reduce((acc, job) => acc + job.trustScore, 0) / jobs.length) 
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="fraud-review">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="fraud-review" className="flex items-center">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Fraud Review
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fraud-review">
          <Card>
            <CardHeader>
              <CardTitle>Reported Job Listings</CardTitle>
              <CardDescription>
                Review and take action on job listings that have been reported by users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-6 text-center">Loading...</div>
              ) : reportedJobs.length === 0 ? (
                <div className="py-6 text-center">
                  <Shield className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-semibold">No reported jobs</h3>
                  <p className="text-muted-foreground">There are no jobs that require review at this time.</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {reportedJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <Badge variant="destructive" className="flex items-center">
                            <Flag className="mr-1 h-3 w-3" />
                            {job.reports?.count || 0} Reports
                          </Badge>
                        </div>
                        
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Report Reasons:</h4>
                          <ul className="text-sm list-disc list-inside">
                            {job.reports?.reasons.map((reason, index) => (
                              <li key={index}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-3 text-sm">
                          <p className="line-clamp-2">{job.description}</p>
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleJobAction(job.id, "approve")}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleJobAction(job.id, "reject")}
                          >
                            <ThumbsDown className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Monitor and manage user accounts to maintain platform integrity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {user.role.replace('_', ' ')}
                            </Badge>
                            {user.verified ? (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                                Unverified
                              </Badge>
                            )}
                            {user.reports > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.reports} Reports
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {user.status === "flagged" && (
                            <Button variant="destructive" size="sm">
                              Suspend
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trust Score Distribution</CardTitle>
                <CardDescription>
                  Distribution of job listings by trust score range.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trustScoreData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trustScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Report Reasons</CardTitle>
                <CardDescription>
                  Breakdown of reports by reason category.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart
                      data={reportTypeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ff4d4d" name="Reports" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
