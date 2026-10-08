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
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  content: BlogSection[];
  seoTitle: string;
  seoDescription: string;
};

export type BlogLink = {
  text: string;
  href: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: BlogLink[];
  faqs?: BlogFaq[];
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
    imageAlt: 'EV charging station infrastructure with electric vehicle charging points in India',
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
      'EV Charging Station in India: Complete Setup Guide | VIZ',
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
        ],
        links: [
            {
                text: 'Explore VIZ EV Charging Points →',
                href: '/products/ev-charging-point/single-point-6a',
            },
            {
                text: 'Explore the 16A Charging Point →',
                href: '/products/ev-charging-point/single-point-16a',
            },
            ]
      },
      {
        heading: 'Why Slow EV Charging Is Important for Daily Charging',
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
        ],
        links: [
            {
                text: 'Explore VIZ AC Chargers →',
                href: '/products/ac-charger/7-3kw',
            },
            {
                text: 'View 11 kW AC Charger →',
                href: '/products/ac-charger/11kw',
            },
            {
                text: 'View 22 kW AC Charger →',
                href: '/products/ac-charger/22kw',
            },
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
        heading: 'A practical EV charger selection framework',
        paragraphs: [
            'Choosing an EV charger should start with the use case rather than the charger rating alone. Consider parking duration, expected daily energy demand, number of vehicles, electrical capacity and whether the site needs public or controlled access.'
        ],
        bullets: [
            'Long parking duration + many vehicles → smart sockets or AC charging can support destination charging efficiently.',
            'Moderate parking duration + predictable daily demand → AC charging is often a practical fit.',
            'Short parking duration + high vehicle turnover → DC fast charging becomes more relevant.',
            'Mixed parking duration → combine smart sockets, AC chargers and DC charging according to the site.'
        ],
        },
      {
        heading: 'Electrical Requirements for an EV Charging Station',
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
        heading: 'How much does an EV charging station cost?',
        paragraphs: [
            'The cost of an EV charging station project depends on much more than the charger itself. Installation cost can include the charger or charging point, electrical protection, cabling, distribution equipment, civil work, metering, communication, software and commissioning.',
            'A small smart charging point may require significantly less infrastructure than a high-power public DC charging installation. The correct budget should therefore be prepared after evaluating the site electrical capacity and expected charging demand.'
        ],
        bullets: [
            'Charging hardware',
            'Electrical panel and protection',
            'Cabling and installation',
            'Earthing and safety infrastructure',
            'Civil work and mounting',
            'Metering and energy monitoring',
            'Connectivity and software',
            'Commissioning and maintenance'
        ],
        },
      {
        heading: 'The Future of EV Charging Infrastructure in India',
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
      },
      {
        heading: 'Frequently asked questions about EV charging stations',
        faqs: [
            {
            question: 'What is required to install an EV charging station in India?',
            answer:
                'The project normally requires an appropriate charging solution, suitable electrical capacity, protection equipment, correctly sized cabling, earthing, metering and installation suitable for the site and intended use.',
            },
            {
            question: 'Which EV charger is suitable for an apartment society?',
            answer:
                'The right solution depends on parking duration, available electrical capacity and the number of residents likely to charge. Smart charging points and AC chargers can be useful where vehicles remain parked for several hours.',
            },
            {
            question: 'What is the difference between AC and DC EV charging?',
            answer:
                'AC charging supplies alternating current to the vehicle, where the vehicle onboard charger converts it for battery charging. DC fast charging supplies DC power through the charging system and can support much faster charging where the vehicle and charger are compatible.',
            },
            {
            question: 'How much electrical load is required for EV charging?',
            answer:
                'The required electrical capacity depends on charger power, number of charging points, simultaneous usage and the site load profile. A proper load assessment should be completed before finalizing the installation.',
            },
            {
            question: 'Can multiple EV chargers share the same electrical infrastructure?',
            answer:
                'Yes, multiple charging points can be designed around available site capacity, provided the electrical infrastructure is appropriately sized and the charging system uses suitable load management where required.',
            },
        ],
        }
    ]
  }
];

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}
export function getBlogsByCategory(category: BlogCategory) {
  return blogs.filter((blog) => blog.category === category);
}
export function getBlogsByTag(tag: string) {
  const normalizedTag = tag.toLowerCase();

  return blogs.filter((blog) =>
    blog.tags.some(
      (blogTag) => blogTag.toLowerCase() === normalizedTag
    )
  );
}
export function getAllBlogCategories(): BlogCategory[] {
  return [...new Set(blogs.map((blog) => blog.category))];
}
export function getAllBlogTags(): string[] {
  return [
    ...new Set(
      blogs.flatMap((blog) => blog.tags)
    ),
  ];
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

export function blogCategorySlug(
  category: BlogCategory
) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function blogTagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

