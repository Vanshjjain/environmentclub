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
      "Our signature street-play programme takes bold, dramatic performances to busy chowks, colleges and melas to spread environmental awareness.",
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
    tag: "Community Outreach",
    image: forestImg,
    excerpt:
      "Our flagship day of workshops, film screenings, art installations and mass plantation drives attended by 1,000+ citizens.",
    progress: 100,
    goal: "Held annually",
  },
];

export const initiatives = [
  {
    id: "plantation",
    emoji: "🌱",
    label: "Plantation Drives",
    headline: "Roots of Change",
    description:
      "We have planted over 12,400 trees across Meerut, partnering with schools, local municipalities and the Forest Department. Our drives — including the national 'Ek Ped Maa Ke Naam' campaign and the annual Van Mahotsav — mobilise hundreds of volunteers.",
    stats: [{ v: "12,400+", l: "Trees Planted" }, { v: "30+", l: "Locations" }, { v: "5", l: "Years Running" }],
  },
  {
    id: "nukkad-natak",
    emoji: "🎭",
    label: "Nukkad Natak",
    headline: "Art That Awakens",
    description:
      "Our Nukkad Natak street-play troupe performs powerful original plays at public squares, college fests and community events across Meerut. Each performance tackles pressing environmental issues through heartfelt storytelling.",
    stats: [{ v: "24+", l: "Performances" }, { v: "15,000+", l: "Audience Reached" }, { v: "8", l: "Original Scripts" }],
  },
  {
    id: "summits",
    emoji: "🏛️",
    label: "Environmental Summits",
    headline: "Voices That Lead",
    description:
      "We host and co-organise regional environmental summits bringing together students, scientists, policymakers and NGOs. These platforms produce concrete action plans and foster cross-institutional collaboration.",
    stats: [{ v: "6", l: "Summits Hosted" }, { v: "500+", l: "Delegates" }, { v: "12", l: "Partner Institutions" }],
  },
  {
    id: "collabs",
    emoji: "🤝",
    label: "Collaborations",
    headline: "Stronger Together",
    description:
      "We actively partner with the Meerut Municipal Corporation, UP Forest Department, GreenPeace India, WWF Youth, IIT Roorkee and UNICEF to co-design campaigns and amplify grassroots impact.",
    stats: [{ v: "15+", l: "Partner Orgs" }, { v: "3", l: "Govt. Bodies" }, { v: "4", l: "Sponsored Eco-Trips" }],
  },
];

export const leadership = [
  {
    name: "Sawan Kanojia",
    role: "Founder & Chief Mentor",
    bio: "Visionary founder committed to youth climate stewardship. Championed the initial 50-sapling drive in 2018 into a 12,000+ tree movement.",
    avatar: "/founder.jpg.jpeg",
    socials: {
      linkedin: "https://linkedin.com/in/sawankanojia",
      twitter: "https://twitter.com/sawankanojia",
      instagram: "https://instagram.com/environment_club_",
      email: "founder@environmentclub.org",
    },
  },
  {
    name: "Vansh Jain",
    role: "Club President",
    bio: "Leads campus operations, government partnerships, and strategic expansion across 12 college chapters in Uttar Pradesh.",
    avatar: "/logo.png.jpeg",
    socials: {
      linkedin: "https://linkedin.com/in/vanshjjain",
      twitter: "https://twitter.com/vanshjjain",
      instagram: "https://instagram.com/environment_club_",
      email: "vansh@environmentclub.org",
    },
  },
  {
    name: "Mayank Tamta",
    role: "Campaign Director",
    bio: "Head of field operations, urban plastic audits, and native reforestation site logistics across Meerut.",
    avatar: "/founder.jpg.jpeg",
    socials: {
      linkedin: "https://linkedin.com/in/mayanktamta",
      instagram: "https://instagram.com/environment_club_",
      email: "mayank@environmentclub.org",
    },
  },
  {
    name: "Abhishek Paliwal",
    role: "Youth Outreach Lead",
    bio: "Directs school climate literacy workshops, Nukkad Natak troupe direction, and volunteer mobilization.",
    avatar: "/logo.png.jpeg",
    socials: {
      linkedin: "https://linkedin.com/in/abhishekpaliwal",
      instagram: "https://instagram.com/environment_club_",
      email: "abhishek@environmentclub.org",
    },
  },
];

export const partnerLogos = [
  {
    name: "UP Forest Department",
    category: "Government Partner",
    desc: "Official MoU for native saplings & protected forest land allocation",
    logo: "🌳",
  },
  {
    name: "Meerut Municipal Corporation",
    category: "Civic Partner",
    desc: "Co-organising urban plastic audit & waste segregation drives",
    logo: "🏛️",
  },
  {
    name: "GreenPeace India",
    category: "NGO Partner",
    desc: "National campaign alignment & youth climate advocacy training",
    logo: "🌍",
  },
  {
    name: "WWF Youth India",
    category: "Global Alliance",
    desc: "Biodiversity documentation & wildlife sanctuary protection",
    logo: "🐼",
  },
  {
    name: "IIT Roorkee Eco Cell",
    category: "Academic Partner",
    desc: "Rainwater harvesting engineering design & water testing labs",
    logo: "🎓",
  },
  {
    name: "UNICEF India Youth",
    category: "Institutional Partner",
    desc: "School climate literacy curriculum development and grants",
    logo: "🕊️",
  },
];

