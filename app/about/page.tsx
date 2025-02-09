// app/about/page.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Users, Globe, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Reuse Header from Existing Design */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">HealthAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About HealthAI
                </h1>
                <p className="mx-auto max-w-[1200px] text-gray-500 md:text-xl dark:text-gray-400">
                HealthAI harnesses the power of machine learning to analyze medical images for early disease detection, enhancing diagnostic accuracy and patient care. Our cutting-edge AI-driven platform empowers healthcare professionals with fast, reliable insights, enabling timely intervention and better health outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Mission
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Globe className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Global Impact</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                HealthAI is committed to making advanced healthcare accessible worldwide by leveraging AI-driven medical imaging to detect diseases early and improve patient outcomes.

                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Briefcase className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                We continuously push the boundaries of AI and machine learning to enhance diagnostic accuracy, streamline workflows, and support medical professionals with cutting-edge technology.

                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                HealthAI fosters a collaborative healthcare ecosystem, empowering doctors, researchers, and patients through AI-driven insights for better, more personalized care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Team
            </h2>
            <div className="grid gap-10 sm:grid-cols-3 md:grid-cols-3 flex justify-center">
              {["Akshat Jain", "Amulya Tripathi", "Suman Sharma"].map((item) => (
                <div key={item} className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                  <div className="h-24 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold">{item}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Mission
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Reuse Footer from Existing Design */}
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
