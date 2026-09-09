import type { Metadata } from "next";
import { Hind, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
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
      <body className={`${instrumentSerif.variable} ${hind.variable}`}>{children}</body>
    </html>
  );
}
