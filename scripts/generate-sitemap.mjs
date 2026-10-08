import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const productsPath = path.join(
  root,
  'src',
  'data',
  'products.ts'
);

const productsSource = fs.readFileSync(
  productsPath,
  'utf8'
);

const blogsPath = path.join(
  root,
  'src',
  'data',
  'blogs.ts'
);

const sitemapPath = path.join(
  root,
  'public',
  'sitemap.xml'
);

const blogsSource = fs.readFileSync(
  blogsPath,
  'utf8'
);

const blogRegex =
  /slug:\s*'([^']+)'[\s\S]*?publishedAt:\s*'([^']+)'[\s\S]*?(?:updatedAt:\s*'([^']+)')?/g;

const urls = [
  {
    loc: 'https://eviz.in/',
  },
  {
    loc: 'https://eviz.in/products',
  },
  {
    loc: 'https://eviz.in/why-VIZ',
  },
  {
    loc: 'https://eviz.in/blog',
  },
];

for (const match of blogsSource.matchAll(blogRegex)) {
  const slug = match[1];
  const publishedAt = match[2];
  const updatedAt = match[3];

  urls.push({
    loc: `https://eviz.in/blog/${slug}`,
    lastmod: updatedAt || publishedAt,
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(
  sitemapPath,
  xml,
  'utf8'
);

console.log(
  `Generated sitemap with ${urls.length} URLs.`
);