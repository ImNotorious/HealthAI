"use client";
import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Microscope, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '@/firebase/config';

const auth = getAuth(app);

export default function HomePage() { // Changed component name
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="localhost:3000">
          <Brain className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">HealthAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#key-features"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById('key-features')?.scrollIntoView({ behavior: 'smooth' });
    }}>
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }}>
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionizing Healthcare with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Using Machine Learning for Early Disease Detection in Medical Images
                </p>
              </div>
              <div className="space-x-4">
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Get Started'}
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        {/* Rest of the sections remain the same */}
        <section id="key-features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Microscope className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Early Detection</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Identify potential health issues before they become serious problems.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <ShieldCheck className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Improved Accuracy</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  AI-powered analysis reduces human error and increases diagnostic precision.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Faster Results</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Rapid image processing and analysis for quicker diagnoses and treatment plans.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  1
                </div>
                <h3 className="text-xl font-bold">Image Acquisition</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  High-quality medical images are captured and uploaded to our secure platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  2
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Our advanced machine learning algorithms process and analyze the images.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  3
                </div>
                <h3 className="text-xl font-bold">Results & Recommendations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Detailed reports are generated, highlighting potential areas of concern for further investigation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Healthcare?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join us in revolutionizing early disease detection with AI-powered medical image analysis.
                </p>
              </div>
              <div className="space-x-4">
              <Button 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Get Started'}
                </Button>
                <Button variant="outline">Learn More</Button>
                <Button variant="outline">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 HealthAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
