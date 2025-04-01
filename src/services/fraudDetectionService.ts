
import { Job } from "./jobService";

// Mock DeBERTa fraud detection service
// In a real app, this would call an API endpoint that uses a trained DeBERTa model

const fraudKeywords = [
  "urgent", "make money", "get rich", "quick cash", "easy money", "work from home",
  "no experience", "immediate start", "credit card", "registration fee", "payment required",
  "secret", "system", "guaranteed", "unlimited", "$$$", "₹₹₹", "cash", "money", "get paid today",
  "immediate payment", "pyramid", "investment opportunity", "multi-level", "mlm",
  "lakhs per month", "crores", "earn in dollars", "foreign clients", "paisa", "instant money"
];

const fraudPatterns = [
  /₹\d+[k]?\/(?:day|week|hour)/i,  // Unrealistic salary
  /₹\d{4,}\/(?:day|week)/i,        // High pay for short period
  /pay.*(?:upfront|advance)/i,     // Payment upfront
  /register.*fee/i,                // Registration fee
  /\b(?:urgent|immediate)\b/i,     // Urgency without reason
  /no experience needed/i,         // No experience but high salary
  /(?:credit card|payment).*required/i, // Payment required
  /(?:training|starter) (?:kit|package|fee)/i, // Training fees
  /work.*from.*home/i,            // Work from home (when combined with other patterns)
  /\d+ lakhs?/i,                  // Unrealistic salary in lakhs
  /\d+ crores?/i,                 // Unrealistic salary in crores
  /aadhar.*required/i,            // Suspicious Aadhaar card requirement
  /pan.*card.*upload/i            // Suspicious PAN card requirement
];

export interface FraudAnalysisResult {
  isFraudulent: boolean;
  trustScore: number;
  flaggedContent: string[];
  recommendation: string;
}

// Analyze job posting for fraud indicators
export const analyzeJobPosting = async (job: Partial<Job>): Promise<FraudAnalysisResult> => {
  // In a real app, this would use an actual DeBERTa model API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert job details to a single text for analysis
      const jobText = `${job.title} ${job.company} ${job.description} ${job.requirements?.join(' ')} ${job.salary}`.toLowerCase();
      
      // Check for fraud indicators
      const flaggedContent: string[] = [];
      
      // Check keywords
      const foundKeywords = fraudKeywords.filter(keyword => 
        jobText.includes(keyword.toLowerCase())
      );
      
      // Check patterns
      const foundPatterns = fraudPatterns.filter(pattern => 
        pattern.test(jobText)
      );
      
      // Flag content
      if (foundKeywords.length > 0) {
        flaggedContent.push(`Suspicious keywords: ${foundKeywords.join(', ')}`);
      }
      
      if (foundPatterns.length > 0) {
        flaggedContent.push(`Suspicious patterns detected in job description`);
      }
      
      // Check for salary red flags (using Indian currency format)
      if (job.salary && (/₹\d{3,}k?\+?\s*\/\s*(day|week)/i.test(job.salary) || 
                         /\d{2,}\s*lakhs?/i.test(job.salary) ||
                         /\d+\s*crores?/i.test(job.salary))) {
        flaggedContent.push(`Unusually high salary: ${job.salary}`);
      }
      
      // Check for extremely short job descriptions (often a red flag)
      if (job.description && job.description.length < 100) {
        flaggedContent.push(`Job description is suspiciously short (${job.description.length} characters)`);
      }
      
      // Calculate trust score (0-100)
      // Lower score means higher fraud probability
      let trustScore = 100;
      
      // Deduct points for each flagged item
      trustScore -= foundKeywords.length * 10;
      trustScore -= foundPatterns.length * 15;
      
      // If salary is suspicious, deduct points
      if (flaggedContent.some(flag => flag.includes("salary"))) {
        trustScore -= 20;
      }
      
      // If description is too short, deduct points
      if (flaggedContent.some(flag => flag.includes("short"))) {
        trustScore -= 15;
      }
      
      // Make sure score is within bounds
      trustScore = Math.max(0, Math.min(100, trustScore));
      
      // Determine if job is fraudulent based on threshold
      const isFraudulent = trustScore < 50;
      
      // Generate recommendation
      let recommendation = "";
      if (trustScore >= 80) {
        recommendation = "This job posting appears legitimate.";
      } else if (trustScore >= 50) {
        recommendation = "This job posting has some suspicious elements but may be legitimate. Proceed with caution.";
      } else if (trustScore >= 30) {
        recommendation = "This job posting has multiple fraud indicators common in Indian job scams. We recommend rejecting it.";
      } else {
        recommendation = "This job posting is highly likely to be fraudulent. It should be rejected to protect Indian job seekers.";
      }
      
      resolve({
        isFraudulent,
        trustScore,
        flaggedContent,
        recommendation
      });
    }, 800);
  });
};

// Analyze a batch of job postings
export const analyzeBatchJobs = async (jobs: Partial<Job>[]): Promise<Record<string, FraudAnalysisResult>> => {
  const results: Record<string, FraudAnalysisResult> = {};
  
  // In a real app, this would use a batch API call to the DeBERTa model
  for (const job of jobs) {
    if (job.id) {
      results[job.id] = await analyzeJobPosting(job);
    }
  }
  
  return results;
};
