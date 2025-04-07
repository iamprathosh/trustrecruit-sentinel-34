
/**
 * Integration service for using Hugging Face API with DeBERTa model for job fraud detection
 */

import { Job } from "./jobService";
import { FraudAnalysisResult } from "./fraudDetectionService";

// Hugging Face API URL for inference
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/deberta-v3-large";
// You should replace with the specific model you want to use for job fraud detection
// Options include:
// - microsoft/deberta-v3-large
// - microsoft/deberta-v3-base
// - microsoft/deberta-v2-xlarge
// - microsoft/deberta-v2-xxlarge

/**
 * Call Hugging Face API with DeBERTa model to analyze job posting for fraud
 * @param job Job data to analyze
 * @returns Analysis results from DeBERTa model
 */
export const callDeBERTaApi = async (job: Partial<Job>): Promise<FraudAnalysisResult> => {
  try {
    // Construct prompt with job details
    const prompt = `
      Job Title: ${job.title || ""}
      Company: ${job.company || ""}
      Location: ${job.location || ""}
      Salary: ${job.salary || ""}
      Description: ${job.description || ""}
      Requirements: ${job.requirements?.join(", ") || ""}
      
      Based on the above job posting details, analyze if this is a fraudulent job posting. 
      Consider the following fraud indicators:
      - Unrealistic salary promises, especially in Indian currency (₹)
      - Payment required from applicants
      - Poor grammar or excessive capitalization
      - Vague job description
      - Using personal email domains instead of company domains
      - Promises of quick/easy money
      - Requirements to provide financial information
      
      Output should be formatted as a JSON object with these fields:
      - isFraudulent (boolean)
      - trustScore (number between 0-100)
      - flaggedContent (array of strings describing suspicious elements)
      - recommendation (string with recommendation)
    `;
    
    // Call Hugging Face API
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY || "hf_api_key_placeholder"}`
      },
      body: JSON.stringify({ inputs: prompt })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
    }
    
    // Parse API response
    const rawResult = await response.json();
    
    // Process and format the response
    // Note: This processing depends on the specific model output format
    // You may need to adjust based on the actual model response
    let formattedResult: FraudAnalysisResult;
    
    try {
      // Try to parse the result if it's already in the right format
      if (typeof rawResult === 'string') {
        // If the model returns a string, try to extract JSON from it
        const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          formattedResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Response not in expected format");
        }
      } else if (rawResult.generated_text) {
        // Some models return results in a generated_text field
        const jsonMatch = rawResult.generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          formattedResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Response not in expected format");
        }
      } else {
        // The response might already be in the correct format
        formattedResult = rawResult as FraudAnalysisResult;
      }
      
      // Ensure all required fields are present
      if (typeof formattedResult.isFraudulent !== 'boolean' || 
          typeof formattedResult.trustScore !== 'number' ||
          !Array.isArray(formattedResult.flaggedContent) ||
          typeof formattedResult.recommendation !== 'string') {
        throw new Error("Missing required fields in response");
      }
      
      return formattedResult;
      
    } catch (parseError) {
      console.error("Error parsing model response:", parseError);
      
      // If parsing fails, use the fallback local analysis
      throw new Error("Failed to parse Hugging Face API response");
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    
    // Fallback to local analysis in case of API failure
    throw new Error("Failed to call Hugging Face API");
  }
};

/**
 * Implementation notes:
 * 
 * 1. To use this in production:
 *    - Sign up for a Hugging Face account at https://huggingface.co
 *    - Generate an API key from your account settings
 *    - Store the API key securely (environment variables, secrets manager, etc.)
 * 
 * 2. For better results:
 *    - Consider fine-tuning a DeBERTa model specifically for job fraud detection
 *    - Fine-tuning requires creating a dataset of fraudulent vs legitimate job postings
 *    - Use Hugging Face's fine-tuning API or run locally with transformers library
 * 
 * 3. Production implementation recommendations:
 *    - Add caching to reduce API calls for similar job postings
 *    - Implement retry logic with exponential backoff
 *    - Add monitoring and logging for API performance
 *    - Consider hosting your own fine-tuned model if volume is high
 * 
 * 4. API pricing considerations:
 *    - Check Hugging Face's Inference API pricing (https://huggingface.co/pricing)
 *    - Free tier has limitations on requests per minute
 *    - Consider Pro tier for production use cases
 */
