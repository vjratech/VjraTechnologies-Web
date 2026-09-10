import heroChargerImg from '@/assets/hero-charger.jpg';
import circuitDetailImg from '@/assets/circuit-detail.jpg';
import evChargingSceneImg from '@/assets/ev-charging-scene.jpg';
import smartGridImg from '@/assets/smart-grid.jpg';

export type ProductVariant = {
  id: string;
  name: string;
  current?: string;
  connectivity?: string;
  power?: string;
  configuration?: string;
  price?: number;
  sku?: string;
  images?: string[];
};

export type Product = {
  id: string;
  slug: string;
  category: 'EV Charging Points' | 'AC Chargers';
  categorySlug: string;
  name: string;
  cardName: string;
  subtitle: string;
  description: string;
  image: string;
  images: string[];
  features: string[];
  applications: string[];
  variants: ProductVariant[];
  specifications: Record<string, Record<string, string>>;
  overview: string;
  faqs: Array<{ question: string; answer: string }>;
};

const gallery = [heroChargerImg, circuitDetailImg, evChargingSceneImg, smartGridImg];

const connectedPointVariants = (prefix: 'single' | 'three') =>
  ['6A Wi-Fi', '6A 4G', '16A Wi-Fi', '16A 4G'].map((name, index) => {
    const [current, connectivity] = name.split(' ');
    return {
      id: `${prefix}-${name.toLowerCase().replace(' ', '-')}`,
      name,
      current,
      connectivity,
      power: prefix === 'single' ? (current === '6A' ? '1.3 kW' : '3.3 kW') : current === '6A' ? '3 kW' : '10 kW',
      price: 0,
      sku: `VJRA-${prefix.toUpperCase()}-${current}-${connectivity.toUpperCase()}`,
      images: [gallery[index % gallery.length], ...gallery.filter((_, imageIndex) => imageIndex !== index % gallery.length)],
    };
  });

