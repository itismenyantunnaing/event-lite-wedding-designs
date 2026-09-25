import type { Metadata } from "next";
import ChineseInvitation from "../../../components/chinese/ChineseInvitation";
import { chineseBackupSchedule } from "../../../data/chinese-demo";
import "../chinese/chinese.css";

export const metadata: Metadata = {
  title: "Chinese Celebration Backup — Event Elite",
  description: "Backup of the original Event Elite Chinese wedding invitation design.",
};

export default function ChineseDesignBackupPage() {
  return (
    <ChineseInvitation
      showHeroCharacters
      scheduleOverride={chineseBackupSchedule}
    />
  );
}
