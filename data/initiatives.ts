export type Initiative = {
  id: string;
  title: string;
  summary: string;
  category: string;
  featured?: boolean;
  inviteOnly?: boolean;
  volunteerOpportunityCount?: number;
  image?: string;
};

export const initiatives: Initiative[] = [
  {
    id: "active-capture-remediation-systems",
    title: "Active Capture Remediation Systems",
    summary:
      "An initiative for implementing and managing active capture remediation systems, possibly for environmental cleanup.",
    category: "sustainability",
    featured: true,
    inviteOnly: true,
  },
  {
    id: "regen-health-alliance",
    title: "Regen Health Alliance",
    summary:
      "Emergency Response Network implementing trauma and health support for individuals and organizations",
    category: "health",
    featured: true,
  },
  {
    id: "build-back-green-la",
    title: "Build Back Green LA",
    summary:
      "Rebuilding Los Angeles fire damaged community with sustainable, regenerative practices and green jobs.",
    category: "sustainability",
    featured: true,
  },
  {
    id: "grow-the-congo-green",
    title: "Grow The Congo Green",
    summary: "Reforestation and sustainable agriculture restoring lands in the Congo.",
    category: "agriculture",
    featured: true,
  },
  {
    id: "regen-hub-santa-monica-venice",
    title: "Regen Hub - Santa Monica/Venice",
    summary:
      "Create a community hub for sustainability, health services, education, and resilience in Santa Monica/Venice.",
    category: "community",
    featured: true,
    volunteerOpportunityCount: 5,
  },
];
