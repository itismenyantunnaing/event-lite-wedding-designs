import type { Metadata } from "next";
import { Cormorant_SC } from "next/font/google";
import BotanicalHummingbirdInvitation from "../../../components/botanical-hummingbird-sample-2/BotanicalHummingbirdInvitation";
import BotanicalHummingbirdMenu from "../../../components/botanical-hummingbird-sample-2/BotanicalHummingbirdMenu";
import "./botanical-hummingbird.css";
import "./botanical-hummingbird-menu.css";

const headingFont = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Humming Bird and Lily of the Valley (Sample 2) — Event Elite",
  description: "A new Event Elite mobile wedding invitation design.",
};

export default function BotanicalHummingbirdDesignPage() {
  return <div className={headingFont.variable}><BotanicalHummingbirdMenu><BotanicalHummingbirdInvitation /></BotanicalHummingbirdMenu></div>;
}
