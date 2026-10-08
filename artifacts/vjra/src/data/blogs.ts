export type BlogCategory =
  | 'EV Charging'
  | 'EV Infrastructure'
  | 'Smart Charging'
  | 'Energy';

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  content: BlogSection[];
  seoTitle: string;
  seoDescription: string;
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const blogs: BlogArticle[] = [
  {
    id: 'ev-charging-station-setup-india',
    slug: 'ev-charging-station-setup-india',
    title: 'Complete Guide to Setting Up an EV Charging Station in India',
    excerpt:
      'Planning an EV charging station in India? Understand charger types, electrical infrastructure, smart sockets, AC and DC charging, site requirements and the best charging setup for different locations.',
    category: 'EV Charging',
    author: 'VIZ Smart Charging',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: '8 min read',
    image: '/blog/ev-charging-station-india.png',
    featured: true,
    tags: [
      'EV charging station',
      'EV charging station in India',
      'EV charger installation',
      'EV charging infrastructure',
      'AC EV charger',
      'DC fast charger',
      'smart EV socket',
      'EV charging for societies',
      'EV charging for hotels',
      'EV charging for malls',
    ],
    seoTitle:
      'Complete Guide to Setting Up an EV Charging Station in India | VIZ',
    seoDescription:
      'Learn how to set up an EV charging station in India, including smart sockets, AC chargers, DC fast chargers, electrical load planning, installation and charging infrastructure for societies, hotels, malls, offices and public locations.',
    content: [
      {
        heading: 'The EV is parked. So why not charge it while it is there?',
        paragraphs: [
          'Imagine this. You reach your office at 9:30 in the morning. Your EV is going to remain parked for the next eight hours. You plug it in, go to work, and by the time you leave, the vehicle has gained a useful amount of charge.',
          'Now imagine the same thing at a hotel, resort, college, mall, cinema hall or housing society.',
          'This is where the future of EV charging in India is heading — not every vehicle needs a fast charger. In many places, the vehicle is already parked for hours.',
          'The real question is not only how fast we can charge an EV. It is where we can make charging available.'
        ],
      },
      {
        heading: 'What is an EV charging station?',
        paragraphs: [
          'An EV charging station is a location where an electric vehicle can safely connect to an electricity supply and charge its battery.',
          'Depending on the location, available electrical load, parking duration and number of vehicles, the charging setup can range from a simple smart socket to a high-power DC fast charging station.'
        ],
        bullets: [
          'Smart charging sockets for slow and destination charging',
          'AC EV chargers for regular charging',
          'DC fast chargers for quick charging requirements',
          'Energy metering and charging management',
          'Electrical protection and distribution',
          'Software and remote monitoring for smart charging infrastructure'
        ]
      },
      {
        heading: 'The three common EV charging options',
        paragraphs: [
          'Before installing an EV charging station, the first decision is to understand what type of charging is actually required.'
        ],
        bullets: [
          'Smart Socket — ideal when vehicles stay parked for several hours and users carry their own portable charger.',
          'AC Charger — suitable for homes, apartments, workplaces, hotels, offices and destination charging locations.',
          'DC Fast Charger — useful when vehicles need a large amount of energy in a short period, such as highway charging and high-turnover public charging stations.'
        ]
      },
      {
        heading: '1. Smart EV sockets — charge while you stay',
        paragraphs: [
          'A smart EV socket is one of the simplest ways to make a location EV-ready.',
          'The idea is simple: instead of installing a large dedicated fast charger everywhere, provide a safe, monitored and metered charging socket where an EV user can connect their own portable charger.',
          'This is particularly useful at locations where vehicles naturally stay for a few hours.'
        ],
        bullets: [
          'Housing societies',
          'Schools and colleges',
          'Corporate offices and tech parks',
          'Hotels and resorts',
          'Restaurants and cafés',
          'Malls and cinema halls',
          'Tourist destinations and hill stations',
          'Workplaces and commercial buildings'
        ]
      },
      {
        heading: 'Why slow charging should become normal EV charging',
        paragraphs: [
          'Fast charging is useful, but it does not have to be the default charging method for every EV.',
          'For daily charging, regular AC or slow charging can be a practical choice when the vehicle is parked for several hours.',
          'Charging at a lower power level can also reduce the electrical infrastructure required at a location compared with installing multiple high-power DC chargers.',
          'Battery behaviour depends on the vehicle, battery chemistry, thermal management, charging conditions and usage pattern. Frequent high-power charging can create more heat and may contribute to battery ageing, so EV owners should follow the vehicle manufacturer’s charging recommendations rather than relying only on fast charging.'
        ]
      },
      {
        heading: '2. AC EV chargers — the everyday charging option',
        paragraphs: [
          'AC charging is one of the most practical solutions for locations where vehicles stay parked for a reasonable amount of time.',
          'The vehicle’s onboard charger converts AC power into DC power for the battery.'
        ],
        bullets: [
          'Homes and villas',
          'Housing societies',
          'Corporate offices',
          'Hotels and resorts',
          'Schools and colleges',
          'Commercial buildings',
          'Workplaces',
          'Destination charging locations'
        ]
      },
      {
        heading: '3. DC fast charging — when speed really matters',
        paragraphs: [
          'DC fast chargers send DC power to the vehicle battery through the charging system, allowing much faster charging than typical AC charging.',
          'They are useful where vehicles cannot remain parked for long periods and where charging demand is high.'
        ],
        bullets: [
          'Highways',
          'Expressway corridors',
          'Fuel stations',
          'Fleet hubs',
          'Bus and commercial vehicle depots',
          'Railway stations with high vehicle turnover',
          'High-demand public charging hubs'
        ]
      },
      {
        heading: 'Private EV charging stations: where should you install them?',
        paragraphs: [
          'Private charging does not always mean charging at home. Any controlled property where vehicles stay for a longer period can become an excellent charging location.'
        ],
        bullets: [
          'Housing societies and apartment complexes',
          'Villas and gated communities',
          'Corporate offices',
          'Tech parks',
          'Hotels',
          'Resorts',
          'Schools',
          'Colleges and universities'
        ]
      },
      {
        heading: 'Public and semi-public EV charging stations',
        paragraphs: [
          'Public charging needs a different approach. Here, the goal is usually to serve more users and provide predictable access to charging.'
        ],
        bullets: [
          'Shopping malls',
          'Cinema halls',
          'Restaurants and cafés',
          'Hotels and resorts',
          'Railway stations',
          'Highway stops',
          'Tourist destinations',
          'Commercial parking facilities',
          'Fleet and logistics locations'
        ]
      },
      {
        heading: 'How to choose the right charger for a location',
        paragraphs: [
          'The right charger is not necessarily the most powerful charger. Start with the parking duration and charging requirement.'
        ],
        bullets: [
          'Vehicle stays 6–10 hours → Smart socket or AC charging is usually a strong fit.',
          'Vehicle stays 2–5 hours → AC charging can work well depending on the vehicle.',
          'Vehicle stays 20–60 minutes → DC fast charging becomes more relevant.',
          'High vehicle turnover → Consider DC charging or a mixed charging setup.',
          'Large parking area with long dwell time → Multiple smart sockets can often serve more vehicles with lower infrastructure demand.'
        ]
      },
      {
        heading: 'Electrical infrastructure comes before the charger',
        paragraphs: [
          'One of the most common mistakes is choosing the charger first and checking the electrical infrastructure later.',
          'A professional EV charging installation should start with the site.'
        ],
        bullets: [
          'Existing sanctioned electrical load',
          'Available connected load',
          'Maximum demand',
          'Transformer capacity',
          'Cable route and cable sizing',
          'Distribution board capacity',
          'Earthing',
          'MCB, RCCB and other protection requirements',
          'Metering requirements',
          'Future charging demand'
        ]
      },
      {
        heading: 'Why load planning matters',
        paragraphs: [
          'Suppose a society has 100 apartments and suddenly 20 EVs need charging at night. Installing 20 high-power chargers without understanding the site load can create a completely different problem.',
          'Smart charging and load management can help distribute available electrical capacity more intelligently.'
        ],
        bullets: [
          'Avoid unnecessary peak demand',
          'Use available electrical capacity better',
          'Plan future charging points',
          'Reduce the need for oversized infrastructure',
          'Improve charging availability across multiple users'
        ]
      },
      {
        heading: 'A smarter vision for EV charging in India',
        paragraphs: [
          'India does not necessarily need a DC fast charger at every parking location.',
          'What we need is charging where people already spend time.',
          'A school can have smart sockets. A college can have smart sockets. A tech park can have dozens of charging points. A hotel can offer charging overnight. A resort can charge vehicles while guests stay. A mall can provide destination charging while customers shop.',
          'When charging becomes available everywhere people naturally park and stay, dependence on fast charging can reduce for everyday use.'
        ]
      },
      {
        heading: 'VIZ Smart Charging: making charging available where you stay',
        paragraphs: [
          'Our vision at VIZ Smart Charging is simple: make EV charging accessible at as many useful locations as possible.',
          'Instead of treating charging only as a high-speed infrastructure problem, we look at the entire charging ecosystem — smart sockets, AC chargers, electrical infrastructure, energy metering, monitoring and intelligent load management.',
          'The future of EV charging is not only about charging faster. It is also about making charging available more often.'
        ]
      },
      {
        heading: 'Final checklist before installing an EV charging station',
        bullets: [
          'Understand the location and parking duration',
          'Estimate current and future EV demand',
          'Check sanctioned and available electrical load',
          'Select smart sockets, AC chargers, DC chargers or a combination',
          'Plan electrical protection and cabling',
          'Plan metering and energy monitoring',
          'Consider smart load management',
          'Provide clear user access and charging instructions',
          'Plan maintenance and remote monitoring',
          'Keep the system ready for future expansion'
        ]
      }
    ]
  }
];

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}

export function getFeaturedBlogs() {
  return blogs.filter((blog) => blog.featured);
}

export function getLatestBlogs() {
  return [...blogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}