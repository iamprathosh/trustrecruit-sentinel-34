
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flag, 
  Building, 
  MapPin, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job, reportJob } from "@/services/jobService";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReportModal from "./ReportModal";
import { toast } from "sonner";

interface JobCardProps {
  job: Job;
  onJobUpdate?: (updatedJob: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onJobUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [isReporting, setIsReporting] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const getTrustBadge = (score: number) => {
    if (score >= 80) {
      return <Badge variant="outline" className="trust-badge trust-badge-high">Highly Trusted</Badge>;
    } else if (score >= 60) {
      return <Badge variant="outline" className="trust-badge trust-badge-medium">Trusted</Badge>;
    } else {
      return <Badge variant="outline" className="trust-badge trust-badge-low">Low Trust</Badge>;
    }
  };

  const getPostedDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  const handleReport = async (reason: string) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to report a job");
      return;
    }

    setIsReporting(true);
    try {
      const updatedJob = await reportJob(job.id, reason);
      toast.success("Job reported successfully");
      if (onJobUpdate) {
        onJobUpdate(updatedJob);
      }
    } catch (error) {
      console.error("Error reporting job:", error);
      toast.error("Failed to report job");
    } finally {
      setIsReporting(false);
      setIsReportModalOpen(false);
    }
  };

  return (
    <Card className={`w-full ${job.status === 'reported' ? 'border-trust-low border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
              {job.recruiter.verified && (
                <span className="ml-2 inline-flex items-center">
                  <ShieldCheck className="h-4 w-4 text-trust-verified" />
                  <span className="text-xs ml-1 text-trust-verified">Verified</span>
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            {getTrustBadge(job.trustScore)}
            {job.status === "reported" && (
              <Badge variant="destructive" className="mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Reported
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Posted {getPostedDate(job.postedDate)}
          </div>
        </div>
        
        {job.salary && (
          <div className="font-medium">{job.salary}</div>
        )}
        
        <p className="text-sm">{job.description}</p>
        
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h4 className="font-medium mb-1">Requirements:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-primary">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
        
        <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              disabled={job.status === "reported" || isReporting}
            >
              <Flag className="h-4 w-4 mr-2" />
              {job.status === "reported" ? "Reported" : "Report"}
            </Button>
          </DialogTrigger>
          <ReportModal onReport={handleReport} jobTitle={job.title} />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
