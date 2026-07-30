import { motion } from 'framer-motion';

export function NetworkMap() {
  const nodes = [
    { id: 1, x: 50, y: 50, status: 'active' },
    { id: 2, x: 150, y: 80, status: 'active' },
    { id: 3, x: 250, y: 50, status: 'charging' },
    { id: 4, x: 100, y: 150, status: 'active' },
    { id: 5, x: 200, y: 180, status: 'idle' },
    { id: 6, x: 300, y: 140, status: 'charging' },
  ];

  const connections = [
    [1, 2], [2, 3], [1, 4], [2, 4], [4, 5], [5, 6], [3, 6],
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00f0ff';
      case 'charging': return '#fbbf24';
      case 'idle': return '#64748b';
      default: return '#64748b';
    }
  };

  return (
    <svg className="w-full h-full" viewBox="0 0 350 230">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map((conn, i) => {
        const node1 = nodes.find(n => n.id === conn[0]);
        const node2 = nodes.find(n => n.id === conn[1]);
        if (!node1 || !node2) return null;

        return (
          <motion.line
            key={i}
            x1={node1.x}
            y1={node1.y}
            x2={node2.x}
            y2={node2.y}
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="12"
            fill="rgba(20, 25, 35, 0.9)"
            stroke={getStatusColor(node.status)}
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="6"
            fill={getStatusColor(node.status)}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.7 }}
          />
          {node.status === 'charging' && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill="none"
              stroke={getStatusColor(node.status)}
              strokeWidth="1"
              opacity="0.5"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
