
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  recruiter: {
    id: string;
    name: string;
    verified: boolean;
  };
  trustScore: number;
  status: "pending" | "approved" | "rejected" | "reported";
  reports?: {
    count: number;
    reasons: string[];
  };
}

// Mock data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    description: "TechCorp is looking for a Senior Software Engineer to join our team. You will be responsible for developing and maintaining our core products.",
    requirements: [
      "5+ years of experience with JavaScript/TypeScript",
      "Experience with React and Node.js",
      "Bachelor's degree in Computer Science or related field"
    ],
    salary: "$120,000 - $150,000",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    recruiter: {
      id: "2",
      name: "Recruiter User",
      verified: true
    },
    trustScore: 95,
    status: "approved"
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateTech",
    location: "New York, NY",
    description: "InnovateTech is seeking a Product Manager to lead our product development team. You will be responsible for defining product vision and strategy.",
    requirements: [
      "3+ years of experience in product management",
      "Experience with agile methodologies",
      "Strong communication and leadership skills"
    ],
    salary: "$100,000 - $130,000",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    recruiter: {
      id: "5",
      name: "Jane Smith",
      verified: true
    },
    trustScore: 87,
    status: "approved"
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataInsights",
    location: "Remote",
    description: "Join our team of data scientists to analyze and interpret complex data sets. You will use advanced statistical techniques to drive business insights.",
    requirements: [
      "Master's or PhD in Statistics, Math, or Computer Science",
      "Experience with Python, R, and SQL",
      "Knowledge of machine learning algorithms"
    ],
    salary: "$110,000 - $140,000",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    recruiter: {
      id: "6",
      name: "Mark Johnson",
      verified: true
    },
    trustScore: 92,
    status: "approved"
  },
  {
    id: "4",
    title: "URGENT! Make $10,000/week working from home!",
    company: "QuickCash Enterprises",
    location: "Anywhere",
    description: "Make tons of money using our secret system! No experience required! Just pay a small fee to get started!!!",
    requirements: [
      "No experience needed!",
      "Must have internet connection",
      "Valid credit card for registration fee ($99)"
    ],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    recruiter: {
      id: "7",
      name: "John Money",
      verified: false
    },
    trustScore: 15,
    status: "reported",
    reports: {
      count: 5,
      reasons: ["Suspicious job posting", "Asking for money", "Too good to be true"]
    }
  }
];

// Get all jobs
export const getJobs = async (): Promise<Job[]> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 500);
  });
};

// Get job by ID
export const getJobById = async (id: string): Promise<Job | undefined> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = mockJobs.find(job => job.id === id);
      resolve(job);
    }, 300);
  });
};

// Create a new job
export const createJob = async (jobData: Omit<Job, "id" | "postedDate" | "trustScore" | "status">): Promise<Job> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const newJob: Job = {
        ...jobData,
        id: Date.now().toString(),
        postedDate: new Date().toISOString(),
        trustScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        status: "pending"
      };
      mockJobs.unshift(newJob);
      resolve(newJob);
    }, 500);
  });
};

// Report a job
export const reportJob = async (jobId: string, reason: string): Promise<Job> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = mockJobs.findIndex(job => job.id === jobId);
      if (jobIndex === -1) {
        reject(new Error("Job not found"));
        return;
      }
      
      const job = { ...mockJobs[jobIndex] };
      
      if (!job.reports) {
        job.reports = {
          count: 1,
          reasons: [reason]
        };
      } else {
        job.reports.count += 1;
        if (!job.reports.reasons.includes(reason)) {
          job.reports.reasons.push(reason);
        }
      }
      
      if (job.reports.count >= 3) {
        job.status = "reported";
      }
      
      mockJobs[jobIndex] = job;
      resolve(job);
    }, 500);
  });
};

// Update job status (admin only)
export const updateJobStatus = async (jobId: string, status: Job["status"]): Promise<Job> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = mockJobs.findIndex(job => job.id === jobId);
      if (jobIndex === -1) {
        reject(new Error("Job not found"));
        return;
      }
      
      const job = { ...mockJobs[jobIndex], status };
      mockJobs[jobIndex] = job;
      resolve(job);
    }, 500);
  });
};
