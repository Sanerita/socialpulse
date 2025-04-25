import { Card, Table, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { subDays, format } from 'date-fns'

export default function RevenueTracker() {
  const [revenueData, setRevenueData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const q = query(
      collection(db, 'revenueEvents'),
      where('userId', '==', auth.currentUser?.uid),
      where('date', '>=', subDays(new Date(), 30))
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      const calculated = events.reduce((acc, event) => {
        const dateStr = format(event.date.toDate(), 'MMM dd')
        if (!acc[dateStr]) {
          acc[dateStr] = 0
        }
        acc[dateStr] += event.amount
        return acc
      }, {})
      
      setRevenueData(Object.entries(calculated).map(([date, amount]) => ({ date, amount })))
      setTotalRevenue(events.reduce((sum, event) => sum + event.amount, 0))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>
          <FontAwesomeIcon icon={faDollarSign} className="me-2 text-warning" />
          Revenue Attribution
        </Card.Title>
        <Badge bg="success" pill>
          ${totalRevenue.toFixed(2)}
        </Badge>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : revenueData.length === 0 ? (
          <p className="text-muted text-center py-4">No revenue data yet</p>
        ) : (
          <Table hover>
            <thead>
              <tr>
                <th>Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Change</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item, index) => {
                const prevAmount = index > 0 ? revenueData[index - 1].amount : 0
                const change = prevAmount > 0 
                  ? ((item.amount - prevAmount) / prevAmount) * 100 
                  : 0
                
                return (
                  <tr key={item.date}>
                    <td>{item.date}</td>
                    <td className="text-end">${item.amount.toFixed(2)}</td>
                    <td className="text-end">
                      {change !== 0 && (
                        <>
                          <FontAwesomeIcon 
                            icon={change > 0 ? faArrowUp : faArrowDown} 
                            className={change > 0 ? 'text-success' : 'text-danger'} 
                          />
                          <span className={change > 0 ? 'text-success' : 'text-danger'}>
                            {Math.abs(change).toFixed(1)}%
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  )
}