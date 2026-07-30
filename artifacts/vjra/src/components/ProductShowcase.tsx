import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Zap, Gauge, Wifi, Shield } from 'lucide-react';

const products = [
  {
    name: 'VJRA Pulse',
    category: 'Level 2 AC Charger',
    power: '7.4 - 22 kW',
    features: ['Smart load balancing', 'RFID/App access', 'Weather-resistant', 'Dynamic pricing'],
    image: 'hero-charger',
    stats: [
      { icon: Zap, label: 'Peak Power', value: '22 kW' },
      { icon: Gauge, label: 'Efficiency', value: '96.2%' },
      { icon: Wifi, label: 'Connectivity', value: '4G/WiFi/Ethernet' },
      { icon: Shield, label: 'Protection', value: 'IP54' },
    ],
  },
  {
    name: 'VJRA Nexus',
    category: 'DC Fast Charger',
    power: '60 - 350 kW',
    features: ['Liquid-cooled cable', 'Multi-standard', 'Payment terminal', 'Fleet management'],
    image: 'circuit-detail',
    stats: [
      { icon: Zap, label: 'Peak Power', value: '350 kW' },
      { icon: Gauge, label: 'Efficiency', value: '97.8%' },
      { icon: Wifi, label: 'Protocols', value: 'CCS/CHAdeMO/GB/T' },
      { icon: Shield, label: 'Uptime', value: '99.6%' },
    ],
  },
];

export function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div ref={ref} className="space-y-12">
      {products.map((product, i) => (
        <motion.div
          key={i}
          className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, delay: i * 0.2 }}
          onMouseEnter={() => setActiveIndex(i)}
        >
          {/* Product visual */}
          <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
            <motion.div
              className="glass-panel-strong rounded-3xl p-8 relative overflow-hidden"
              animate={activeIndex === i ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #00f0ff 0%, transparent 70%)',
                }}
                animate={{
                  scale: activeIndex === i ? [1, 1.2, 1] : 1,
                  opacity: activeIndex === i ? [0.2, 0.4, 0.2] : 0.2,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {product.stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="glass-panel p-4 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: i * 0.2 + idx * 0.1 }}
                    >
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <div className="font-mono text-xs text-muted-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="font-display font-semibold text-foreground">
                        {stat.value}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Energy flow visualization */}
              <motion.div
                className="mt-6 h-24 relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.2 + 0.5 }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <motion.path
                    d="M 0 50 Q 100 20 200 50 T 400 50"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Floating accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: '#a855f7' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Product info */}
          <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
            <motion.div
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <span className="text-xs font-mono text-primary">{product.category}</span>
            </motion.div>

            <motion.h3
              className="font-display text-4xl md:text-5xl font-bold mb-3 text-gradient-cyan"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.1 }}
            >
              {product.name}
            </motion.h3>

            <motion.div
              className="text-2xl font-mono font-bold text-foreground/80 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
            >
              {product.power}
            </motion.div>

            <motion.ul
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
            >
              {product.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.4 + idx * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
