import type { Metadata } from "next";
import MyanmarInvitation from "../../../components/myanmar/MyanmarInvitation";
import "./myanmar.css";

export const metadata: Metadata = {
  title: "Myanmar Celebration — Event Elite",
  description: "Explore Event Elite's Myanmar traditional wedding invitation design.",
};

export default function MyanmarDesignPage() {
  return <MyanmarInvitation />;
}
