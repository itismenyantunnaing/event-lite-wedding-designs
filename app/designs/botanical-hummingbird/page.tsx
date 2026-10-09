import type { Metadata } from "next";
import { Cormorant_SC } from "next/font/google";
import BotanicalHummingbirdInvitation from "../../../components/botanical-hummingbird/BotanicalHummingbirdInvitation";
import "./botanical-hummingbird.css";

const headingFont = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "New Wedding Design — Event Elite",
  description: "A new Event Elite mobile wedding invitation design.",
};

export default function BotanicalHummingbirdDesignPage() {
  return <div className={headingFont.variable}><BotanicalHummingbirdInvitation /></div>;
}