export const products: Product[] = [
  {
    id: 'single-point',
    slug: 'single-point',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Single Point',
    cardName: 'Single Point',
    subtitle: '1.3–3.3 kW',
    description: 'A compact connected AC charging point designed for everyday EV charging.',
    image: heroChargerImg,
    images: gallery,
    features: ['1 socket', '6A / 16A', 'Wi-Fi / 4G', '1.3–3.3 kW', 'Suitable for 2, 3 and 4 wheelers depending on configuration'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Homes', 'Workplaces'],
    variants: connectedPointVariants('single'),
    specifications: {
      Electrical: { 'Rated power': '1.3–3.3 kW', 'Output current': '6A / 16A' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Single Point brings connected AC charging into everyday environments with a compact format and flexible current and connectivity configurations.',
    faqs: [
      { question: 'Which configurations are available?', answer: 'The Single Point is available in 6A and 16A current configurations with either Wi-Fi or 4G connectivity.' },
      { question: 'How many vehicles can it charge at once?', answer: 'The Single Point has one charging socket.' },
      { question: 'What power range does it support?', answer: 'The supplied product data specifies a 1.3–3.3 kW power range.' },
      { question: 'Where can it be used?', answer: 'It is suitable for homes, workplaces and 2, 3 and 4 wheelers depending on configuration.' },
    ],
  },
  {
    id: 'three-point',
    slug: 'three-point',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Three Point',
    cardName: 'Three Point',
    subtitle: '3–10 kW',
    description: 'A connected multi-output AC charging point designed for simultaneous charging.',
    image: circuitDetailImg,
    images: [circuitDetailImg, ...gallery.filter((image) => image !== circuitDetailImg)],
    features: ['3 sockets', '6A / 16A per socket', 'Wi-Fi / 4G', '3–10 kW', 'Suitable for simultaneous charging'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Apartments', 'Public Charging', 'Fleet Charging'],
    variants: connectedPointVariants('three'),
    specifications: {
      Electrical: { 'Rated power': '3–10 kW', 'Output current': '6A / 16A per socket', 'Charging outputs': '3 sockets' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Three Point is built for shared charging environments, giving operators three outputs and simultaneous charging in a single connected unit.',
    faqs: [
      { question: 'How many charging outputs are included?', answer: 'The Three Point includes three sockets.' },
      { question: 'Can all sockets charge simultaneously?', answer: 'Yes. The supplied product data identifies the Three Point for simultaneous charging.' },
      { question: 'Which current ratings are supported?', answer: 'Each socket supports the selected 6A or 16A current rating.' },
      { question: 'Which connectivity options are available?', answer: 'Wi-Fi and 4G configurations are available.' },
    ],
  },
  {
    id: 'ac-7-3kw',
    slug: '7-3kw',
    category: 'AC Chargers',
    categorySlug: 'ac-charger',
    name: 'AC Charger — 7.3 kW',
    cardName: '7.3 kW',
    subtitle: 'Single phase',
    description: 'A higher-power AC charger for residential, commercial and destination charging.',
    image: heroChargerImg,
    images: gallery,
    features: ['Single phase', 'Single gun / dual gun', 'Wi-Fi / 4G'],
    applications: ['Homes', 'Workplaces', 'Apartments', 'Destination Charging'],
    variants: [
      { id: 'single-phase-single-gun', name: 'Single Phase — Single Gun', configuration: 'Single Phase — Single Gun', power: '7.3 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-7.3-SINGLE' },
      { id: 'single-phase-dual-gun', name: 'Single Phase — Dual Gun', configuration: 'Single Phase — Dual Gun', power: '7.3 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-7.3-DUAL' },
    ],
    specifications: {
      Electrical: { 'Rated power': '7.3 kW', Phase: 'Single phase' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The 7.3 kW AC Charger pairs single-phase power with a choice of single-gun or dual-gun configuration for flexible destination charging.',
    faqs: [
      { question: 'Which configurations are available?', answer: 'The 7.3 kW charger is available in single-gun and dual-gun configurations.' },
      { question: 'What phase does this charger use?', answer: 'The supplied product data specifies single phase.' },
      { question: 'Is connected monitoring available?', answer: 'Wi-Fi and 4G connectivity are listed for this product family.' },
      { question: 'What is the charger rating?', answer: 'The charger is rated at 7.3 kW.' },
    ],
  },
  {
    id: 'ac-11kw',
    slug: '11kw',
    category: 'AC Chargers',
    categorySlug: 'ac-charger',
    name: 'AC Charger — 11 kW',
    cardName: '11 kW',
    subtitle: 'Three phase',
    description: 'A three-phase AC charger with a focused single-gun configuration.',
    image: evChargingSceneImg,
    images: [evChargingSceneImg, ...gallery.filter((image) => image !== evChargingSceneImg)],
    features: ['Three phase', 'Single gun', 'Wi-Fi / 4G'],
    applications: ['Homes', 'Workplaces', 'Apartments', 'Destination Charging'],
    variants: [{ id: 'three-phase-single-gun', name: 'Three Phase — Single Gun', configuration: 'Three Phase — Single Gun', power: '11 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-11-SINGLE' }],
    specifications: {
      Electrical: { 'Rated power': '11 kW', Phase: 'Three phase' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The 11 kW AC Charger delivers a three-phase, single-gun configuration for higher-power connected charging.',
    faqs: [
      { question: 'What configuration is available?', answer: 'The supplied product data specifies a three-phase, single-gun configuration.' },
      { question: 'What connectivity options are available?', answer: 'Wi-Fi and 4G connectivity are listed for this product family.' },
      { question: 'What is the rated power?', answer: 'The charger is rated at 11 kW.' },
      { question: 'Where can it be used?', answer: 'The AC Charger family is intended for residential, commercial and destination charging.' },
    ],
  },
  {
    id: 'ac-22kw',
    slug: '22kw',
    category: 'AC Chargers',
    categorySlug: 'ac-charger',
    name: 'AC Charger — 22 kW',
    cardName: '22 kW',
    subtitle: 'Three phase',
    description: 'A high-power three-phase AC charger with a single-gun configuration.',
    image: smartGridImg,
    images: [smartGridImg, ...gallery.filter((image) => image !== smartGridImg)],
    features: ['Three phase', 'Single gun', 'Wi-Fi / 4G'],
    applications: ['Workplaces', 'Apartments', 'Public Charging', 'Fleet Charging'],
    variants: [{ id: 'three-phase-single-gun', name: 'Three Phase — Single Gun', configuration: 'Three Phase — Single Gun', power: '22 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-22-SINGLE' }],
    specifications: {
      Electrical: { 'Rated power': '22 kW', Phase: 'Three phase' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The 22 kW AC Charger is designed for destination, public and fleet environments that benefit from higher-power three-phase charging.',
    faqs: [
      { question: 'What configuration is available?', answer: 'The supplied product data specifies a three-phase, single-gun configuration.' },
      { question: 'What is the rated power?', answer: 'The charger is rated at 22 kW.' },
      { question: 'Does it support connected operation?', answer: 'Wi-Fi and 4G connectivity are listed for this product family.' },
      { question: 'Which applications fit this charger?', answer: 'The product is suited to workplaces, apartments, public charging and fleet charging.' },
    ],
  },
];

export function getProduct(category: string, slug: string) {
  return products.find((product) => product.categorySlug === category && product.slug === slug);
}

export function productHref(product: Product) {
  return `/products/${product.categorySlug}/${product.slug}`;
}