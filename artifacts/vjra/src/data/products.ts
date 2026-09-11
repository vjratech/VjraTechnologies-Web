import heroChargerImg from '@/assets/charger.png';
import circuitDetailImg from '@/assets/circuit-detail.jpg';
import evChargingSceneImg from '@/assets/ev-charging-scene.jpg';
import smartGridImg from '@/assets/smart-grid.jpg';

import singlepoint_16a_f1 from '@/assets/productimages/singlepoint_16a_f1.png';
import singlepoint_16a_i1 from '@/assets/productimages/singlepoint_16a_i1.png';
import singlepoint_16a_i3 from '@/assets/productimages/singlepoint_16a_i3.png';
import singlepoint_16a_m1 from '@/assets/productimages/singlepoint_16a_m1.png';
import singlepoint_16a_s1 from '@/assets/productimages/singlepoint_16a_s1.png';
import singlepoint_6a_f1 from '@/assets/productimages/singlepoint_6a_f1.png';
import singlepoint_6a_i1 from '@/assets/productimages/singlepoint_6a_i1.png';
import singlepoint_6a_m1 from '@/assets/productimages/singlepoint_6a_m1.png';
import singlepoint_6a_s1 from '@/assets/productimages/singlepoint_6a_s1.png';
import threepoint_16a_f1 from '@/assets/productimages/threepoint_16a_f1.png';
import threepoint_16a_i1 from '@/assets/productimages/threepoint_16a_i1.png';
import threepoint_6a_f1 from '@/assets/productimages/threepoint_6a_f1.png';
import threepoint_6a_i1 from '@/assets/productimages/threepoint_6a_i1.png';
import threepoint_6a_i2 from '@/assets/productimages/threepoint_6a_i2.png';
import common1 from '@/assets/common1.png';
import common2 from '@/assets/common2.png';
import common3 from '@/assets/common3.png';
import singlepoint_common from '@/assets/singlepoint_common.png';


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
  overviewImage: string;
  features: string[];
  applications: string[];
  variants: ProductVariant[];
  specifications: Record<string, Record<string, string>>;
  overview: string;
  faqs: Array<{ question: string; answer: string }>;
};

const commonImages = [common1, common2, common3];

const connectivityVariants = (prefix: string, current: string, power: string, images: string[]): ProductVariant[] =>
  ['Wi-Fi', '4G'].map((connectivity) => ({
    id: `${prefix}-${connectivity.toLowerCase().replace('-', '')}`,
    name: `${current} ${connectivity}`,
    current,
    connectivity,
    power,
    price: 0,
    sku: `VJRA-${prefix.toUpperCase()}-${connectivity.toUpperCase().replace('-', '')}`,
    images,
  }));

const productFaqs = (current: string, power: string, outputCount: string) => [
  { question: 'Which connectivity options are available?', answer: `This product is available with Wi-Fi or 4G connectivity.` },
  { question: 'What current rating does this product use?', answer: `This product is configured for ${current}.` },
  { question: 'What is the rated power?', answer: `The supplied product data specifies ${power}.` },
  { question: 'How many charging outputs are included?', answer: `${outputCount} charging output${outputCount === '1' ? '' : 's'} are included in this product.` },
];

const singlePoint6AImages = [singlepoint_6a_m1, singlepoint_6a_f1, singlepoint_6a_s1, singlepoint_6a_i1, ...commonImages];
const singlePoint16AImages = [singlepoint_16a_m1, singlepoint_16a_f1, singlepoint_16a_s1, singlepoint_16a_i1, singlepoint_16a_i3, ...commonImages];
const threePoint6AImages = [threepoint_6a_f1, threepoint_6a_i1, threepoint_6a_i2, ...commonImages];
const threePoint16AImages = [threepoint_16a_f1, threepoint_16a_i1, ...commonImages];

