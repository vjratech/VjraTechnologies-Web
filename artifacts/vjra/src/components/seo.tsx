import { useEffect } from 'react';

export type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  articleSection?: string;
  tags?: string[];
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
};

const SITE_URL = 'https://eviz.in';

const DEFAULT_IMAGE = `${SITE_URL}/blog/ev-charging-station-india.png`;

function setMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

function removeStructuredData(id: string) {
  const existing = document.head.querySelector(
    `script[data-seo-id="${id}"]`
  );

  existing?.remove();
}

function addStructuredData(
  id: string,
  data: Record<string, unknown>
) {
  removeStructuredData(id);

  const script = document.createElement('script');

  script.type = 'application/ld+json';
  script.setAttribute('data-seo-id', id);
  script.textContent = JSON.stringify(data);

  document.head.appendChild(script);
}

export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedAt,
  updatedAt,
  author,
  articleSection,
  tags = [],
  breadcrumbs = [],
}: SEOProps) {
  useEffect(() => {
    const canonicalUrl = canonical || window.location.href;
    const absoluteImage = image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`;

    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:site_name', 'VIZ Smart Charging');

    setMeta(
      'name',
      'twitter:card',
      'summary_large_image'
    );

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    setCanonical(canonicalUrl);

    if (type === 'article') {
      if (publishedAt) {
        setMeta(
          'property',
          'article:published_time',
          new Date(publishedAt).toISOString()
        );
      }

      if (updatedAt) {
        setMeta(
          'property',
          'article:modified_time',
          new Date(updatedAt).toISOString()
        );
      }

      if (author) {
        setMeta(
          'property',
          'article:author',
          author
        );
      }

      if (articleSection) {
        setMeta(
          'property',
          'article:section',
          articleSection
        );
      }

      tags.forEach((tag, index) => {
        setMeta(
          'property',
          `article:tag-${index}`,
          tag
        );
      });
    }

    /*
     * Article structured data
     */
    if (type === 'article') {
      addStructuredData('article', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: [absoluteImage],
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        author: {
          '@type': 'Organization',
          name: author || 'VIZ Smart Charging',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'VJRA Technologies LLP',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo-removebg-preview.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        articleSection,
        keywords: tags.join(', '),
      });
    } else {
      removeStructuredData('article');
    }

    /*
     * Breadcrumb structured data
     */
    if (breadcrumbs.length > 0) {
      addStructuredData('breadcrumbs', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map(
          (breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url,
          })
        ),
      });
    } else {
      removeStructuredData('breadcrumbs');
    }

    return () => {
      removeStructuredData('article');
      removeStructuredData('breadcrumbs');
    };
  }, [
    title,
    description,
    canonical,
    image,
    type,
    publishedAt,
    updatedAt,
    author,
    articleSection,
    tags,
    breadcrumbs,
  ]);

  return null;
}