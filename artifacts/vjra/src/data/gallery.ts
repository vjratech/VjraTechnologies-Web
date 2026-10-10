
export type GalleryCategory = 'Residential' | 'Commercial';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  description?: string;
  orientation: 'portrait' | 'landscape';
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'residential-01',
    src: '/gallery/residential-01.jpg',
    alt: 'VIZ Smart Charging points installed in a scooter parking area',
    category: 'Residential',
    title: 'Residential EV Charging',
    description: 'Smart charging points for everyday two-wheeler parking.',
    orientation: 'portrait',
  },
  {
    id: 'residential-02',
    src: '/gallery/residential-02.jpg',
    alt: 'Multiple scooters parked beside VIZ charging points',
    category: 'Residential',
    title: 'Shared Parking Charging',
    description: 'Charging infrastructure for a shared parking facility.',
    orientation: 'landscape',
  },
  {
    id: 'commercial-01',
    src: '/gallery/commercial-01.png',
    alt: 'VIZ Smart Charging installation along a parking wall',
    category: 'Commercial',
    title: 'Parking Facility Installation',
    description: 'Multiple charging points installed along parking bays.',
    orientation: 'landscape',
  },
];
