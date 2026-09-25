import type { Metadata } from "next";
import MyanmarInvitation from "../../../components/myanmar/MyanmarInvitation";
import { myanmarBackupSchedule } from "../../../data/myanmar-demo";
import "../myanmar/myanmar.css";

export const metadata: Metadata = {
  title: "Myanmar Heritage Celebration Backup — Event Elite",
  description: "Backup of the original Event Elite Myanmar wedding invitation design.",
};

export default function MyanmarDesignBackupPage() {
  return (
    <MyanmarInvitation
      showHeroCharacters
      scheduleOverride={myanmarBackupSchedule}
    />
  );
}
