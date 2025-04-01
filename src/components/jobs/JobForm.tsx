
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createJob } from "@/services/jobService";
import { analyzeJobPosting } from "@/services/fraudDetectionService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const JobForm: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(user?.name === "Recruiter User" ? "TechCorp" : "");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fraudAnalysis, setFraudAnalysis] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      // Prepare job data for analysis
      const jobData = {
        title,
        company,
        location,
        description,
        requirements: requirements.split('\n').filter(req => req.trim()),
        salary
      };
      
      // Analyze job posting
      const result = await analyzeJobPosting(jobData);
      setFraudAnalysis(result);
      
      if (result.isFraudulent) {
        toast.error("This job posting contains suspicious elements and may be fraudulent.");
      } else if (result.trustScore < 80) {
        toast.warning("This job posting has some suspicious elements. Please review and update.");
      } else {
        toast.success("Job posting analysis complete. Your posting looks good!");
      }
    } catch (error) {
      console.error("Error analyzing job:", error);
      toast.error("Failed to analyze job posting");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // If we haven't analyzed yet, do it now
      if (!fraudAnalysis) {
        const jobData = {
          title,
          company,
          location,
          description,
          requirements: requirements.split('\n').filter(req => req.trim()),
          salary
        };
        
        const result = await analyzeJobPosting(jobData);
        setFraudAnalysis(result);
        
        // If fraudulent, don't continue with submission
        if (result.isFraudulent) {
          toast.error("This job posting contains suspicious elements and cannot be submitted.");
          setIsSubmitting(false);
          return;
        }
      } else if (fraudAnalysis.isFraudulent) {
        toast.error("Please fix the suspicious elements before submitting.");
        setIsSubmitting(false);
        return;
      }
      
      // Create the job
      await createJob({
        title,
        company,
        location,
        description,
        requirements: requirements.split('\n').filter(req => req.trim()),
        salary,
        recruiter: {
          id: user?.id || "",
          name: user?.name || "",
          verified: user?.verified || false
        }
      });
      
      toast.success("Job posted successfully! It will be reviewed before publication.");
      
      // Reset form
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setRequirements("");
      setSalary("");
      setFraudAnalysis(null);
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job posting");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTrustScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <Badge variant="outline" className="trust-badge trust-badge-high">
          <ShieldCheck className="h-3 w-3 mr-1" />
          High Trust Score: {score}
        </Badge>
      );
    } else if (score >= 50) {
      return (
        <Badge variant="outline" className="trust-badge trust-badge-medium">
          <InfoIcon className="h-3 w-3 mr-1" />
          Medium Trust Score: {score}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="trust-badge trust-badge-low">
          <ShieldAlert className="h-3 w-3 mr-1" />
          Low Trust Score: {score}
        </Badge>
      );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>Fill out the form to create a new job posting</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAnalyze} id="analyze-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. TechCorp"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA (Remote)"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job role, responsibilities, and company culture..."
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (one per line)</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. 5+ years of experience with JavaScript/TypeScript..."
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salary">Salary Range (optional)</Label>
            <Input
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>
        </form>
        
        {fraudAnalysis && (
          <div className="mt-6">
            <Alert variant={fraudAnalysis.isFraudulent ? "destructive" : fraudAnalysis.trustScore < 80 ? "default" : "default"}>
              <div className="flex justify-between items-start">
                <div>
                  {fraudAnalysis.isFraudulent ? (
                    <ShieldAlert className="h-4 w-4" />
                  ) : fraudAnalysis.trustScore < 80 ? (
                    <InfoIcon className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  <AlertTitle>Job Posting Analysis</AlertTitle>
                  <AlertDescription>
                    {fraudAnalysis.recommendation}
                    
                    {fraudAnalysis.flaggedContent.length > 0 && (
                      <div className="mt-2">
                        <strong>Flagged content:</strong>
                        <ul className="list-disc list-inside">
                          {fraudAnalysis.flaggedContent.map((flag: string, index: number) => (
                            <li key={index} className="text-sm">{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AlertDescription>
                </div>
                <div>
                  {getTrustScoreBadge(fraudAnalysis.trustScore)}
                </div>
              </div>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="submit"
          form="analyze-form"
          variant="outline"
          disabled={isAnalyzing || isSubmitting}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Job Posting"}
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || isAnalyzing || (fraudAnalysis && fraudAnalysis.isFraudulent)}
          className={fraudAnalysis && !fraudAnalysis.isFraudulent ? "" : ""}
        >
          {isSubmitting ? "Submitting..." : "Post Job"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobForm;
