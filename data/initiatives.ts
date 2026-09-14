export type Initiative = {
  id: string;
  title: string;
  summary: string;
  access: "public" | "member";
  placeholder?: boolean;
};

export type VolunteerTask = {
  id: string;
  title: string;
  summary: string;
  timeCommitment: string;
};

// Public initiatives are visible to everyone (guest, free, paid).
// Member-only initiatives are locked behind a paid/scholarship/team membership.
export const initiatives: Initiative[] = [
  {
    id: "init-1",
    title: "Bio-region mapping project",
    summary: "A collaborative effort to map regenerative activity across member bio-regions.",
    access: "public",
    placeholder: true,
  },
  {
    id: "init-2",
    title: "Annual collective project vote",
    summary: "Members vote each year on the initiative ARC puts its collective skills behind.",
    access: "public",
    placeholder: true,
  },
  {
    id: "init-3",
    title: "Member co-referral pipeline",
    summary: "A private space for paid members to co-refer clients and collaborate on projects.",
    access: "member",
    placeholder: true,
  },
  {
    id: "init-4",
    title: "AI project agents workspace",
    summary: "Access to ARC's AI-powered project agents for regenerative initiative planning.",
    access: "member",
    placeholder: true,
  },
];

export const volunteerTasks: VolunteerTask[] = [
  {
    id: "task-1",
    title: "Help proofread the resources directory",
    summary: "Review a handful of directory listings for accuracy and clarity.",
    timeCommitment: "~1 hour",
  },
  {
    id: "task-2",
    title: "Share an upcoming event on social media",
    summary: "Post about an upcoming ARC event with your network.",
    timeCommitment: "~15 minutes",
  },
];
