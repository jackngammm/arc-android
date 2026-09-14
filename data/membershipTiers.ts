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
    tagline: "For those who show real commitment, regardless of ability to pay.",
    benefits: [
      "Same access as a paid Member",
      "Awarded based on demonstrated commitment to the regenerative movement",
      "Application reviewed by ARC",
    ],
  },
  {
    id: "team",
    name: "Teams",
    price: "Contact ARC",
    tagline: "For organizations bringing multiple people into the network.",
    benefits: [
      "Multiple linked member accounts",
      "Shared access to member-only initiatives",
      "Coordinated participation across your organization",
    ],
  },
];
