
import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  Zap,
} from 'lucide-react';
import SEO from '@/components/seo';
import {
  ProductSiteFooter,
  ProductSiteHeader,
} from '@/components/products';
import { Link } from '@/components/site-link';

type ContactTheme = 'light' | 'dark';

const productOptions = [
  'Charging sockets',
  'AC chargers',
  'DC chargers',
  'Charging support',
  'Other query',
];

type FormFields = {
  name: string;
  phone: string;
  email: string;
  product: string;
  city: string;
};

const initialForm: FormFields = {
  name: '',
  phone: '',
  email: '',
  product: '',
  city: '',
};

export default function Contact() {
  const [theme, setTheme] = useState<ContactTheme>('light');
  const [form, setForm] = useState<FormFields>(initialForm);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof FormFields>(
    key: K,
    value: FormFields[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const message = [
    "Hello VIZ Smart Charging,",
    "",
    "I would like to enquire about your services.",
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Preferred Service: ${form.product}`,
    `City: ${form.city}`,
  ].join("\n");

  const whatsappUrl =
    `https://wa.me/918855094432?text=${encodeURIComponent(message)}`;

  const whatsappWindow = window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

  if (whatsappWindow) {
    setSuccess(true);
    setStatus(
      "WhatsApp opened. Please review your enquiry and press Send in WhatsApp."
    );
  } else {
    setSuccess(false);
    setStatus(
      "WhatsApp could not open automatically. Please allow pop-ups or contact us at +91 88550 94432."
    );
  }
}

  return (
    <div
      className="contact-page min-h-screen bg-background text-foreground"
      data-theme={theme}
    >
      <SEO
        title="Contact VIZ Smart Charging | Sales & Support"
        description="Contact VJRA Technologies LLP for EV charging sockets, AC and DC chargers, charging infrastructure, sales and technical support."
        canonical="https://eviz.in/contact"
      />

      <ProductSiteHeader />

      <div className="border-b border-border/70 bg-background/90 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            CONTACT VIZ
          </span>

          <button
            type="button"
            onClick={() =>
              setTheme((current) =>
                current === 'light' ? 'dark' : 'light',
              )
            }
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium transition hover:border-primary hover:text-primary"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(0,190,205,0.13),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(0,190,205,0.07),transparent_32%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Let’s connect
              </div>

              <h1 className="mt-7 max-w-2xl font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Let’s make your location{' '}
                <span className="text-gradient-cyan">
                  EV-ready.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Tell us what you’re planning. From smart charging
                sockets to AC and DC charging infrastructure, our
                team will help you explore the right solution.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Send an enquiry <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                Explore products
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Charging solutions
                </span>
                <span className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary" />
                  Dedicated support
                </span>
              </div>
            </div>

            {/* Replace this placeholder with your sales-team image later. */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-8 text-center sm:min-h-[440px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,190,205,0.13),transparent_52%)]" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <Headphones className="h-10 w-10" />
                </div>

                <p className="relative mt-6 font-display text-2xl font-semibold">
                  We’re here to help.
                </p>
                <p className="relative mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  Your sales-team representative image will go here.
                </p>

                <div className="relative mt-8 flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Real people. Practical solutions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales, support and office */}
        <section className="border-y border-border/70 bg-card/40 px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Reach the right team
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                How can we help you?
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Contact sales for product enquiries and projects, or
                reach our support team for charging-related assistance.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <article className="rounded-2xl border border-border bg-background p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Sales enquiries
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  Talk to sales
                </h3>
                <a
                  href="tel:+919545092266"
                  className="mt-4 block text-lg font-semibold transition hover:text-primary"
                >
                  +91 95450 92266
                </a>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  09:00 AM – 06:00 PM
                </p>
                <a
                  href="mailto:sales@vjratechnologies.com"
                  className="mt-4 inline-flex items-center gap-2 break-all text-sm text-muted-foreground transition hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  sales@vjratechnologies.com
                </a>
              </article>

              <article className="rounded-2xl border border-border bg-background p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Headphones className="h-5 w-5" />
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Customer support
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  We’re available 24×7
                </h3>
                <a
                  href="tel:+918855094432"
                  className="mt-4 block text-lg font-semibold transition hover:text-primary"
                >
                  +91 88550 94432
                </a>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  24×7 support
                </p>
                <a
                  href="mailto:support@vjratechnologies.com"
                  className="mt-4 inline-flex items-center gap-2 break-all text-sm text-muted-foreground transition hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  support@vjratechnologies.com
                </a>
              </article>

              <article className="rounded-2xl border border-border bg-background p-6 sm:p-7 md:col-span-2 xl:col-span-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Corporate office
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  Visit VJRA
                </h3>
                <p className="mt-4 leading-7 text-muted-foreground">
                  <strong className="text-foreground">
                    VJRA Technologies LLP
                  </strong>
                  <br />
                  204, Janki Corner, Sadashiv Peth,
                  <br />
                  Pune – 411030, Maharashtra, India
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Vjra+Technologies+LLP%2C+204%2C+Janki+Corner%2C+Sadashiv+Peth%2C+Pune+411030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Get directions <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact-form" className="scroll-mt-8 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Start a conversation
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
                Tell us what you need.
              </h2>
              <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
                Share a few details about your requirement. Our team
                will use this information to understand your enquiry
                and get back to you.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">What happens next?</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      You'll be redirected to WhatsApp with your enquiry details
prefilled. Review the message and press Send to contact our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-5 sm:p-8 lg:p-10"
            >
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold">
                  Send an enquiry
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fields marked * are required.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                    Full name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">
                    Phone number *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                    Email address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-product" className="mb-2 block text-sm font-medium">
                    Preferred product / service *
                  </label>
                  <select
                    id="contact-product"
                    name="product"
                    required
                    value={form.product}
                    onChange={(e) => updateField('product', e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>
                      Select a product or service
                    </option>
                    {productOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-city" className="mb-2 block text-sm font-medium">
                    City *
                  </label>
                  <input
                    id="contact-city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    maxLength={100}
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Your city"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-6 rounded-xl border p-4 text-sm leading-6 ${
                    success
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border-destructive/30 bg-destructive/10 text-destructive'
                  }`}
                >
                  {status}
                </div>
              )}

              <button
                type="submit"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                    SEND ON WHATSAPP
                    <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Your details will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </section>
      </main>

      <ProductSiteFooter />
    </div>
  );
}
