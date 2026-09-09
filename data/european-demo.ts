export type ScheduleItem = {
  time: string;
  title: string;
  icon: "rings" | "glasses" | "cake" | "car";
};

export const europeanDemo = {
  couple: { partnerOne: "Olivia", partnerTwo: "James" },
  invitation: "joyfully invite you to celebrate their wedding",
  date: { day: "12", month: "09", year: "2026", weekday: "Saturday", label: "September 12, 2026" },
  introduction: "We cannot imagine our day without you. Please join us for an afternoon of happy tears, warm embraces, dinner, and dancing under the stars.",
  venue: {
    name: "The Willow Garden",
    address: ["24 Meadow Lane", "Greenfield, California"],
    note: "Please arrive by 2:45 PM. Garden-party attire is encouraged.",
    mapUrl: "https://maps.google.com",
  },
  schedule: [
    { time: "3:00 PM", title: "Welcome drinks", icon: "rings" },
    { time: "4:00 PM", title: "Ceremony", icon: "glasses" },
    { time: "6:00 PM", title: "Dinner & dancing", icon: "cake" },
    { time: "10:30 PM", title: "Send-off", icon: "car" },
  ] satisfies ScheduleItem[],
  giftNote: "Should you wish to give a gift, a contribution toward our new chapter would be sincerely appreciated.",
  dressCode: "Think soft colors, light fabrics, and shoes made for a little dancing.",
};
