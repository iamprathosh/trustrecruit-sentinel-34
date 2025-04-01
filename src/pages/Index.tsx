
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, Search, UserCheck, AlertTriangle, BadgeIndianRupee } from "lucide-react";
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-aliceblue to-seasalt dark:from-ruddyblue2/30 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-powderblue/30 px-3 py-1 text-sm dark:bg-ruddyblue/30">
                  सुरक्षित नौकरी तलाश (Secure Job Search)
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Protection for Indian Job Seekers
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TrustRecruit uses advanced DeBERTa algorithms to detect fraudulent job listings and protect Indian job seekers from scams. Browse verified opportunities with confidence.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/jobs">
                    <Button className="inline-flex h-10 px-4 py-2 bg-ruddyblue2 hover:bg-ruddyblue">
                      <Search className="mr-2 h-5 w-5" />
                      Browse Jobs
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="inline-flex h-10 px-4 py-2 border-ruddyblue2 text-ruddyblue2 hover:bg-aliceblue/50">
                      Create an Account
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:order-last flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-aliceblue to-ruddyblue2 opacity-75 blur-xl"></div>
                  <div className="relative bg-background p-6 rounded-xl shadow-xl">
                    <div className="w-full max-w-md mx-auto space-y-4">
                      <div className="flex items-center p-3 bg-green-50 rounded-md dark:bg-green-900/20">
                        <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                        <div>
                          <h3 className="font-medium">Verified Job Posting</h3>
                          <p className="text-sm text-muted-foreground">Senior Developer at TCS, Bengaluru</p>
                        </div>
                        <Badge className="trust-badge trust-badge-high ml-auto">95% Trust</Badge>
                      </div>
                      <div className="flex items-center p-3 bg-amber-50 rounded-md dark:bg-amber-900/20">
                        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-2" />
                        <div>
                          <h3 className="font-medium">Suspicious Listing</h3>
                          <p className="text-sm text-muted-foreground">Quick Money Work From Home</p>
                        </div>
                        <Badge className="trust-badge trust-badge-medium ml-auto">65% Trust</Badge>
                      </div>
                      <div className="flex items-center p-3 bg-red-50 rounded-md dark:bg-red-900/20">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                        <div>
                          <h3 className="font-medium">Blocked Fraudulent Job</h3>
                          <p className="text-sm text-muted-foreground">₹50,000/day from home!</p>
                        </div>
                        <Badge className="trust-badge trust-badge-low ml-auto">15% Trust</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-seasalt dark:bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How TrustRecruit Protects Indian Job Seekers
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform uses cutting-edge technology to ensure a safe and reliable job search experience across India.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-powderblue/30 rounded-full dark:bg-ruddyblue/20">
                  <ShieldCheck className="h-10 w-10 text-ruddyblue2" />
                </div>
                <h3 className="text-xl font-bold">AI Fraud Detection</h3>
                <p className="text-muted-foreground">
                  Our DeBERTa algorithm analyzes job postings to detect scams and protect users from fraudulent listings common in India.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-powderblue/30 rounded-full dark:bg-ruddyblue/20">
                  <UserCheck className="h-10 w-10 text-ruddyblue2" />
                </div>
                <h3 className="text-xl font-bold">Aadhaar Verification</h3>
                <p className="text-muted-foreground">
                  Optional Aadhaar-based verification ensures all users on our platform are genuine and trustworthy Indian citizens.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-powderblue/30 rounded-full dark:bg-ruddyblue/20">
                  <BadgeIndianRupee className="h-10 w-10 text-ruddyblue2" />
                </div>
                <h3 className="text-xl font-bold">Salary Transparency</h3>
                <p className="text-muted-foreground">
                  We flag suspicious salary claims and ensure realistic pay ranges for each role and location in India.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-ruddyblue2 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Find a Trusted Job in India?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join TrustRecruit today and access verified job opportunities from trusted employers across India.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/register">
                  <Button className="inline-flex h-10 px-6 py-3 bg-white text-ruddyblue2 hover:bg-aliceblue">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="inline-flex h-10 px-6 py-3 border-white bg-transparent hover:bg-ruddyblue">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-ruddyblue2" />
              <span className="font-bold">TrustRecruit India</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TrustRecruit India. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
