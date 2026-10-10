
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Images,
  Pause,
  Play,
  X,
} from 'lucide-react';

import { ProductSiteHeader, ProductSiteFooter } from '@/components/products';
import { galleryImages, type GalleryImage } from '@/data/gallery';
import type { CSSProperties } from 'react';
import './gallery.css';

type GalleryFilter = 'All' | 'Residential' | 'Commercial';

const filters: GalleryFilter[] = [
  'All',
  'Residential',
  'Commercial',
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] =
    useState<GalleryFilter>('All');

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);

  const visibleImages = galleryImages.filter(
    (image) =>
      activeFilter === 'All' ||
      image.category === activeFilter
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track || !isPlaying || selectedImage) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      if (
        track.scrollLeft + track.clientWidth >=
        track.scrollWidth - 8
      ) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({
          left: Math.max(track.clientWidth * 0.7, 220),
          behavior: 'smooth',
        });
      }
    }, 3500);

    return () => window.clearInterval(interval);
  }, [activeFilter, isPlaying, selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const scrollGallery = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left:
        direction *
        Math.max((trackRef.current?.clientWidth ?? 300) * 0.7, 220),
      behavior: 'smooth',
    });
  };

  return (
    <div className="viz-gallery-page">
      <ProductSiteHeader />

      <main className="viz-gallery">
        <section className="viz-gallery-hero">
          <div className="viz-gallery-eyebrow">
            <Images size={16} />
            <span>VIZ SMART CHARGING · OUR INSTALLATIONS</span>
          </div>

          <h1>
            Powering spaces.
            <br />
            <span>Enabling electric mobility.</span>
          </h1>

          <p>
            A look at our on-ground EV charging installations
            across residential communities and commercial spaces.
          </p>
        </section>

        <section
          className="viz-gallery-content"
          aria-label="Installation gallery"
        >
          <div className="viz-gallery-toolbar">
            <div className="viz-gallery-filters" aria-label="Filter installations">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={
                    activeFilter === filter ? 'active' : ''
                  }
                  aria-pressed={activeFilter === filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    if (trackRef.current) {
                      trackRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  {filter === 'All'
                    ? 'All installations'
                    : filter}
                </button>
              ))}
            </div>

            <div className="viz-gallery-controls">
              <button
                type="button"
                className="viz-gallery-play"
                onClick={() => setIsPlaying((value) => !value)}
                aria-label={
                  isPlaying
                    ? 'Pause automatic scrolling'
                    : 'Resume automatic scrolling'
                }
                title={
                  isPlaying
                    ? 'Pause auto-scroll'
                    : 'Resume auto-scroll'
                }
              >
                {isPlaying ? (
                  <Pause size={17} />
                ) : (
                  <Play size={17} />
                )}
              </button>

              <button
                type="button"
                className="viz-gallery-arrow"
                onClick={() => scrollGallery(-1)}
                aria-label="Scroll gallery left"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                className="viz-gallery-arrow"
                onClick={() => scrollGallery(1)}
                aria-label="Scroll gallery right"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div
            className="viz-gallery-track"
            ref={trackRef}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            onFocus={() => setIsPlaying(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPlaying(true);
              }
            }}
          >
            {visibleImages.map((image, index) => (
              <article
                className={`viz-gallery-card ${image.orientation}`}
                key={image.id}
                style={{
                  '--gallery-index': index,
                } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="viz-gallery-image-button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View ${image.title}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  <span className="viz-gallery-image-overlay">
                    <span className="viz-gallery-image-category">
                      {image.category}
                    </span>
                    <span className="viz-gallery-image-open">
                      View image <ArrowRight size={16} />
                    </span>
                  </span>
                </button>

                {(image.title || image.description) && (
                  <div className="viz-gallery-caption">
                    {image.title && <h3>{image.title}</h3>}
                    {image.description && (
                      <p>{image.description}</p>
                    )}
                  </div>
                )}
              </article>
            ))}

            {visibleImages.length === 0 && (
              <p className="viz-gallery-empty">
                Installations in this category will be added soon.
              </p>
            )}
          </div>

          <p className="viz-gallery-hint">
            Swipe or scroll to explore more installations.
          </p>
        </section>

        <section className="viz-gallery-bottom">
          <span>Built for real-world charging needs.</span>
          <h2>Let’s electrify your parking space.</h2>
          <p>
            From residential societies to commercial parking
            facilities, VIZ helps bring EV charging closer to users.
          </p>
        </section>
      </main>

      <ProductSiteFooter />

      {selectedImage && (
        <div
          className="viz-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <button
            type="button"
            className="viz-gallery-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
          />

          <div className="viz-gallery-lightbox-caption">
            <span>{selectedImage.category}</span>
            <h2>{selectedImage.title}</h2>
            {selectedImage.description && (
              <p>{selectedImage.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
