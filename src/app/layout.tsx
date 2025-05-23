import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talent Match AI",
  description: "A talent match AI built with Python, FastAPI, PostgreSQL and pgvector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center`}
      >
        <Navbar />
        <div className="w-full max-w-7xl flex flex-col items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
