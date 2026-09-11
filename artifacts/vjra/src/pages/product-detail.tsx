import { useEffect, useState } from 'react';
import { Download} from 'lucide-react';
import { Link, useParams } from 'wouter';
import { getProduct, products, type ProductVariant } from '@/data/products';
import { ApplicationSection, FeatureHighlights, ProductConfigurator, ProductFaq, ProductGallery, ProductSiteFooter, ProductSiteHeader, RelatedProducts, SpecificationTable, VariantComparison } from '@/components/products';
import NotFound from '@/pages/not-found';
import brochurePdf from '@/assets/Brochure_VjraTechnologies.pdf';

export default function ProductDetail() {
  const params = useParams<{ category: string; slug: string }>();
  const product = getProduct(params.category, params.slug);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product?.variants[0]);

  useEffect(() => {
    setSelectedVariant(product?.variants[0]);
  }, [product]);

  if (!product) return <NotFound />;

  const related = products.filter((candidate) => candidate.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <ProductSiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
          <nav className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <Link href="/products" className="transition hover:text-primary">Products</Link><span>/</span><span>{product.category}</span><span>/</span><span className="text-primary">{product.cardName}</span>
          </nav>
        </div>

        <section className="px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 md:pb-24 md:pt-14">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <ProductGallery product={product} selectedVariant={selectedVariant} />
            <div className="space-y-7 lg:sticky lg:top-8">
              <div>
                <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary">{product.category}</div>
                <h1 className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-6xl">{product.name}</h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">{product.description}</p>
              </div>
              <ProductConfigurator product={product} onVariantChange={setSelectedVariant} />
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 px-6 py-14">
          <div className="mx-auto max-w-7xl"><FeatureHighlights product={product} /></div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Product overview</div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Built for the way charging happens.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{product.overview}</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-3"><img src={product.overviewImage ?? product.images[1] ?? product.image} alt={`${product.name} application view`} className="h-[280px] w-full rounded-2xl object-cover sm:h-[340px] md:h-[460px]" /></div>
          </div>
        </section>

        <section className="bg-card/20 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Technical specifications" title="The details that matter." description="Lets get technical here." />
            <SpecificationTable product={product} />
          </div>
        </section>

        {product.variants.length > 1 && (
          <section className="px-4 py-16 sm:px-6 sm:py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionHeading eyebrow="Variant comparison" title="Choose the right configuration." description="Lets not get confused in product selection. Refer below table for all variants at one place." />
              <VariantComparison product={product} selectedId={selectedVariant?.id ?? ''} onSelect={setSelectedVariant} />
            </div>
          </section>
        )}

        <section className="bg-card/20 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Applications" title="Designed for connected mobility." description="Use the configuration that matches your charging environment." />
            <ApplicationSection product={product} />
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="Frequently asked questions" title="Clear answers before you configure." />
            <ProductFaq product={product} />
          </div>
        </section>

        <section className="bg-card/20 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Related products" title="Keep building your setup." />
            <RelatedProducts products={related} />
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.14),transparent_50%)]" />
          <div className="relative mx-auto max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Next step</div>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">Ready to build your charging setup?</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Tell us about your site, vehicles and charging goals. We’ll help you choose the right configuration.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={brochurePdf} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:shadow-lg hover:shadow-primary/30"> Download Brochure <Download /> </a></div>
          </div>
        </section>
      </main>
      <ProductSiteFooter />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-10 max-w-3xl"><div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</div><h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">{title}</h2>{description && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>}</div>;
}