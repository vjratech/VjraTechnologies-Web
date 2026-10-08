import { useState } from 'react';
import SEO from '@/components/seo';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'wouter';
import {
  BlogCard,
} from '@/components/blog';
import {
  blogs,
  getFeaturedBlogs,
  getLatestBlogs,
} from '@/data/blogs';
import {
  ProductSiteFooter,
  ProductSiteHeader,
} from '@/components/products';

export default function Blog() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    window.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  );

  const featured = getFeaturedBlogs()[0];
  const latest = getLatestBlogs();


  return (
    <div
      className="blog-page min-h-screen overflow-hidden bg-background text-foreground"
      data-theme={theme}
    >

    <SEO
        title="EV Charging Blog | EV Charging Infrastructure & Smart Charging | VIZ"
        description="Explore practical guides about EV charging stations, EV charging infrastructure, smart EV sockets, AC and DC chargers, load management and electric mobility in India."
        canonical="https://eviz.in/blog"
        image="/blog/ev-charging-station-india.png"
    />

      <ProductSiteHeader />

      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link
            href="/"
            className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary sm:block"
          >
            VIZ INSIGHTS
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}

              <span className="hidden sm:inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(0,240,255,0.16),transparent_33%),radial-gradient(circle_at_16%_55%,rgba(168,85,247,0.12),transparent_32%)]" />

          <div className="relative mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition hover:text-primary"
            >
              ← Back to platform
            </Link>

            <div className="max-w-4xl">
              <div className="mb-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                VIZ Insights
              </div>

              <h1 className="font-display text-5xl font-bold leading-[0.94] sm:text-7xl lg:text-8xl">
                EV Charging{' '}
                <span className="text-gradient-cyan">
                  Knowledge Hub
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Practical guides about EV charging, electrical
                infrastructure, smart charging and the future of
                electric mobility in India.
              </p>
            </div>
          </div>
        </section>

        {featured && (
          <section className="px-6 pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  Featured guide
                </div>

                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Start here
                </h2>
              </div>

              <BlogCard blog={featured} featured />
            </div>
          </section>
        )}

        <section className="border-y border-border/60 bg-card/20 px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Latest insights
              </div>

              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                Learn. Plan. Charge.
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Guides written for EV owners, housing societies,
                businesses, property managers and anyone planning
                EV charging infrastructure.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-24 text-center sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.14),transparent_50%)]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Planning EV charging?
            </div>

            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Make your location EV-ready.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              From smart sockets to AC and DC charging infrastructure,
              VIZ can help you plan the right charging setup for your
              location.
            </p>

            <a
              href="https://wa.me/918855094432?text=Hello%20VIZ%2C%20I%20want%20to%20discuss%20EV%20charging%20infrastructure."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:shadow-lg hover:shadow-primary/25"
            >
              Talk to VIZ
            </a>
          </div>
        </section>
      </main>

      <ProductSiteFooter />
    </div>
  );
}