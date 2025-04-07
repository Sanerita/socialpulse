import { Row, Col, Card } from 'react-bootstrap'
import PostScheduler from '../components/PostScheduler'
import AnalyticsChart from '../components/AnalyticsChart'
import UGCFinder from '../components/UGCFinder'

export default function Dashboard() {
  return (
    <>
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Engagement Rate</Card.Title>
              <h3 className="text-primary">24% ↑</h3>
              <Card.Text>+12% from last week</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Scheduled Posts</Card.Title>
              <h3 className="text-primary">15</h3>
              <Card.Text>3 pending approval</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>ROI This Month</Card.Title>
              <h3 className="text-primary">$1,240</h3>
              <Card.Text>+$320 from last month</Card.Text>
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
    </>
  )
}