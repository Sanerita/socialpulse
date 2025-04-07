import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', engagement: 40 },
  { name: 'Tue', engagement: 65 },
  { name: 'Wed', engagement: 50 },
  { name: 'Thu', engagement: 75 },
  { name: 'Fri', engagement: 90 },
  { name: 'Sat', engagement: 60 },
  { name: 'Sun', engagement: 45 },
]

export default function AnalyticsChart() {
  return (
    <div style={{ height: '300px' }}>
      <h5 className="mb-4">Engagement This Week</h5>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="engagement" 
            fill="var(--primary)" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}