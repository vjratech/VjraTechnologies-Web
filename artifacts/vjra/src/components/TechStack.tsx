import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Cloud, Zap, Radio, BarChart3, Lock } from 'lucide-react';

const techLayers = [
  {
    icon: Cpu,
    title: 'Power Electronics',
    desc: 'High-efficiency converters, bi-directional charging, thermal management',
    color: '#00f0ff',
  },
  {
    icon: Radio,
    title: 'Embedded Systems',
    desc: 'Real-time control, fault detection, safety protocols, CAN/Modbus integration',
    color: '#a855f7',
  },
  {
    icon: Zap,
    title: 'IoT Infrastructure',
    desc: 'Edge computing, sensor networks, OCPP compliance, wireless connectivity',
    color: '#fbbf24',
  },
  {
    icon: Cloud,
    title: 'Cloud Platform',
    desc: 'Scalable backend, real-time sync, fleet management, OTA updates',
    color: '#00f0ff',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics',
    desc: 'Demand forecasting, load balancing, predictive maintenance, energy optimization',
    color: '#a855f7',
  },
  {
    icon: Lock,
    title: 'Security',
    desc: 'End-to-end encryption, secure boot, ISO 27001 compliance, payment security',
    color: '#fbbf24',
  },
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techLayers.map((layer, i) => {
        const Icon = layer.icon;
        return (
          <motion.div
            key={i}
            className="glass-panel p-6 rounded-2xl group hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: `${layer.color}15`,
                  border: `1px solid ${layer.color}30`,
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: layer.color }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg mb-2" style={{ color: layer.color }}>
                  {layer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
