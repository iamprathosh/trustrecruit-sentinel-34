
import React, { useState, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getJobs, Job } from "@/services/jobService";
import { Search, Filter, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { toast } from "sonner";

// Define Indian locations for filtering
const indianLocations = [
  "All Locations",
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh"
];

const JobListing: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [trustFilter, setTrustFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        // Only show approved jobs on the public listing
        const approvedJobs = jobsData.filter(job => job.status === "approved");
        setJobs(approvedJobs);
        setFilteredJobs(approvedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load job listings");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  useEffect(() => {
    // Apply filters and search
    let result = [...jobs];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
      );
    }
    
    // Trust score filter
    if (trustFilter !== "all") {
      if (trustFilter === "high") {
        result = result.filter(job => job.trustScore >= 80);
      } else if (trustFilter === "medium") {
        result = result.filter(job => job.trustScore >= 50 && job.trustScore < 80);
      } else if (trustFilter === "low") {
        result = result.filter(job => job.trustScore < 50);
      }
    }
    
    // Location filter (India-specific)
    if (locationFilter !== "All Locations") {
      result = result.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    // Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    } else if (sortBy === "trust-high") {
      result.sort((a, b) => b.trustScore - a.trustScore);
    } else if (sortBy === "trust-low") {
      result.sort((a, b) => a.trustScore - b.trustScore);
    }
    
    setFilteredJobs(result);
  }, [jobs, searchTerm, trustFilter, locationFilter, sortBy]);
  
  const handleJobUpdate = (updatedJob: Job) => {
    setJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Find Trusted Job Opportunities in India</h1>
        
        <div className="mb-6">
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs, companies, or skills..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <Select
                value={locationFilter}
                onValueChange={setLocationFilter}
              >
                <SelectTrigger className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {indianLocations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <Select
                value={trustFilter}
                onValueChange={setTrustFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trust Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trust Scores</SelectItem>
                  <SelectItem value="high">High Trust (80-100)</SelectItem>
                  <SelectItem value="medium">Medium Trust (50-79)</SelectItem>
                  <SelectItem value="low">Low Trust (0-49)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="trust-high">Highest Trust Score</SelectItem>
                  <SelectItem value="trust-low">Lowest Trust Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
            </p>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => {
                setSearchTerm("");
                setTrustFilter("all");
                setLocationFilter("All Locations");
                setSortBy("newest");
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">Loading job listings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new job opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onJobUpdate={handleJobUpdate} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobListing;
