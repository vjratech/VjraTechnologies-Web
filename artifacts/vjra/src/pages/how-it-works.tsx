
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  CreditCard,
  Bike,
  ClipboardCheck,
  Cable,
  Wrench,
  Zap,
  Smartphone,
  Wallet,
  Building2,
  ShieldCheck,
} from 'lucide-react';

import {
  ProductSiteHeader,
  ProductSiteFooter,
} from '@/components/products';

import './how-it-works.css';

const chargingSteps = [
  {
    number: '01',
    title: 'Scan the QR code',
    description:
      'Scan the QR code printed on your VIZ charging point using your phone camera.',
    image: '/how-it-works/scan-qr.png',
    alt: 'Scanning a QR code on a VIZ smart charging point',
    icon: QrCode,
  },
  {
    number: '02',
    title: 'Pay for your session',
    description:
      'Choose your charging session and pay using your preferred supported payment method.',
    image: '/how-it-works/pay-online.png',
    alt: 'Paying online for an EV charging session',
    icon: CreditCard,
  },
  {
    number: '03',
    title: 'Connect and charge',
    description:
      'Connect your vehicle to the charging point and get ready for your next journey.',
    image: '/how-it-works/connect-and-charge.png',
    alt: 'An electric scooter connected to a charging point',
    icon: Bike,
  },
];

const installationSteps = [
  {
    number: '01',
    title: 'Place your order',
    description:
      'Connect with our sales team to discuss your property, parking requirements, and charger needs.',
    image: '/how-it-works/meeting.png',
    alt: 'Planning an EV charging installation',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Site survey and planning',
    description:
      'Our on-ground team assesses the site, electrical capacity, charger locations, and installation requirements.',
    image: '/how-it-works/site-survey.png',
    alt: 'Assessing parking and electrical infrastructure for EV charging',
    icon: Building2,
  },
  {
    number: '03',
    title: 'Infrastructure setup',
    description:
      'We coordinate the required load sanction, green metering, and electrical cabling based on the site requirements.',
    image: '/how-it-works/infrastructure.png',
    alt: 'Electrical infrastructure for EV charging points',
    icon: Cable,
  },
  {
    number: '04',
    title: 'Install and commission',
    description:
      'Our team installs the chargers and carries out the necessary commissioning checks.',
    image: '/how-it-works/installation.png',
    alt: 'Installing and commissioning EV charging points',
    icon: Wrench,
  },
  {
    number: '05',
    title: 'Get ready to charge',
    description:
      'Eligible plug-and-play installations can be brought live the same day, subject to site readiness and applicable requirements.',
    image: '/how-it-works/live_chargers.png',
    alt: 'Installed VIZ smart charging points ready for use',
    icon: Zap,
  },
];

const benefits = [
  {
    icon: Smartphone,
    title: 'No app download',
    description:
      'Access the charging experience directly through your mobile browser.',
  },
  {
    icon: Wallet,
    title: 'No compulsory top-up',
    description:
      'Pay for an individual charging session without needing to preload a wallet.',
  },
  {
    icon: CreditCard,
    title: 'Flexible payments',
    description:
      'Use a supported payment method such as UPI, cards, or net banking.',
  },
  {
    icon: ShieldCheck,
    title: 'Unused amount refunds',
    description:
      'Eligible refunds for unused session amounts are returned to your bank account through the payment process.',
  },
];