export const products: Product[] = [
  {
    id: 'single-point-6a',
    slug: 'single-point-6a',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Single Point 6A',
    cardName: 'Single Point — 6A',
    subtitle: '1.3 kW',
    description: 'A compact connected AC charging point for everyday 6A charging.',
    image: singlePoint6AImages[0],
    images: singlePoint6AImages,
     overviewImage: singlepoint_common,
    features: ['1 socket', '6A current', 'Wi-Fi / 4G', '1.3 kW', 'Suitable for 2, 3 and 4 wheelers depending on configuration'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Homes', 'Workplaces'],
    variants: connectivityVariants('single-point-6a', '6A', '1.3 kW', singlePoint6AImages),
    specifications: {
      Electrical: { 'Rated power': '1.3 kW', 'Output current': '6A' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Single Point 6A brings connected AC charging into everyday environments with a compact format and dedicated 6A output.',
    faqs: productFaqs('6A', '1.3 kW', '1'),
  },
  {
    id: 'single-point-16a',
    slug: 'single-point-16a',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Single Point 16A',
    cardName: 'Single Point — 16A',
    subtitle: '3.3 kW',
    description: 'A compact connected AC charging point for higher-power 16A charging.',
    image: singlePoint16AImages[0],
    images: singlePoint16AImages,
     overviewImage: singlepoint_common,
    features: ['1 socket', '16A current', 'Wi-Fi / 4G', '3.3 kW', 'Suitable for 2, 3 and 4 wheelers depending on configuration'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Homes', 'Workplaces'],
    variants: connectivityVariants('single-point-16a', '16A', '3.3 kW', singlePoint16AImages),
    specifications: {
      Electrical: { 'Rated power': '3.3 kW', 'Output current': '16A' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Single Point 16A is a connected AC charging point with a dedicated 16A output for higher-power everyday charging.',
    faqs: productFaqs('16A', '3.3 kW', '1'),
  },
  {
    id: 'three-point-6a',
    slug: 'three-point-6a',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Three Point 6A',
    cardName: 'Three Point — 6A',
    subtitle: '3 kW',
    description: 'A connected three-output AC charging point for simultaneous 6A charging.',
    image: threePoint6AImages[0],
    images: threePoint6AImages,
     overviewImage: singlepoint_common,
    features: ['3 sockets', '6A per socket', 'Wi-Fi / 4G', '3 kW', 'Suitable for simultaneous charging'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Apartments', 'Public Charging', 'Fleet Charging'],
    variants: connectivityVariants('three-point-6a', '6A', '3 kW', threePoint6AImages),
    specifications: {
      Electrical: { 'Rated power': '3 kW', 'Output current': '6A per socket', 'Charging outputs': '3 sockets' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Three Point 6A is built for shared charging environments, providing three connected outputs for simultaneous 6A charging.',
    faqs: productFaqs('6A per socket', '3 kW', '3'),
  },
  {
    id: 'three-point-16a',
    slug: 'three-point-16a',
    category: 'EV Charging Points',
    categorySlug: 'ev-charging-point',
    name: 'EV Charging Point — Three Point 16A',
    cardName: 'Three Point — 16A',
    subtitle: '10 kW',
    description: 'A connected three-output AC charging point for simultaneous 16A charging.',
    image: threePoint16AImages[0],
    images: threePoint16AImages,
    overviewImage: singlepoint_common,
    features: ['3 sockets', '16A per socket', 'Wi-Fi / 4G', '10 kW', 'Suitable for simultaneous charging'],
    applications: ['2 Wheelers', '3 Wheelers', '4 Wheelers', 'Apartments', 'Public Charging', 'Fleet Charging'],
    variants: connectivityVariants('three-point-16a', '16A', '10 kW', threePoint16AImages),
    specifications: {
      Electrical: { 'Rated power': '10 kW', 'Output current': '16A per socket', 'Charging outputs': '3 sockets' },
      Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' },
    },
    overview: 'The Three Point 16A is built for shared charging environments, providing three connected outputs for simultaneous 16A charging.',
    faqs: productFaqs('16A per socket', '10 kW', '3'),
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
    images: [heroChargerImg, circuitDetailImg, evChargingSceneImg, smartGridImg],
     overviewImage: singlepoint_common,
    features: ['Single phase', 'Single gun / dual gun', 'Wi-Fi / 4G'],
    applications: ['Homes', 'Workplaces', 'Apartments', 'Destination Charging'],
    variants: [
      { id: 'single-phase-single-gun', name: 'Single Phase — Single Gun', configuration: 'Single Phase — Single Gun', power: '7.3 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-7.3-SINGLE' },
      { id: 'single-phase-dual-gun', name: 'Single Phase — Dual Gun', configuration: 'Single Phase — Dual Gun', power: '7.3 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-7.3-DUAL' },
    ],
    specifications: { Electrical: { 'Rated power': '7.3 kW', Phase: 'Single phase' }, Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' } },
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
    image: heroChargerImg,
    images: [heroChargerImg, evChargingSceneImg, circuitDetailImg, smartGridImg],
     overviewImage: singlepoint_common,
    features: ['Three phase', 'Single gun', 'Wi-Fi / 4G'],
    applications: ['Homes', 'Workplaces', 'Apartments', 'Destination Charging'],
    variants: [{ id: 'three-phase-single-gun', name: 'Three Phase — Single Gun', configuration: 'Three Phase — Single Gun', power: '11 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-11-SINGLE' }],
    specifications: { Electrical: { 'Rated power': '11 kW', Phase: 'Three phase' }, Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' } },
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
    image: heroChargerImg,
    images: [heroChargerImg, smartGridImg, circuitDetailImg, evChargingSceneImg],
     overviewImage: singlepoint_common,
    features: ['Three phase', 'Single gun', 'Wi-Fi / 4G'],
    applications: ['Workplaces', 'Apartments', 'Public Charging', 'Fleet Charging'],
    variants: [{ id: 'three-phase-single-gun', name: 'Three Phase — Single Gun', configuration: 'Three Phase — Single Gun', power: '22 kW', connectivity: 'Wi-Fi / 4G', price: 0, sku: 'VJRA-AC-22-SINGLE' }],
    specifications: { Electrical: { 'Rated power': '22 kW', Phase: 'Three phase' }, Connectivity: { 'Wi-Fi': 'Available', '4G': 'Available' } },
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