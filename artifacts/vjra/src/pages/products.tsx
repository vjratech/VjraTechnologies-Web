import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { products } from '@/data/products';
import { ProductCard, ProductSiteFooter, ProductSiteHeader } from '@/components/products';

export default function Products() {
  const chargingPoints = products.filter((product) => product.category === 'EV Charging Points');
  const acChargers = products.filter((product) => product.category === 'AC Chargers');

  return (
    <div className="min-h-screen bg-background">
      <ProductSiteHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(0,240,255,0.14),transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition hover:text-primary">← Back to platform</Link>
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">Our Products</div>
              <h1 className="font-display text-5xl font-bold leading-[0.94] md:text-8xl">EV Charging <span className="text-gradient-cyan">Solutions</span></h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Smart charging hardware built for connected mobility.</p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl space-y-20">
            <ProductFamily title="EV Charging Points" subtitle="1.3 kW – 10 kW" description="Smart AC charging points designed for homes, workplaces, apartments and public charging locations." products={chargingPoints} />
            <ProductFamily title="AC Chargers" subtitle="7.3 kW – 22 kW" description="Higher-power AC charging solutions for residential, commercial and destination charging." products={acChargers} />
          </div>
        </section>
      </main>
      <ProductSiteFooter />
    </div>
  );
}

function ProductFamily({ title, subtitle, description, products }: { title: string; subtitle: string; description: string; products: typeof import('@/data/products').products }) {
  return (
    <section>
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Product family</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h2>
          <div className="mt-3 font-mono text-sm text-primary">{subtitle}</div>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className={`grid gap-6 ${products.length === 2 ? 'lg:grid-cols-2' : products.length >= 4 ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {/* <div className="mt-6 flex justify-end">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">Browse connected configurations <ArrowRight className="h-4 w-4" /></Link>
      </div> */}
    </section>
  );
}