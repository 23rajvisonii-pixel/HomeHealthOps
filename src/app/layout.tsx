import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeHealthOps – Home Health Operations & Intelligence",
  description: "Enterprise Home Health Operations & AI Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F6F8FC] text-[#17233D] antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
