import type { Metadata } from "next";
import { Hind } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const trovical = localFont({
  variable: "--font-trovical",
  display: "swap",
  src: [
    {
      path: "./fonts/trovical-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/trovical-italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
});

const hind = Hind({
  variable: "--font-hind",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation Designs — Event Elite",
  description: "Explore Event Elite's mobile wedding invitation design collection.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${trovical.variable} ${hind.variable}`}>{children}</body>
    </html>
  );
}
