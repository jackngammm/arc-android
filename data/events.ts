export type ArcEvent = {
  id: string;
  title: string;
  // Manually maintained fallback, used only when startDate/endDate aren't set (see getEventStatus below).
  status: "upcoming" | "past";
  dates: string;
  // Structured dates for automatic status derivation, in local calendar "YYYY-MM-DD" — kept
  // separate from `dates`, which remains the untouched human-readable display string.
  startDate?: string;
  endDate?: string;
  place: string;
  tag: string;
  description: string;
  organizer: string;
  placeholder?: boolean;
  image?: string;
  link?: string;
};

// Temporary presentation gate until website-backed member access is available.
export const isPartnerEventLocked = (event: ArcEvent) => event.tag === "Partner Event";

function formatLocalISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Derives Upcoming/Past from structured dates using local-calendar-day comparison (never UTC
// Date arithmetic, which can flip status a day early/late depending on timezone). An event stays
// Upcoming through the entirety of its local endDate and becomes Past on the next local day.
// Falls back to the manually stored `status` field for any event without structured dates.
export function getEventStatus(event: Pick<ArcEvent, "endDate" | "status">, now: Date = new Date()): "upcoming" | "past" {
  if (!event.endDate) return event.status;
  return event.endDate < formatLocalISODate(now) ? "past" : "upcoming";
}

const roundtableImage =
  "https://alliance4regencomm.com/__l5e/assets-v1/0ba802f6-1c44-4590-820b-3d3ddc1b2851/arc-roundtables-flyer-sept.jpg";
const roundtableLink = "https://RoadTo2028Beyond.com/";
const roundtableDescription =
  "ARC's monthly roundtable bringing members together to discuss environment, health, green tech, arts/culture, and peace. Contact GoldenRoadProduction@gmail.com or 530-362-8264 for details.";

export const events: ArcEvent[] = [
  {
    id: "roundtable-venice-2026",
    title: "Regenerative Roundtable — Venice",
    status: "upcoming",
    dates: "Sep 20, 2026",
    startDate: "2026-09-20",
    endDate: "2026-09-20",
    place: "The Sanctuary, 2536 Lincoln Blvd, Venice, CA",
    tag: "Roundtable",
    description: roundtableDescription,
    organizer: "Alliance for Regenerative Communities",
    image: roundtableImage,
    link: roundtableLink,
  },
  {
    id: "roundtable-santa-monica-2026",
    title: "Regenerative Roundtable — Santa Monica",
    status: "upcoming",
    dates: "Sep 25, 2026",
    startDate: "2026-09-25",
    endDate: "2026-09-25",
    place: "The Beach House, 2219 Main St, Santa Monica, CA",
    tag: "Roundtable",
    description: roundtableDescription,
    organizer: "Alliance for Regenerative Communities",
    image: roundtableImage,
    link: roundtableLink,
  },
  {
    id: "roundtable-culver-city-2026",
    title: "Regenerative Roundtable — Culver City",
    status: "upcoming",
    dates: "Sep 26, 2026",
    startDate: "2026-09-26",
    endDate: "2026-09-26",
    place: "Jackson Street Cafe, 4065 Jackson Ave, Culver City, CA",
    tag: "Roundtable",
    description: roundtableDescription,
    organizer: "Alliance for Regenerative Communities",
    image: roundtableImage,
    link: roundtableLink,
  },
  {
    id: "roundtable-west-hills-2026",
    title: "Regenerative Roundtable — West Hills",
    status: "upcoming",
    dates: "Sep 27, 2026",
    startDate: "2026-09-27",
    endDate: "2026-09-27",
    place: "Tahdi's Home, West Hills, CA",
    tag: "Roundtable",
    description: roundtableDescription,
    organizer: "Alliance for Regenerative Communities",
    image: roundtableImage,
    link: roundtableLink,
  },
  {
    id: "forth-roadmap-2026",
    title: "Forth Roadmap Conference",
    status: "past",
    dates: "Sep 13, 2026",
    startDate: "2026-09-13",
    endDate: "2026-09-13",
    place: "Seattle, WA",
    tag: "Partner Event",
    description: "The premier electric transportation conference in the United States.",
    organizer: "Forth",
  },
  {
    id: "green-california-summit-2026",
    title: "Green California Summit",
    status: "past",
    dates: "Sep 15 – 16, 2026",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    place: "Pasadena Convention Center, Pasadena, CA",
    tag: "Partner Event",
    description:
      "20th-anniversary summit celebrating sustainability, innovation, and collaboration in green technology.",
    organizer: "Green Technology",
    image:
      "https://i0.wp.com/green-technology.org/wp-content/uploads/Green-California-Summit-Banner-02.jpg",
  },
  {
    id: "sustainable-investment-forum-2026",
    title: "Sustainable Investment Forum North America",
    status: "upcoming",
    dates: "Sep 22, 2026",
    startDate: "2026-09-22",
    endDate: "2026-09-22",
    place: "New York City, NY",
    tag: "Partner Event",
    description: "A partnership event convened to accelerate international sustainable development.",
    organizer: "Sustainable Investment Forum",
  },
  {
    id: "la-business-council-summit-2026",
    title: "20th Annual Los Angeles Business Council Sustainability Summit",
    status: "upcoming",
    dates: "Oct 1, 2026",
    startDate: "2026-10-01",
    endDate: "2026-10-01",
    place: "Town and Gown, USC, Los Angeles, CA",
    tag: "Partner Event",
    description:
      "A convening of business, government, and nonprofit leaders focused on clean energy and sustainability.",
    organizer: "Los Angeles Business Council",
  },
  {
    id: "gcn-investor-conference-2026",
    title: "GCN Oct 15 Investor Conference @ Newport Beach, CA - 100+ investors!",
    status: "upcoming",
    dates: "Oct 15, 2026",
    startDate: "2026-10-15",
    endDate: "2026-10-15",
    place: "Renaissance Newport Beach Marriott, 4500 MacArthur Blvd, Newport Beach, CA",
    tag: "Partner Event",
    description:
      "Providing investors around the world with deal flow based on their preferences and raising capital for entrepreneurs & startups globally 24/7",
    organizer: "GCN",
    image:
      "https://cdn.prod.website-files.com/681aee824048be0b674e62d2/6a43a21d9f09dc8bb0ffa9a3_c303cd9a7f2fd66d4a63ca228367d9c6_gcn-logo.png",
  },
  {
    id: "sb26-san-diego-2026",
    title: "Event Highlights | SB'26 San Diego",
    status: "upcoming",
    dates: "Jun 8 – Oct 16, 2026",
    place: "Town & Country Resort, San Diego, CA",
    tag: "Partner Event",
    description:
      "SB'26 San Diego brings together global business leaders to accelerate sustainable innovation, growth and market transformation. Register now.",
    organizer: "Sustainable Brands",
    image:
      "https://events.sustainablebrands.com/conferences/sustainablebrands/wp-content/uploads/2026/06/sb26-hero-post-event-1500x750-1-1024x512.jpg",
  },
  {
    id: "greenbuild-2026",
    title: "Greenbuild International Conference and Expo",
    status: "upcoming",
    dates: "Oct 20, 2026",
    startDate: "2026-10-20",
    endDate: "2026-10-20",
    place: "Javits Center, New York, NY",
    tag: "Partner Event",
    description: "The largest annual event for green building professionals.",
    organizer: "Greenbuild",
    image:
      "https://knect365.imgix.net/uploads/Greenbuild-2021-1x1-1080x1080-b6dd47e8fbcf07a91dfae533133d2643.jpg?auto=format&fit=max&w=400",
  },
  {
    id: "european-sustainability-congress-2026",
    title: "European Sustainability Congress",
    status: "upcoming",
    dates: "Oct 29, 2026",
    startDate: "2026-10-29",
    endDate: "2026-10-29",
    place: "Mała Warszawa, Otwocka 14, Warsaw, Poland",
    tag: "Partner Event",
    description: "One of the biggest international events about the circular economy.",
    organizer: "Circular Week",
  },
  {
    id: "cop31-antalya-2026",
    title: "COP31",
    status: "upcoming",
    dates: "Nov 9, 2026",
    startDate: "2026-11-09",
    endDate: "2026-11-09",
    place: "Antalya, Türkiye",
    tag: "Partner Event",
    description: "The UN climate conference, with accommodation secured at the Royal Seginus Hotel.",
    organizer: "World Climate Foundation",
    image:
      "https://static.wixstatic.com/media/358f84_fb4a2ba4a07b4d1b8cde0218b1bf43f6~mv2.jpg/v1/fill/w_1092,h_713,al_c/358f84_fb4a2ba4a07b4d1b8cde0218b1bf43f6~mv2.jpg",
  },
  {
    id: "greenbiz-2027",
    title: "GreenBiz",
    status: "upcoming",
    dates: "Feb 23 – 25, 2027",
    startDate: "2027-02-23",
    endDate: "2027-02-25",
    place: "Gaylord Pacific, San Diego, CA",
    tag: "Partner Event",
    description: "A top sustainability-in-business conference uniting industry leaders.",
    organizer: "GreenBiz / Trellis",
    image:
      "https://trellis.net/wp-content/uploads/2026/05/greenbiz27_website_feature_image_1200x630-2.png",
  },
  {
    id: "santa-monica-2026",
    title: "Coastal Futures Convening",
    status: "past",
    dates: "Jul 11 – 12, 2026",
    startDate: "2026-07-11",
    endDate: "2026-07-12",
    place: "Santa Monica & Venice, CA",
    tag: "Workshop",
    description:
      "A two-day convening exploring regenerative approaches to coastal and urban ecosystems, bringing together practitioners from across the ARC network.",
    organizer: "Alliance for Regenerative Communities",
  },
  {
    id: "ojai-2026",
    title: "A Global Call to Regenerate",
    status: "past",
    dates: "May 29 – 31, 2026",
    startDate: "2026-05-29",
    endDate: "2026-05-31",
    place: "Sane Living Center, Ojai, CA",
    tag: "Gathering",
    description:
      "A gathering of members and allied organizations focused on collaborative, place-based regenerative projects.",
    organizer: "Alliance for Regenerative Communities",
  },
];
