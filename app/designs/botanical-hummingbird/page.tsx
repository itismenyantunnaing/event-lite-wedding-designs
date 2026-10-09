import type { Metadata } from "next";
import BotanicalHummingbirdInvitation from "../../../components/botanical-hummingbird/BotanicalHummingbirdInvitation";
import "./botanical-hummingbird.css";

export const metadata: Metadata = {
  title: "New Wedding Design — Event Elite",
  description: "A new Event Elite mobile wedding invitation design.",
};

export default function BotanicalHummingbirdDesignPage() {
  return <BotanicalHummingbirdInvitation />;
}
