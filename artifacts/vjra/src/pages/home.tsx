import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Mail } from 'lucide-react';
import { ParticleField } from '@/components/ParticleField';
import { EnergyFlow } from '@/components/EnergyFlow';
import { PowerChart } from '@/components/PowerChart';
import { NetworkMap } from '@/components/NetworkMap';
import { TechStack } from '@/components/TechStack';
import { ProductShowcase } from '@/components/ProductShowcase';
import heroChargerImg from '@/assets/hero-charger.jpg';
import circuitDetailImg from '@/assets/circuit-detail.jpg';
import smartGridImg from '@/assets/smart-grid.jpg';
import evChargingSceneImg from '@/assets/ev-charging-scene.jpg';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Particle background */}
      <ParticleField />



      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: useTransform(scrollYProgress, [0, 0.3], [0, 150]),
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
          <img
            src={heroChargerImg}
            alt="VJRA EV Charger"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        {/* Energy flow overlay */}
        <div className="absolute inset-0 z-10 opacity-30">
          <EnergyFlow />
        </div>

        {/* Hero content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">

                  <div className="flex items-center gap-3">
  <img
    src="/logo-removebg-preview.png"
    alt="VJRA Technologies"
   className="h-16 md:h-20 w-auto object-contain relative z-30"
  />

</div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-6 py-2 rounded-full glass-panel mb-8"
          >
          
            <span className="text-sm font-mono text-primary">Energy Intelligence Platform</span>
          </motion.div>

          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-gradient-cyan">The Intelligence</span>
            <br />
            <span className="text-foreground">Behind Energy</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We build the connected infrastructure powering the future of electric mobility —
            from power electronics to AI-driven energy management.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              data-testid="button-request-demo"
            >
              Request Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="group px-8 py-4 glass-panel rounded-xl font-semibold flex items-center gap-2 hover:border-primary/50 transition-all duration-300"
              data-testid="button-watch-video"
            >
              <Play className="w-5 h-5" />
              Watch Platform Overview
            </button>
          </motion.div>

          {/* Live stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '100+ kW', label: 'Power Deployed', suffix: 'h' },
              { value: '1k+', label: 'Charging Sessions', suffix: '/day' },
              { value: '99.7%', label: 'Platform Uptime', suffix: '' },
              { value: '47 ms', label: 'Response Time', suffix: 'avg' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="glass-panel p-6 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0, 240, 255, 0.3)' }}
              >
                <div className="font-display text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                {stat.suffix && (
                  <div className="text-xs font-mono text-primary/60 mt-1">{stat.suffix}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Technology Stack Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="text-xs font-mono text-secondary">Full-Stack Platform</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Hardware to <span className="text-gradient-cyan">Cloud to AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every layer of the energy ecosystem, engineered in-house for seamless integration
            </p>
          </motion.div>

          <TechStack />
        </div>

        {/* Floating circuit detail */}
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${circuitDetailImg})`,
            backgroundSize: 'cover',
            y: useTransform(scrollYProgress, [0.2, 0.4], [100, -100]),
          }}
        />
      </section>

      {/* Product Showcase Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-mono text-primary">Hardware Portfolio</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Precision <span className="text-gradient-cyan">Engineering</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              EV charging stations designed for reliability, performance, and intelligence
            </p>
          </motion.div>

          <ProductShowcase />
        </div>

        {/* Background accent */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Platform Intelligence Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-mono text-primary">Live Analytics</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Real-Time <span className="text-gradient-cyan">Energy Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered insights that optimize energy flow, predict demand, and maximize uptime
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Power Analytics */}
            <motion.div
              className="glass-panel-strong p-8 rounded-3xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold">Power Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">24h energy flow</p>
                </div>
                <div className="glass-panel px-4 py-2 rounded-lg">
                  <span className="text-xs font-mono text-primary">LIVE</span>
                </div>
              </div>
              <div className="h-64">
                <PowerChart />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">Peak Demand</div>
                  <div className="font-display text-xl font-bold text-primary">89.2 kW</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">Avg Efficiency</div>
                  <div className="font-display text-xl font-bold text-secondary">96.8%</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">Active Stations</div>
                  <div className="font-display text-xl font-bold text-foreground">247</div>
                </div>
              </div>
            </motion.div>

            {/* Network Map */}
            <motion.div
              className="glass-panel-strong p-8 rounded-3xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold">Charger Status</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">Connected infrastructure</p>
                </div>
                <div className="glass-panel px-4 py-2 rounded-lg">
                  <span className="text-xs font-mono text-green-400">ONLINE</span>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <NetworkMap />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">Active</div>
                    <div className="font-display font-bold">178</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">Charging</div>
                    <div className="font-display font-bold">42</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">Idle</div>
                    <div className="font-display font-bold">27</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Grid Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="text-xs font-mono text-secondary">Infrastructure</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Connected to the <span className="text-gradient-cyan">Future Grid</span> via <span className="text-gradient-green">Green Meters</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our platform integrates seamlessly with utility infrastructure, providing fixed per unit charges via green meters,
              demand/ load balancing, and renewable energy integration at scale.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Fix per unit charges via Green Meters',
                'Dynamic load balancing across charging networks',
                'Renewable energy source prioritization',
                'ISO 15118 Plug & Charge compliance',
                'State DISCOM handling support',
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-panel-strong p-4 rounded-3xl">
              <img
                src={smartGridImg}
                alt="Smart Grid Infrastructure"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 glass-panel p-6 rounded-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-xs font-mono text-muted-foreground mb-1">Grid Response</div>
              <div className="font-display text-3xl font-bold text-primary">34 ms</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Use Cases Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-mono text-primary">Made for India in India</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Real-World <span className="text-gradient-cyan">Deployment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From commercial fleets to residential communities, VJRA powers diverse energy ecosystems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Housing Societies',
                desc: 'Optimize charging schedules, minimize downtime, reduce operational costs with AI-driven members management',
                image: evChargingSceneImg,
                stat: '100+ vehicles filling daily',
              },
              {
                title: 'Commercial Properties',
                desc: 'Deploy scalable infrastructure with payment processing, user authentication, and remote diagnostics',
                image: heroChargerImg,
                stat: '10+ properties EV ready',
              },
              {
                title: 'Public Charging Infrastructure',
                desc: 'Smart load balancing ensures fair distribution, while energy analytics reduce peak demand charges',
                image: circuitDetailImg,
                stat: '10+ installations',
              },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                className="glass-panel rounded-3xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded-lg">
                    <span className="text-xs font-mono text-primary">{useCase.stat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
              Ready to Power <span className="text-gradient-cyan">Tomorrow</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the energy revolution. Partner with Vjra Technologies to deploy intelligent charging infrastructure
              that scales with your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                className="group px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-lg flex items-center gap-3 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300"
                data-testid="button-schedule-consultation"
              >
                <Mail className="w-6 h-6" />
                Schedule Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="px-10 py-5 glass-panel rounded-xl font-semibold text-lg hover:border-primary/50 transition-all duration-300"
                data-testid="button-download-whitepaper"
              >
                Download Brochure
              </button>
            </div>

            {/* Contact info */}
            <div className="glass-panel-strong p-8 rounded-2xl inline-block">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-2">Email</div>
                  <div className="font-semibold text-primary">sales@vjratechnologies.com</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-2">Phone</div>
                  <div className="font-semibold text-foreground">+91 9545092266</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-2">Location</div>
                  <div className="font-semibold text-foreground">Pune, Maharashtra, India</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background elements */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-display text-3xl font-bold text-gradient-cyan mb-2">Vjra Technologies LLP</div>
              <p className="text-sm text-muted-foreground">The intelligence behind energy</p>
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              © 2026 VJRA TECHNOLOGIES LLP. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
