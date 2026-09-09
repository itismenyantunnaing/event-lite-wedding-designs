import type { Metadata } from "next";
import EuropeanInvitation from "../../../components/european/EuropeanInvitation";

export const metadata: Metadata = {
  title: "European Vintage Garden — Event Elite",
  description: "Explore Event Elite's European Vintage Garden wedding invitation design.",
};

export default function EuropeanDesignPage() {
  return <EuropeanInvitation />;
}
