
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle } from "lucide-react";

interface ReportModalProps {
  onReport: (reason: string) => void;
  jobTitle: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ onReport, jobTitle }) => {
  const [reportReason, setReportReason] = useState("suspicious_job");
  const [customReason, setCustomReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const reason = reportReason === "other" ? customReason : getReasonText(reportReason);
    onReport(reason);
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case "suspicious_job":
        return "Suspicious job posting";
      case "asking_for_money":
        return "Asking for money or payment";
      case "false_info":
        return "Contains false information";
      case "too_good":
        return "Seems too good to be true";
      case "misleading":
        return "Misleading or inaccurate details";
      default:
        return reason;
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
          Report Job Posting
        </DialogTitle>
        <DialogDescription>
          Report "{jobTitle}" as potentially fraudulent or suspicious
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Reason for reporting</Label>
            <RadioGroup 
              value={reportReason} 
              onValueChange={setReportReason}
              className="space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suspicious_job" id="suspicious_job" />
                <Label htmlFor="suspicious_job" className="cursor-pointer">Suspicious job posting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asking_for_money" id="asking_for_money" />
                <Label htmlFor="asking_for_money" className="cursor-pointer">Asking for money or payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false_info" id="false_info" />
                <Label htmlFor="false_info" className="cursor-pointer">Contains false information</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too_good" id="too_good" />
                <Label htmlFor="too_good" className="cursor-pointer">Seems too good to be true</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="misleading" id="misleading" />
                <Label htmlFor="misleading" className="cursor-pointer">Misleading or inaccurate details</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">Other</Label>
              </div>
            </RadioGroup>
          </div>
          
          {reportReason === "other" && (
            <div className="space-y-2">
              <Label htmlFor="customReason">Please explain</Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please provide details about why you are reporting this job posting..."
                className="min-h-[100px]"
                required={reportReason === "other"}
              />
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            Your report will be reviewed by our team. Thank you for helping keep TrustRecruit safe.
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit" variant="destructive" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ReportModal;
