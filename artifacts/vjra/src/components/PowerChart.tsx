import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { time: '00:00', power: 23.4, energy: 18.2 },
  { time: '04:00', power: 18.7, energy: 14.5 },
  { time: '08:00', power: 42.3, energy: 35.8 },
  { time: '12:00', power: 67.8, energy: 58.2 },
  { time: '16:00', power: 89.2, energy: 76.4 },
  { time: '20:00', power: 54.6, energy: 45.1 },
  { time: '24:00', power: 31.2, energy: 25.8 },
];

export function PowerChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="time" 
          stroke="#00f0ff40"
          style={{ fontSize: '11px', fontFamily: 'Space Mono' }}
        />
        <YAxis 
          stroke="#00f0ff40"
          style={{ fontSize: '11px', fontFamily: 'Space Mono' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 25, 35, 0.95)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '8px',
            fontFamily: 'Space Mono',
            fontSize: '12px',
          }}
          labelStyle={{ color: '#00f0ff' }}
        />
        <Area
          type="monotone"
          dataKey="power"
          stroke="#00f0ff"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPower)"
        />
        <Area
          type="monotone"
          dataKey="energy"
          stroke="#a855f7"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorEnergy)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
