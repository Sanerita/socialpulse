import { Row, Col, Card } from 'react-bootstrap'
import AnalyticsChart from '../components/AnalyticsChart'

const platformData = [
  { name: 'Twitter', followers: 12500, growth: 12 },
  { name: 'Instagram', followers: 8900, growth: 8 },
  { name: 'Facebook', followers: 7500, growth: 5 }
]

export default function Analytics() {
  return (
    <Row className="g-3">
      <Col lg={8}>
        <Card className="p-3">
          <AnalyticsChart />
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="h-100">
          <Card.Header>
            <Card.Title>Platform Performance</Card.Title>
          </Card.Header>
          <Card.Body>
            <ul className="list-unstyled">
              {platformData.map(platform => (
                <li key={platform.name} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">{platform.name}</span>
                    <span>{platform.followers.toLocaleString()} followers</span>
                  </div>
                  <div className="progress mt-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: `${platform.growth * 5}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    +{platform.growth}% from last month
                  </small>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}