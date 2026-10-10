import type { AnchorHTMLAttributes } from 'react';

type SiteLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  href: string;
};

export function Link({
  href,
  target,
  rel,
  ...props
}: SiteLinkProps) {
  const isInPageLink = href.startsWith('#');

  const isAppLink = /^(tel:|mailto:|javascript:)/i.test(href);

  const shouldOpenNewTab =
    href.trim() !== '' &&
    !isInPageLink &&
    !isAppLink &&
    target !== '_self';

  return (
    <a
      {...props}
      href={href}
      target={shouldOpenNewTab ? '_blank' : target}
      rel={
        shouldOpenNewTab
          ? 'noopener noreferrer'
          : rel
      }
    />
  );
}