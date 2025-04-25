import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { subDays, format } from 'date-fns'

export default function AnalyticsChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startDate = subDays(new Date(), 7)
    
    const q = query(
      collection(db, 'analytics'),
      where('date', '>=', startDate),
      where('userId', '==', auth.currentUser?.uid)
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chartData = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          name: format(data.date.toDate(), 'EEE'),
          engagement: data.engagementRate,
          revenue: data.revenue
        }
      })
      
      // Fill in missing days
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const completeData = days.map(day => {
        const existing = chartData.find(d => d.name === day)
        return existing || { name: day, engagement: 0, revenue: 0 }
      })
      
      setData(completeData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={{ height: '300px' }}>
      <h5 className="mb-4">Engagement & Revenue This Week</h5>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80%' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`$${value}`, 'Revenue']
                return [`${value}%`, 'Engagement']
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="engagement" 
              fill="var(--primary)" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              yAxisId="right"
              dataKey="revenue" 
              fill="var(--success)" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}