
import { Job } from "./jobService";

// Enhanced mock DeBERTa fraud detection service
// In a real app, this would call an API endpoint that uses a trained DeBERTa model

// Expanded fraud keywords with India-specific terms
const fraudKeywords = [
  // General scam indicators
  "urgent", "make money", "get rich", "quick cash", "easy money", "work from home",
  "no experience", "immediate start", "credit card", "registration fee", "payment required",
  "secret", "system", "guaranteed", "unlimited", "$$$", "₹₹₹", "cash", "money", "get paid today",
  "immediate payment", "pyramid", "investment opportunity", "multi-level", "mlm",
  
  // India-specific terms
  "lakhs per month", "crores", "earn in dollars", "foreign clients", "paisa", "instant money",
  "pan card needed", "aadhar required", "upfront fees", "training fees", "consultancy charges",
  "overseas jobs", "one-time investment", "agent fees", "direct joining", "cash on joining"
];

// Enhanced fraud patterns with India-specific patterns
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
  /pan.*card.*upload/i,           // Suspicious PAN card requirement
  
  // Additional India-specific patterns
  /direct.*joining/i,             // Direct joining without interview
  /foreign.*placement/i,          // Suspicious foreign placements
  /(?:dubai|gulf|abroad).*job/i,  // Common job scam destinations 
  /overnight.*(?:payment|money)/i, // Overnight money promises
  /(?:western union|moneygram)/i, // Money transfer services often used in scams
  /commission.*based/i            // Commission-only roles (often scams)
];

// Suspicious company domains
const suspiciousDomains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
  "rediffmail.com", "ymail.com", "protonmail.com"
];

export interface FraudAnalysisResult {
  isFraudulent: boolean;
  trustScore: number;
  flaggedContent: string[];
  recommendation: string;
}

// More sophisticated analysis using text patterns
const analyzeTextPatterns = (jobText: string): { flags: string[], score: number } => {
  const flags: string[] = [];
  let penaltyScore = 0;
  
  // Check keywords
  const foundKeywords = fraudKeywords.filter(keyword => 
    jobText.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (foundKeywords.length > 0) {
    flags.push(`Suspicious keywords: ${foundKeywords.join(', ')}`);
    penaltyScore += foundKeywords.length * 8; // 8 points per keyword
  }
  
  // Check patterns
  const foundPatterns = fraudPatterns.filter(pattern => 
    pattern.test(jobText)
  );
  
  if (foundPatterns.length > 0) {
    flags.push(`Suspicious patterns detected in job description`);
    penaltyScore += foundPatterns.length * 12; // 12 points per pattern
  }
  
  return { flags, score: penaltyScore };
};

// Analyze job posting for fraud indicators
export const analyzeJobPosting = async (job: Partial<Job>): Promise<FraudAnalysisResult> => {
  // In a real app, this would use an actual DeBERTa model API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert job details to a single text for analysis
      const jobText = `${job.title} ${job.company} ${job.description} ${job.requirements?.join(' ')} ${job.salary}`;
      
      // Check for fraud indicators
      const flaggedContent: string[] = [];
      
      // Use pattern analysis
      const { flags, score: patternPenalty } = analyzeTextPatterns(jobText);
      flaggedContent.push(...flags);
      
      // Check for email domain in company name (common in scams)
      if (job.company) {
        const companyLower = job.company.toLowerCase();
        const hasSuspiciousDomain = suspiciousDomains.some(domain => 
          companyLower.includes(domain)
        );
        
        if (hasSuspiciousDomain) {
          flaggedContent.push(`Company name contains personal email domain`);
        }
      }
      
      // Check for salary red flags (using Indian currency format)
      if (job.salary) {
        if (/₹\d{3,}k?\+?\s*\/\s*(day|week)/i.test(job.salary)) {
          flaggedContent.push(`Unusually high daily/weekly salary: ${job.salary}`);
        }
        
        if (/\d{2,}\s*lakhs?/i.test(job.salary)) {
          flaggedContent.push(`Unusually high salary in lakhs: ${job.salary}`);
        }
        
        if (/\d+\s*crores?/i.test(job.salary)) {
          flaggedContent.push(`Unrealistic salary in crores: ${job.salary}`);
        }
      }
      
      // Check for extremely short job descriptions (often a red flag)
      if (job.description) {
        if (job.description.length < 100) {
          flaggedContent.push(`Job description is suspiciously short (${job.description.length} characters)`);
        }
        
        // Check for excessive use of capital letters (shouting)
        const upperCaseRatio = (job.description.match(/[A-Z]/g) || []).length / job.description.length;
        if (upperCaseRatio > 0.3 && job.description.length > 50) {
          flaggedContent.push(`Excessive use of capital letters in job description`);
        }
      }
      
      // Check for required files/documents that are often used in scams
      if (jobText.toLowerCase().includes("send resume to") && 
         (jobText.toLowerCase().includes("gmail") || jobText.toLowerCase().includes("yahoo"))) {
        flaggedContent.push(`Requests to send resume to personal email addresses`);
      }
      
      // Calculate trust score (0-100)
      // Higher starting score for more generous evaluation
      let trustScore = 100;
      
      // Deduct points from pattern analysis
      trustScore -= patternPenalty;
      
      // Additional specific penalties
      if (flaggedContent.some(flag => flag.includes("personal email domain"))) {
        trustScore -= 25;
      }
      
      if (flaggedContent.some(flag => flag.includes("salary"))) {
        trustScore -= 20;
      }
      
      if (flaggedContent.some(flag => flag.includes("short"))) {
        trustScore -= 15;
      }
      
      if (flaggedContent.some(flag => flag.includes("capital letters"))) {
        trustScore -= 12;
      }
      
      if (flaggedContent.some(flag => flag.includes("personal email addresses"))) {
        trustScore -= 30;
      }
      
      // Make sure score is within bounds
      trustScore = Math.max(0, Math.min(100, trustScore));
      
      // Determine if job is fraudulent based on threshold
      const isFraudulent = trustScore < 50;
      
      // Generate more detailed recommendation
      let recommendation = "";
      if (trustScore >= 80) {
        recommendation = "This job posting appears legitimate with no significant fraud indicators.";
      } else if (trustScore >= 65) {
        recommendation = "This job posting appears mostly legitimate but has a few minor suspicious elements. Proceed with standard caution.";
      } else if (trustScore >= 50) {
        recommendation = "This job posting has some suspicious elements common in Indian job scams but may be legitimate. Verify company details before proceeding.";
      } else if (trustScore >= 30) {
        recommendation = "This job posting has multiple fraud indicators common in Indian job scams. We recommend additional verification before approval.";
      } else {
        recommendation = "This job posting is highly likely to be fraudulent based on multiple warning signs common in Indian job scams. It should be rejected to protect job seekers.";
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
