import type { Metadata } from "next";
import ChineseInvitation from "../../../components/chinese/ChineseInvitation";
import "./chinese.css";

export const metadata: Metadata = {
  title: "Chinese Celebration — Event Elite",
  description: "Explore Event Elite's Chinese wedding invitation design.",
};

export default function ChineseDesignPage() {
  return <ChineseInvitation />;
}
