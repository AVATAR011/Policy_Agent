import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Policy Bundle Recommender",
  description:
    "Rules + Scoring + OpenAI bundle recommendations for vehicle insurance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased text-slate-900 page-bg">
        {children}
      </body>
    </html>
  );
}
