
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link as WouterLink } from 'wouter';

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function Link({
  href,
  children,
  target,
  rel,
  ...props
}: SiteLinkProps) {
  const shouldOpenNewTab =
    href !== '' &&
    !href.startsWith('#') &&
    !href.startsWith('tel:') &&
    !href.startsWith('mailto:') &&
    target !== '_self';

  return (
    <WouterLink
      href={href}
      target={shouldOpenNewTab ? '_blank' : target}
      rel={
        shouldOpenNewTab
          ? 'noopener noreferrer'
          : rel
      }
      {...props}
    >
      {children}
    </WouterLink>
  );
}
