import { ARC_RESOURCES_URL, ARC_MEDIA_URL, ARC_MAGAZINE_URL, ARC_VIRTUAL_WORLD_URL, ARC_EVENTS_URL, ARC_EARTHSTOCK_URL } from "@/constants/links";

export type EcosystemLink = {
  id: string;
  label: string;
  description: string;
} & ({ url: string; route?: never } | { route: "/bio-regions"; url?: never });

export const ecosystemLinks: EcosystemLink[] = [
  {
    id: "resources-directory",
    label: "Resources directory",
    description: "The full categorized directory of organizations and services.",
    url: ARC_RESOURCES_URL,
  },
  {
    id: "regen-media-tv",
    label: "Regen Media TV",
    description: "Video content from across the regenerative movement.",
    url: ARC_MEDIA_URL,
  },
  {
    id: "regen-world-magazine",
    label: "Regen World Magazine",
    description: "Long-form stories and features from the ARC community.",
    url: ARC_MAGAZINE_URL,
  },
  {
    id: "spatial-world",
    label: "Spatial virtual world",
    description: "ARC's virtual meeting and gathering space.",
    url: ARC_VIRTUAL_WORLD_URL,
  },
  {
    id: "events-calendar",
    label: "Events calendar",
    description: "The full site-wide calendar of ARC events.",
    url: ARC_EVENTS_URL,
  },
  {
    id: "earth-stock-foundation",
    label: "Earth Stock Foundation",
    description: "An allied foundation in the ARC ecosystem.",
    url: ARC_EARTHSTOCK_URL,
  },
  {
    id: "bio-regions",
    label: "Bioregions",
    description: "Explore the living systems connecting local knowledge and regenerative action.",
    route: "/bio-regions",
  },
];
