import { useState } from 'react';
import SEO from '@/components/seo';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Link } from 'wouter';
import { useParams } from 'wouter';
import {
  BlogArticleContent,
  BlogTableOfContents,
} from '@/components/blog';
import { blogs, getBlogBySlug } from '@/data/blogs';
import {
  ProductSiteFooter,
  ProductSiteHeader,
} from '@/components/products';
import NotFound from '@/pages/not-found';

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const blog = getBlogBySlug(params.slug);

  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    window.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  );

  if (!blog) {
    return <NotFound />;
  }

  const canonicalUrl = `https://eviz.in/blog/${blog.slug}`;

  const relatedBlogs = blogs
    .filter(
      (candidate) =>
        candidate.id !== blog.id &&
        candidate.category === blog.category
    )
    .slice(0, 3);

  return (
    <div
      className="blog-page min-h-screen overflow-hidden bg-background text-foreground"
      data-theme={theme}
    >
        <SEO
  title={blog.seoTitle}
  description={blog.seoDescription}
  canonical={canonicalUrl}
  image={blog.image}
  type="article"
  publishedAt={blog.publishedAt}
  updatedAt={blog.updatedAt}
  author={blog.author}
  articleSection={blog.category}
  tags={blog.tags}
  breadcrumbs={[
    {
      name: 'Home',
      url: 'https://eviz.in/',
    },
    {
      name: 'Blog',
      url: 'https://eviz.in/blog',
    },
    {
      name: blog.category,
      url: `https://eviz.in/blog/category/${blog.category
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
    },
    {
      name: blog.title,
      url: canonicalUrl,
    },
  ]}
/>

      <ProductSiteHeader />

      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            VIZ Insights
          </Link>

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

      <main>
        <article>
          <header className="relative overflow-hidden px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(0,240,255,0.14),transparent_35%),radial-gradient(circle_at_15%_70%,rgba(168,85,247,0.10),transparent_32%)]" />

            <div className="relative mx-auto max-w-5xl">
              <nav className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  Home
                </Link>

                <span>/</span>

                <Link
                  href="/blog"
                  className="transition hover:text-primary"
                >
                  Blog
                </Link>

                <span>/</span>

                <span className="text-primary">
                  {blog.category}
                </span>
              </nav>

              <div className="mb-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {blog.category}
              </div>

              <h1 className="font-display text-4xl font-bold leading-[0.96] sm:text-6xl lg:text-7xl">
                {blog.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {blog.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>{blog.author}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <time dateTime={blog.publishedAt}>
                    {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                    </time>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </header>

          <section className="px-6 pb-16">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-card/60">
              <img
                src={blog.image}
                alt={blog.imageAlt}
                className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />
            </div>
          </section>

          <section className="px-6 pb-24">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <BlogTableOfContents
                  sections={blog.content}
                />
              </div>

              <BlogArticleContent sections={blog.content} />
            </div>
          </section>
        </article>

        {relatedBlogs.length > 0 && (
          <section className="border-t border-border/60 bg-card/20 px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  Keep reading
                </div>

                <h2 className="mt-3 font-display text-4xl font-bold">
                  Related EV charging guides
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl border border-border/70 bg-card/60 p-6 transition hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      {related.category}
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                      {related.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {related.excerpt}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-primary">
                      Read guide →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="relative overflow-hidden px-6 py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.14),transparent_50%)]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Need EV charging infrastructure?
            </div>

            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Let's make your location EV-ready.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Talk to VIZ about smart sockets, AC charging, DC charging
              and complete EV charging infrastructure.
            </p>

            <a
              href="https://wa.me/918855094432?text=Hello%20VIZ%2C%20I%20read%20your%20EV%20charging%20guide%20and%20want%20to%20discuss%20a%20charging%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:shadow-lg hover:shadow-primary/25"
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