export const impactLocations = [
  { id: 1, name: "CCS University Campus Forest", city: "Meerut", count: 2400, species: "Neem, Peepal, Jamun", category: "Campus" },
  { id: 2, name: "Kali Nadi Riverfront Corridor", city: "Meerut", count: 1800, species: "Banyan, Bamboo, Arjun", category: "Riverbed" },
  { id: 3, name: "Shastri Nagar Community Park", city: "Meerut", count: 1200, species: "Gulmohar, Amaltas, Neem", category: "Urban Park" },
  { id: 4, name: "Gandhi Bagh Bio-Zone", city: "Meerut", count: 1500, species: "Kachnar, Peepal, Sheesham", category: "Urban Park" },
  { id: 5, name: "Modinagar Reforestation Belt", city: "Ghaziabad/UP", count: 2100, species: "Aonla, Bahera, Neem", category: "Forest Belt" },
  { id: 6, name: "Cantonment Board Green Zone", city: "Meerut Cantt", count: 1400, species: "Chhitwan, Bargad, Neem", category: "Institutional" },
  { id: 7, name: "Sardhana Wetland Buffer", city: "Sardhana/UP", count: 1000, species: "Water Willow, Bamboo", category: "Wetland" },
  { id: 8, name: "Hastinapur Sanctuary Perimeter", city: "Hastinapur", count: 1000, species: "Kadamb, Semal, Neem", category: "Sanctuary" },
];

export const downloadableResources = [
  {
    title: "Annual Environmental Impact Report 2026",
    subtitle: "Complete audit of 12,400+ trees, water body restorations, and financial transparency.",
    format: "PDF",
    size: "4.2 MB",
    filename: "Environment_Club_Impact_Report_2026.pdf",
    category: "Report",
  },
  {
    title: "Native Tree Plantation & Sapling Care Guide",
    subtitle: "Comprehensive manual on soil preparation, native species selection, and 3-year survival care.",
    format: "PDF",
    size: "2.8 MB",
    filename: "Native_Plantation_Guide_2026.pdf",
    category: "Guide",
  },
  {
    title: "Campus Plastic Audit & Zero-Waste Toolkit",
    subtitle: "Step-by-step methodology for college hostels and cafes to audit single-use plastics.",
    format: "PDF",
    size: "1.9 MB",
    filename: "Campus_Zero_Waste_Toolkit.pdf",
    category: "Toolkit",
  },
  {
    title: "Environment Club Official Media & Press Kit",
    subtitle: "High-resolution brand assets, photos, leader quotes, and institutional partner overview.",
    format: "ZIP",
    size: "12.5 MB",
    filename: "Environment_Club_Press_Kit_2026.zip",
    category: "Media",
  },
];

export const testimonials = [
  {
    quote: "Joining the Environment Club was the most meaningful thing I did in college. It changed how I see everyday action.",
    name: "Abhishek Paliwal",
    role: "Youth Outreach Lead",
  },
  {
    quote: "The clean-ups turned into friendships, the friendships turned into a movement. That's the real power of youth.",
    name: "Mayank Tamta",
    role: "Campaign Director",
  },
  {
    quote: "A student body doing serious ecological work with verifiable data. We are proud to lead this campus revolution.",
    name: "Vansh Jain",
    role: "Club President",
  },
];

export const posts = [
  {
    slug: "why-native-trees-matter",
    title: "Why Native Trees Matter More Than You Think",
    category: "Biodiversity",
    excerpt: "Planting is easy. Planting the right native species — the ones that belong — is what restores local biodiversity.",
    date: "Sep 12, 2026",
    readMin: 6,
    author: "Sawan Kanojia",
    authorAvatar: "/founder.jpg.jpeg",
  },
  {
    slug: "plastic-audit",
    title: "We Audited Our Campus for Plastic: Here's What We Found",
    category: "Plastic Pollution",
    excerpt: "Over three weeks, forty volunteers weighed single-use plastic waste from three hostels. Here are the findings.",
    date: "Aug 28, 2026",
    readMin: 8,
    author: "Vansh Jain",
    authorAvatar: "/logo.png.jpeg",
  },
  {
    slug: "monsoon-water",
    title: "Catching the Monsoon: Rainwater Harvesting on a Student Budget",
    category: "Water Conservation",
    excerpt: "A practical, low-cost blueprint for hostels, homes, and small campuses — designed by our engineering wing.",
    date: "Aug 04, 2026",
    readMin: 5,
    author: "Mayank Tamta",
    authorAvatar: "/founder.jpg.jpeg",
  },
  {
    slug: "climate-classroom",
    title: "Bringing Climate Literacy Into Every Local Classroom",
    category: "Climate Literacy",
    excerpt: "How our outreach team turned a five-slide presentation into a curriculum piloted across twelve local schools.",
    date: "Jul 19, 2026",
    readMin: 7,
    author: "Abhishek Paliwal",
    authorAvatar: "/logo.png.jpeg",
  },
];

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