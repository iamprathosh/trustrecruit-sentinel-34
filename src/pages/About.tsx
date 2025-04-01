
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Shield, CheckCircle, AlertTriangle, Users, Building, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-6 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              India's Most Trusted Job Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Fighting recruitment fraud and building a safer job market for all Indians
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/register">
                <Button size="lg" className="font-medium">
                  Join TrustRecruit Today
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="font-medium">
                  Browse Verified Jobs
                </Button>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Verified Recruiters</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium">AI Fraud Detection</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <span className="text-sm font-medium">Fraud Reporting System</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                TrustRecruit is dedicated to building a fraud-free job market across India by using cutting-edge AI technology to protect job seekers from scams and verify legitimate employers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border border-muted">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Security</h3>
                <p className="text-muted-foreground">
                  Every job listing undergoes thorough verification and AI-powered fraud detection to ensure legitimacy before publishing.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border border-muted">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Protection</h3>
                <p className="text-muted-foreground">
                  We empower our community to report suspicious listings, creating a collaborative defense against emerging recruitment scams.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border border-muted">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Indian Excellence</h3>
                <p className="text-muted-foreground">
                  Designed specifically for the Indian job market, addressing the unique challenges faced by job seekers across the country.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 md:px-6 bg-orange-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How TrustRecruit Works</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Our multi-layered approach to fighting recruitment fraud
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <ol className="space-y-8 relative border-l border-muted ml-6">
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      1
                    </span>
                    <h3 className="text-xl font-semibold mb-2">Recruiter Verification</h3>
                    <p className="text-muted-foreground">
                      Companies are verified using GST/PAN details, ensuring only legitimate businesses can post jobs.
                    </p>
                  </li>
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      2
                    </span>
                    <h3 className="text-xl font-semibold mb-2">AI Fraud Detection</h3>
                    <p className="text-muted-foreground">
                      Our advanced DeBERTa algorithm analyzes job posts to identify suspicious patterns and language typical of scams.
                    </p>
                  </li>
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      3
                    </span>
                    <h3 className="text-xl font-semibold mb-2">Trust Score Assignment</h3>
                    <p className="text-muted-foreground">
                      Each job listing receives a trust score based on multiple factors, helping job seekers make informed decisions.
                    </p>
                  </li>
                </ol>
              </div>
              <div>
                <ol className="space-y-8 relative border-l border-muted ml-6">
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      4
                    </span>
                    <h3 className="text-xl font-semibold mb-2">Community Reporting</h3>
                    <p className="text-muted-foreground">
                      Users can report suspicious listings, triggering immediate review and potential removal.
                    </p>
                  </li>
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      5
                    </span>
                    <h3 className="text-xl font-semibold mb-2">Admin Review</h3>
                    <p className="text-muted-foreground">
                      Our team investigates suspicious activities, blacklisting fraudulent recruiters and escalating cases when necessary.
                    </p>
                  </li>
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                      6
                    </span>
                    <h3 className="text-xl font-semibold mb-2">Cybersecurity Collaboration</h3>
                    <p className="text-muted-foreground">
                      We work with Indian cybersecurity authorities to report and help prosecute recruitment fraud cases.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-background">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">98%</p>
                <p className="text-muted-foreground">Fraud Detection Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">10K+</p>
                <p className="text-muted-foreground">Verified Employers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">50K+</p>
                <p className="text-muted-foreground">Legitimate Job Postings</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">100K+</p>
                <p className="text-muted-foreground">Protected Job Seekers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Indian Focus Section */}
        <section className="py-16 px-4 md:px-6 bg-orange-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Built for India</h2>
                <p className="text-muted-foreground mb-6">
                  TrustRecruit is specifically designed to address the unique challenges of the Indian job market, with fraud detection systems trained on India-specific scam patterns.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Compliance with Indian employment regulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Support for regional language job listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Integration with Indian verification systems (PAN/GST)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Partnerships with leading Indian companies</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-muted shadow-sm">
                    <Building className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Delhi NCR</h3>
                    <p className="text-sm text-muted-foreground">5,000+ verified jobs</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-muted shadow-sm">
                    <Building className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Mumbai</h3>
                    <p className="text-sm text-muted-foreground">4,200+ verified jobs</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-muted shadow-sm">
                    <Building className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Bengaluru</h3>
                    <p className="text-sm text-muted-foreground">6,800+ verified jobs</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-muted shadow-sm">
                    <Building className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Hyderabad</h3>
                    <p className="text-sm text-muted-foreground">3,500+ verified jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join India's Trusted Job Platform Today</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your next career opportunity or seeking talented professionals, TrustRecruit provides a secure platform for all your recruitment needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="font-medium">
                  Create an Account
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10 font-medium">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
