import { ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'wouter';
import type { BlogArticle } from '@/data/blogs';

export function BlogCard({
  blog,
  featured = false,
}: {
  blog: BlogArticle;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-border/70 bg-card/70 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? 'lg:grid lg:grid-cols-2' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-card via-background to-primary/5 ${
          featured ? 'min-h-[280px] lg:min-h-full' : 'aspect-[16/9]'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,240,255,0.12),transparent_55%)]" />

        <img
          src={blog.image}
          alt={blog.imageAlt}
          className="relative h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />

        <div className="absolute left-5 top-5 rounded-full border border-primary/25 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur">
          {blog.category}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>{blog.publishedAt}</span>

            <span className="h-1 w-1 rounded-full bg-border" />

            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {blog.readingTime}
            </span>
          </div>

          <h2
            className={`font-display font-bold leading-tight ${
              featured
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-2xl'
            }`}
          >
            {blog.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-7">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/50 px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogArticleContent({
  sections,
}: {
  sections: BlogArticle['content'];
}) {
  return (
    <div className="prose max-w-none">
      {sections.map((section, index) => (
        <section key={`${section.heading ?? 'section'}-${index}`} className="mb-12">
          {section.heading && (
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {section.heading}
            </h2>
          )}

          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {section.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="flex items-start gap-3 text-base leading-7 text-muted-foreground sm:text-lg"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function BlogTableOfContents({
  sections,
}: {
  sections: BlogArticle['content'];
}) {
  const headings = sections.filter((section) => section.heading);

  return (
    <aside className="rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        In this guide
      </div>

      <div className="mt-4 space-y-2">
        {headings.map((section, index) => (
          <div
            key={`${section.heading}-${index}`}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {section.heading}
          </div>
        ))}
      </div>
    </aside>
  );
}