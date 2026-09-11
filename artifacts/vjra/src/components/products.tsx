import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ExternalLink, Factory, Home, PlugZap, RefreshCw, ShieldCheck, Wifi, Zap } from 'lucide-react';
import { Link } from 'wouter';
import type { Product, ProductVariant } from '@/data/products';
import { productHref } from '@/data/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export function ProductSiteHeader() {
  return (
    <header className="relative z-40 border-b border-border/60 bg-background/80 px-4 py-4 sm:px-6 sm:py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Vjra Technologies home">
          <img src="/logo-removebg-preview.png" alt="Vjra Technologies" className="h-10 w-auto object-contain" />
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">VJRA TECHNOLOGIES</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">Platform</Link>
          <Link href="/products" className="text-primary">Products</Link>
          <a href="mailto:sales@vjratechnologies.com" className="hidden transition-colors hover:text-primary sm:block">Talk to sales</a>
        </nav>
      </div>
    </header>
  );
}

export function ProductSiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-display text-2xl font-bold text-gradient-cyan">Vjra Technologies LLP</div>
          <p className="mt-1 text-sm text-muted-foreground">The intelligence behind energy</p>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">© 2026 VJRA TECHNOLOGIES LLP</div>
      </div>
    </footer>
  );
}

function placeholderPrice(price?: number) {
  return price ? `₹${price.toLocaleString('en-IN')}` : '₹XX,XXX';
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-3xl border border-border/70 bg-card/70 ${compact ? '' : 'h-full'}`}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-card via-background to-primary/5 ${compact ? 'h-44' : 'h-64'}`}>
        <img src={product.image} alt={`${product.name} product visual`} className="h-full w-full object-contain p-8 opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-primary/25 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur">
          {product.category}
        </div>
        <div className="absolute bottom-5 left-5 font-display text-4xl font-bold">{product.subtitle}</div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <h3 className="font-display text-2xl font-bold">{product.cardName}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
        <ul className="grid gap-2 text-sm text-muted-foreground">
          {product.features.slice(0, compact ? 3 : 5).map((feature) => (
            <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>
          ))}
        </ul>
        <Button asChild variant="outline" className="w-full justify-between">
          <Link href={productHref(product)}>Explore Product <ArrowRight /></Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function ProductGallery({ product, selectedVariant }: { product: Product; selectedVariant?: ProductVariant }) {
  const images = selectedVariant?.images?.length ? selectedVariant.images : product.images;
  const [activeImage, setActiveImage] = useState(images[0]);
  useEffect(() => {
  setActiveImage(images[0]);
}, [images]);
  const currentImages = images.includes(activeImage) ? images : [images[0]];

  return (
    <div className="space-y-4">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-background to-primary/5 p-4 sm:aspect-[16/11] sm:p-5 md:aspect-auto md:min-h-[520px] md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,240,255,0.12),transparent_55%)]" />
        <img key={activeImage} src={activeImage} alt={`${product.name} gallery view`} className="relative h-full max-h-[220px] w-auto max-w-[88%] object-contain transition-opacity duration-300 sm:max-h-[280px] sm:max-w-[90%] md:h-auto md:max-h-[460px] md:w-full md:max-w-none"/>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
          <RefreshCw className="h-3 w-3 text-primary" /> Product imagery
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {currentImages.map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(image)} className={`h-14 w-[72px] shrink-0 overflow-hidden rounded-xl border transition sm:h-16 sm:w-20 md:h-20 md:w-24 ${ activeImage === image
    ? 'border-primary ring-2 ring-primary/20' : 'border-border/70 opacity-70 hover:opacity-100'}`}>
            <img src={image} alt="" className="h-full w-full  object-contain bg-background/40 p-1.5" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductConfigurator({ product, onVariantChange }: { product: Product; onVariantChange: (variant: ProductVariant) => void }) {
  const [selectedId, setSelectedId] = useState(product.variants[0].id);
  const selected = product.variants.find((variant) => variant.id === selectedId) ?? product.variants[0];
  const buyMessage = `Hello Vjra, I’m interested in purchasing ${product.name}${selected.name ? `, ${selected.name}` : ''}.`;

  const quoteMessage = `Hello Vjra, I’d like a quote for ${product.name}${selected.name ? `, ${selected.name}` : ''}.`;

  const buyWhatsAppUrl = `https://wa.me/918855094432?text=${encodeURIComponent(buyMessage)}`;

  const quoteWhatsAppUrl = `https://wa.me/918855094432?text=${encodeURIComponent(quoteMessage)}`;
  const choose = (variant: ProductVariant) => {
    setSelectedId(variant.id);
    onVariantChange(variant);
  };
  const selectableCurrents = [...new Set(product.variants.map((variant) => variant.current).filter(Boolean))] as string[];
  const selectableConnectivity = [...new Set(product.variants.map((variant) => variant.connectivity).filter(Boolean))] as string[];

  return (
    <div className="space-y-5 rounded-3xl border border-border/70 bg-card/60 p-4 sm:space-y-6 sm:p-6 md:p-8">
      <div className="flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Selected configuration</div>
          <h2 className="mt-2 font-display text-2xl font-bold">{selected.name}</h2>
        </div>
        <div className="w-fit max-w-full rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] text-primary sm:text-xs">{selected.sku}</div>
      </div>

      {selectableCurrents.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">Current</legend>
          <div className="grid grid-cols-2 gap-3">
            {selectableCurrents.map((current) => {
              const variant = product.variants.find((item) => item.current === current && item.connectivity === selected.connectivity) ?? product.variants.find((item) => item.current === current);
              return <button key={current} type="button" onClick={() => variant && choose(variant)} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${selected.current === current ? 'border-primary bg-primary/10 text-primary' : 'border-border/70 text-muted-foreground hover:border-primary/50'}`}>{current}</button>;
            })}
          </div>
        </fieldset>
      )}

      {selectableConnectivity.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">Connectivity</legend>
          <div className="grid grid-cols-2 gap-3">
            {selectableConnectivity.map((connectivity) => {
              const variant = product.variants.find((item) => item.connectivity === connectivity && item.current === selected.current) ?? product.variants.find((item) => item.connectivity === connectivity);
              return <button key={connectivity} type="button" onClick={() => variant && choose(variant)} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${selected.connectivity === connectivity ? 'border-primary bg-primary/10 text-primary' : 'border-border/70 text-muted-foreground hover:border-primary/50'}`}><Wifi className="mr-2 inline-block h-4 w-4" />{connectivity}</button>;
            })}
          </div>
        </fieldset>
      )}

      {product.variants.some((variant) => variant.configuration) && (
        <fieldset>
          <legend className="mb-3 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">Configuration</legend>
          <div className="relative">
            <select value={selected.id} onChange={(event) => choose(product.variants.find((variant) => variant.id === event.target.value) ?? selected)} className="w-full appearance-none rounded-xl border border-border/70 bg-background px-4 py-3 pr-10 text-sm outline-none focus:border-primary">
              {product.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.name}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-muted-foreground" />
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-4 border-t border-border/60 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Indicative price</div>
          <div className="mt-1 font-display text-3xl font-bold text-primary">{placeholderPrice(selected.price)}</div>
          <div className="mt-1 text-xs text-muted-foreground">Final pricing supplied on request</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Power</div>
          <div className="mt-1 font-mono text-sm">{selected.power ?? 'Configuration dependent'}</div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button asChild size="lg">
          <a
            href={buyWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now <ArrowRight />
          </a>
        </Button>

        <Button asChild size="lg" variant="outline">
          <a
            href={quoteWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a Quote <ExternalLink />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function FeatureHighlights({ product }: { product: Product }) {
  const icons = [Zap, PlugZap, Wifi, ShieldCheck, Factory];
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-5">
      {product.features.slice(0, 5).map((feature, index) => {
        const Icon = icons[index];
        return <div key={feature} className="bg-card/80 p-5"><Icon className="mb-5 h-5 w-5 text-primary" /><div className="text-sm font-medium leading-relaxed">{feature}</div></div>;
      })}
    </div>
  );
}

export function SpecificationTable({ product }: { product: Product }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {Object.entries(product.specifications).map(([group, values]) => (
        <div key={group} className="overflow-hidden rounded-2xl border border-border/70">
          <div className="border-b border-border/70 bg-card/80 px-5 py-4 font-display text-lg font-bold">{group}</div>
          <dl className="divide-y divide-border/60">
            {Object.entries(values).map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 px-5 py-4 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="text-right">{value}</dd></div>)}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function VariantComparison({
  product,
  selectedId,
  onSelect,
}: {
  product: Product;
  selectedId: string;
  onSelect: (variant: ProductVariant) => void;
}) {
  return (
    <>
      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              selectedId === variant.id
                ? 'border-primary bg-primary/10'
                : 'border-border/70 bg-card/50 hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{variant.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {variant.sku}
                </div>
              </div>

              <div className="shrink-0 font-display text-lg font-bold text-primary">
                {placeholderPrice(variant.price)}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-3 text-xs">
              <div>
                <div className="text-muted-foreground">Current</div>
                <div className="mt-1">{variant.current ?? '—'}</div>
              </div>

              <div>
                <div className="text-muted-foreground">Power</div>
                <div className="mt-1">{variant.power ?? '—'}</div>
              </div>

              <div className="col-span-2">
                <div className="text-muted-foreground">Connectivity</div>
                <div className="mt-1">{variant.connectivity ?? '—'}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border/70 md:block">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-card/80 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Configuration</th>
              <th className="px-5 py-4">Current</th>
              <th className="px-5 py-4">Connectivity</th>
              <th className="px-5 py-4">Power</th>
              <th className="px-5 py-4">Price</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {product.variants.map((variant) => (
              <tr
                key={variant.id}
                className={`cursor-pointer transition hover:bg-primary/5 ${
                  selectedId === variant.id ? 'bg-primary/10' : ''
                }`}
                onClick={() => onSelect(variant)}
              >
                <td className="px-5 py-4 font-medium">{variant.name}</td>
                <td className="px-5 py-4 text-muted-foreground">
                  {variant.current ?? '—'}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {variant.connectivity ?? '—'}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {variant.power ?? '—'}
                </td>
                <td className="px-5 py-4 text-primary">
                  {placeholderPrice(variant.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function ApplicationSection({ product }: { product: Product }) {
  const icons = [PlugZap, Home, Factory, ShieldCheck, Wifi, Zap];
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{product.applications.map((application, index) => { const Icon = icons[index % icons.length]; return <div key={application} className="flex items-center gap-4 rounded-xl border border-border/70 bg-card/50 p-4"><div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Icon className="h-5 w-5" /></div><span className="text-sm">{application}</span></div>; })}</div>;
}

export function ProductFaq({ product }: { product: Product }) {
  return <Accordion type="single" collapsible className="rounded-2xl border border-border/70 px-5">{product.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger className="text-base">{faq.question}</AccordionTrigger><AccordionContent className="max-w-3xl text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>;
}

export function RelatedProducts({ products }: { products: Product[] }) {
  return <div className="grid gap-6 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} compact />)}</div>;
}