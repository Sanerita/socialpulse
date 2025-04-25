import { Row, Col, Card } from 'react-bootstrap'
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import PostScheduler from '../components/PostScheduler'
import AnalyticsChart from '../components/AnalyticsChart'
import UGCFinder from '../components/UGCFinder'
import RevenueTracker from '../components/RevenueTracker'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    engagement: 0,
    scheduled: 0,
    roi: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      // Replace with your auth user ID
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const unsub = onSnapshot(doc(db, 'users', userId), (doc) => {
        if (doc.exists()) {
          setMetrics(doc.data().metrics)
          setLoading(false)
        }
      })

      return unsub
    }
    fetchMetrics()
  }, [])

  return (
    <>
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Engagement Rate</Card.Title>
              {loading ? (
                <div className="placeholder-glow">
                  <h3 className="text-primary placeholder col-4"></h3>
                </div>
              ) : (
                <>
                  <h3 className="text-primary">{metrics.engagement}% ↑</h3>
                  <small className="text-muted">Real-time tracking</small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Scheduled Posts</Card.Title>
              {loading ? (
                <div className="placeholder-glow">
                  <h3 className="text-primary placeholder col-4"></h3>
                </div>
              ) : (
                <>
                  <h3 className="text-primary">{metrics.scheduled}</h3>
                  <small className="text-muted">Active campaigns</small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>ROI This Month</Card.Title>
              {loading ? (
                <div className="placeholder-glow">
                  <h3 className="text-primary placeholder col-4"></h3>
                </div>
              ) : (
                <>
                  <h3 className="text-primary">${metrics.roi.toFixed(2)}</h3>
                  <small className="text-muted">Revenue from social</small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-3">
        <Col lg={8}>
          <Card className="p-3">
            <AnalyticsChart />
          </Card>
        </Col>
        <Col lg={4}>
          <Row className="g-3">
            <Col md={12}>
              <Card className="p-3">
                <PostScheduler />
              </Card>
            </Col>
            <Col md={12}>
              <UGCFinder />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={8}>
          <Card className="p-3">
            <AnalyticsChart />
          </Card>
        </Col>
        <Col lg={4}>
          <Row className="g-3">
            <Col md={12}>
              <Card className="p-3">
                <PostScheduler />
              </Card>
            </Col>
            <Col md={12}>
              <UGCFinder />
            </Col>
            <Col md={12}>
              <RevenueTracker />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}