function StepCard({
  step,
  compact = false,
}: {
  step: (typeof chargingSteps)[number];
  compact?: boolean;
}) {
  const Icon = step.icon;

  return (
    <article
      className={`how-step-card ${compact ? 'compact' : ''}`}
    >
      <div className="how-step-image">
        <img
          src={step.image}
          alt={step.alt}
          loading="lazy"
          decoding="async"
        />
        <span className="how-step-number">{step.number}</span>
      </div>

      <div className="how-step-copy">
        <span className="how-step-icon">
          <Icon size={20} />
        </span>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </article>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="how-page">
      <ProductSiteHeader />

      <main>
        <section className="how-hero">
          <div className="how-hero-copy">
            <span className="how-eyebrow">
              <Zap size={15} />
              VIZ SMART CHARGING
            </span>

            <h1>
              Charging made simple.
              <br />
              <span>Installation made seamless.</span>
            </h1>

            <p>
              From your first QR scan to a fully installed charging
              point, discover how VIZ makes EV charging easier for
              users, housing societies, and businesses.
            </p>

            <div className="how-hero-actions">
              <a href="#charge-with-viz" className="how-button primary">
                How to charge
                <ArrowRight size={17} />
              </a>

              <a
                href="#install-with-viz"
                className="how-button secondary"
              >
                Install VIZ chargers
              </a>
            </div>

            <div className="how-hero-highlights">
              <span>
                <CheckCircle2 size={16} />
                No app download
              </span>
              <span>
                <CheckCircle2 size={16} />
                No compulsory top-up
              </span>
            </div>
          </div>

          <div className="how-hero-visual">
            <img
              src="/gallery/Residential_Himgauri_1.jpg"
              alt="A VIZ charging point in a residential parking area"
            /> 

            <div className="how-hero-floating-card">
              <span className="how-floating-icon">
                <QrCode size={22} />
              </span>
              <div>
                <strong>Scan. Pay. Charge.</strong>
                <span>Charging starts with a QR scan.</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="charge-with-viz"
          className="how-section how-charge-section"
        >
          <div className="how-section-heading">
            <span className="how-eyebrow">FOR EV USERS</span>
            <h2>
              How to charge with <span>VIZ?</span>
            </h2>
            <p>
              No new app to install. No compulsory wallet balance
              to maintain. Just scan, pay, and charge.
            </p>
          </div>

          <div className="how-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="how-benefit-card"
                  key={benefit.title}
                >
                  <span className="how-benefit-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>

          <div className="how-steps-grid user-steps">
            {chargingSteps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>

          <div className="how-payment-note">
            <span className="how-payment-note-icon">
              <Wallet size={23} />
            </span>
            <div>
              <h3>Pay per session. Keep your money moving.</h3>
              <p>
                Start an individual session for as little as ₹20,
                where supported by the session options. If an
                eligible session ends with an unused amount, the
                refund is processed directly to your bank account
                rather than remaining as a compulsory wallet balance.
              </p>
            </div>
          </div>
        </section>

        <section
          id="install-with-viz"
          className="how-section how-install-section"
        >
          <div className="how-section-heading">
            <span className="how-eyebrow">FOR SOCIETIES & BUSINESSES</span>
            <h2>
              How to install <span>VIZ chargers?</span>
            </h2>
            <p>
              We help take your property from initial planning to
              installed charging points and commissioning.
            </p>
          </div>

          <div className="how-install-banner">
            <img
              src="/gallery/Commercial_Villa_1.jpg"
              alt="VIZ charging points installed in a parking facility"
              loading="lazy"
            />
            <div className="how-install-banner-copy">
              <span>END-TO-END CHARGING SETUP</span>
              <h3>One coordinated installation journey.</h3>
              <p>
                Site assessment, electrical infrastructure,
                charger installation, and commissioning coordinated
                around your property's requirements.
              </p>
            </div>
          </div>

          <div className="how-steps-grid installation-steps">
            {installationSteps.map((step) => (
              <StepCard
                key={step.number}
                step={step}
                compact
              />
            ))}
          </div>

          <div className="how-go-live">
            <div className="how-go-live-icon">
              <Zap size={26} />
            </div>

            <div className="how-go-live-copy">
              <span>READY FOR THE ROAD</span>
              <h3>Installed. Commissioned. Ready to charge.</h3>
              <p>
                Same-day go-live is available for eligible
                plug-and-play installations when the site and
                required infrastructure are ready.
              </p>
            </div>

            <a
              className="how-button primary"
              href="/contact"
            >
              Request an installation
              <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="how-final-cta">
          <span className="how-eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Let’s make your space EV-ready.</h2>
          <p>
            Talk to the VIZ team about charging points for your
            residential society, workplace, or commercial property.
          </p>
          <a href="/contact" className="how-button primary">
            Talk to our team
            <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <ProductSiteFooter />
    </div>
  );
}
