import forestImg from "@/assets/campaign-forest.jpg";
import beeImg from "@/assets/campaign-bee.jpg";
import riverImg from "@/assets/campaign-river.jpg";
import communityImg from "@/assets/community.jpg";

export const heroStats = [
  { label: "Trees Planted", value: 12400, suffix: "+" },
  { label: "Volunteers", value: 850, suffix: "+" },
  { label: "Summits Hosted", value: 6, suffix: "" },
  { label: "Nukkad Nataks", value: 24, suffix: "+" },
];

export const campaigns = [
  {
    slug: "plastic-free-meerut",
    title: "Plastic Free Meerut",
    tag: "Waste Reduction",
    image: riverImg,
    excerpt:
      "A city-wide movement to eliminate single-use plastic from campuses, markets and public parks across Meerut.",
    progress: 68,
    goal: "50 tonnes diverted",
  },
  {
    slug: "ek-ped-maa-ke-naam",
    title: "Ek Ped Maa Ke Naam",
    tag: "Plantation Drive",
    image: forestImg,
    excerpt:
      "Plant a tree in honour of your mother — a growing forest of gratitude, one sapling at a time, across Meerut.",
    progress: 82,
    goal: "10,000 saplings",
  },
  {
    slug: "van-mahotsav",
    title: "Van Mahotsav Drive",
    tag: "Reforestation",
    image: beeImg,
    excerpt:
      "Annual festival of native tree planting across partner schools, colleges and community forests across Uttar Pradesh.",
    progress: 75,
    goal: "20 sites this year",
  },
  {
    slug: "nukkad-natak",
    title: "Nukkad Natak — Street for Earth",
    tag: "Nukkad Natak",
    image: communityImg,
    excerpt:
      "Our signature street-play programme takes bold, dramatic performances to busy chowks, colleges and melas to spread environmental awareness in the most direct, heartfelt way possible.",
    progress: 90,
    goal: "50 performances",
  },
  {
    slug: "paani-ki-baat",
    title: "Paani Ki Baat",
    tag: "Water Conservation",
    image: riverImg,
    excerpt:
      "Reviving neighbourhood ponds, step-wells and the Kali Nadi through cleanups, audits and rainwater-harvesting workshops.",
    progress: 34,
    goal: "12 water bodies",
  },
  {
    slug: "world-environment-day",
    title: "World Environment Day",
    tag: "Community",
    image: forestImg,
    excerpt:
      "Our flagship day of workshops, film screenings, art installations and mass plantation drives attended by 1,000+ citizens.",
    progress: 100,
    goal: "Held annually",
  },
] as const;

// Key pillars / initiatives for dedicated showcase section
export const initiatives = [
  {
    id: "plantation",
    emoji: "🌱",
    label: "Plantation Drives",
    headline: "Roots of Change",
    description:
      "We have planted over 12,400 trees across Meerut, partnering with schools, local municipalities and the Forest Department. Our drives — including the national 'Ek Ped Maa Ke Naam' campaign and the annual Van Mahotsav — mobilise hundreds of volunteers to restore green cover in urban and peri-urban areas.",
    stats: [{ v: "12,400+", l: "Trees Planted" }, { v: "30+", l: "Locations" }, { v: "5", l: "Years Running" }],
  },
  {
    id: "nukkad-natak",
    emoji: "🎭",
    label: "Nukkad Natak",
    headline: "Art That Awakens",
    description:
      "Our Nukkad Natak (street-play) troupe performs powerful, original plays at public squares, college fests and community events across Meerut. Each performance tackles a pressing issue — plastic pollution, water scarcity, climate change — through storytelling that reaches hearts where pamphlets cannot.",
    stats: [{ v: "24+", l: "Performances" }, { v: "15,000+", l: "Audience Reached" }, { v: "8", l: "Original Scripts" }],
  },
  {
    id: "summits",
    emoji: "🏛️",
    label: "Environmental Summits",
    headline: "Voices That Lead",
    description:
      "We proudly host and co-organise regional environmental summits that bring together students, scientists, policymakers and NGOs under one roof. These platforms produce concrete action plans, foster cross-institutional collaboration and have seen participants go on to lead district-level initiatives.",
    stats: [{ v: "6", l: "Summits Hosted" }, { v: "500+", l: "Delegates" }, { v: "12", l: "Partner Institutions" }],
  },
  {
    id: "collabs",
    emoji: "🤝",
    label: "Collaborations",
    headline: "Stronger Together",
    description:
      "Environmental challenges are too large for any one group alone. We actively partner with the Meerut Municipal Corporation, the UP Forest Department, GreenPeace India, WWF Youth, IIT Roorkee and UNICEF to co-design campaigns, share resources and amplify each other's reach for maximum grassroots impact.",
    stats: [{ v: "15+", l: "Partner Orgs" }, { v: "3", l: "Govt. Bodies" }, { v: "4", l: "Sponsored Eco-Trips" }],
  },
] as const;

export const events: any[] = [];

export const testimonials = [
  {
    quote:
      "Joining the Environment Club was the most meaningful thing I did in college. It changed how I see the world.",
    name: "Abhishek Paliwal",
    role: "Volunteer, Class of 2025",
  },
  {
    quote:
      "The clean-ups turned into friendships, the friendships turned into a movement. That's the magic here.",
    name: "Mayank Tamta",
    role: "Campaign Lead",
  },
  {
    quote:
      "A student body doing serious ecological work with real data. We're proud to partner with them.",
    name: "Vansh Jain",
    role: "Club President",
  },
];

export const posts = [
  {
    slug: "why-native-trees-matter",
    title: "Why native trees matter more than you think",
    category: "Biodiversity",
    excerpt:
      "Planting is easy. Planting the right species — the ones that belong — is what changes an ecosystem.",
    date: "Sep 12, 2026",
    readMin: 6,
  },
  {
    slug: "plastic-audit",
    title: "We audited our own campus for plastic. Here's what we found.",
    category: "Plastic Pollution",
    excerpt:
      "Over three weeks, forty volunteers weighed every gram of waste from three hostels. The numbers surprised us.",
    date: "Aug 28, 2026",
    readMin: 8,
  },
  {
    slug: "monsoon-water",
    title: "Catching the monsoon: rainwater harvesting on a student budget",
    category: "Water Conservation",
    excerpt:
      "A practical, low-cost blueprint for hostels, homes and small campuses — designed by our engineering wing.",
    date: "Aug 04, 2026",
    readMin: 5,
  },
  {
    slug: "climate-classroom",
    title: "Bringing climate literacy into every classroom",
    category: "Climate Change",
    excerpt:
      "How our outreach team turned a five-slide talk into a curriculum piloted across twelve local schools.",
    date: "Jul 19, 2026",
    readMin: 7,
  },
];

export const gallery: any[] = [];

export const partners = [
  "Forest Dept. UP",
  "Municipal Corp. Meerut",
  "GreenPeace India",
  "WWF Youth",
  "IIT Roorkee",
  "UNICEF India",
  "NEF",
  "Earth5R",
];