export type MembershipTier = {
  id: "free" | "paid" | "scholarship" | "team";
  name: string;
  price: string;
  tagline: string;
  benefits: string[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "free",
    name: "Free account",
    price: "$0",
    tagline: "Browse and pitch in.",
    benefits: [
      "Access public initiatives",
      "Take on open volunteer tasks",
      "Browse the resources directory",
      "Follow event listings",
    ],
  },
  {
    id: "paid",
    name: "Member",
    price: "$400 / 6 months",
    tagline: "Create, join, and participate fully.",
    benefits: [
      "Everything in Free",
      "Create and join regenerative initiatives",
      "Access member-only initiatives",
      "Co-referral opportunities with other members",
      "Vote on ARC's annual collective project",
    ],
  },
  {
    id: "scholarship",
    name: "Scholarship",
    price: "Application-based",
    tagline: "Initiative-specific access — weekly Zoom attendance required.",
    benefits: [
      "Access to your assigned initiative",
      "Weekly Zoom meeting attendance required",
      "Earn credits by completing tasks",
      "Credits can lead to Full Member status",
      "Application reviewed by ARC",
    ],
  },
  {
    id: "team",
    name: "Teams",
    price: "Paid plan — pricing on the ARC website",
    tagline: "A standard membership tier for organizations and teams.",
    benefits: [
      "All Full Member benefits included",
      "Organization dashboard for team management",
      "Includes sub-accounts, with the option to purchase additional seats",
      "Coordinated participation across your organization",
    ],
  },
];
