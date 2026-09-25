import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leadflow | Lead Manager",
  description:
    "A production-style lead management dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
