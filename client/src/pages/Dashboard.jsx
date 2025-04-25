import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';
import PostScheduler from '../components/PostScheduler';
import AnalyticsChart from '../components/AnalyticsChart';
import UGCFinder from '../components/UGCFinder';
import RevenueTracker from '../components/RevenueTracker';
import PlatformPerformance from './PlatformPerformance';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    engagement: 0,
    scheduled: 0,
    roi: 0,
    followers: 0,
    topPlatform: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const fetchMetrics = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const metricsQuery = query(collection(db, 'metrics'), 
        where('userId', '==', auth.currentUser.uid),
        where('date', '>=', new Date(new Date().setDate(new Date().getDate() - 30)))
      );

      const unsubscribeUser = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setMetrics(prev => ({
            ...prev,
            ...doc.data().metrics
          }));
        }
      });

      const unsubscribeMetrics = onSnapshot(metricsQuery, (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => doc.data());
          const totalEngagement = data.reduce((sum, item) => sum + item.engagement, 0);
          const avgEngagement = totalEngagement / data.length || 0;
          
          setMetrics(prev => ({
            ...prev,
            engagement: avgEngagement.toFixed(1),
            followers: data[0]?.followers || 0,
            topPlatform: data[0]?.topPlatform || ''
          }));
          setLoading(false);
        }
      });

      return () => {
        unsubscribeUser();
        unsubscribeMetrics();
      };
    };

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Metrics Overview */}
      <Row className="g-3 mb-4">
        <Col xl={3} md={6}>
          <Card className="metric-card h-100">
            <Card.Body>
              <Card.Title className="metric-title">Engagement Rate</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <div className="metric-value">
                    {metrics.engagement}% 
                    <span className="trend-up">↑</span>
                  </div>
                  <Card.Text className="metric-subtext">
                    {metrics.topPlatform || 'All platforms'}
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className="metric-card h-100">
            <Card.Body>
              <Card.Title className="metric-title">Scheduled Posts</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <div className="metric-value">{metrics.scheduled}</div>
                  <Card.Text className="metric-subtext">
                    {metrics.scheduled > 0 ? 'Active campaigns' : 'No scheduled posts'}
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className="metric-card h-100">
            <Card.Body>
              <Card.Title className="metric-title">Monthly ROI</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <div className="metric-value">${metrics.roi.toFixed(2)}</div>
                  <Card.Text className="metric-subtext">
                    Revenue from social
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className="metric-card h-100">
            <Card.Body>
              <Card.Title className="metric-title">Total Followers</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <div className="metric-value">
                    {metrics.followers.toLocaleString()}
                  </div>
                  <Card.Text className="metric-subtext">
                    Across all platforms
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row className="g-4">
        {/* Left Column - Main Content */}
        <Col xl={8} lg={7}>
          <Card className="h-100">
            <Card.Header>
              <Card.Title>Performance Analytics</Card.Title>
            </Card.Header>
            <Card.Body>
              <AnalyticsChart />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Sidebar Content */}
        <Col xl={4} lg={5}>
          <Row className="g-4">
            <Col md={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Quick Schedule</Card.Title>
                </Card.Header>
                <Card.Body>
                  <PostScheduler compactMode={true} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Top User Content</Card.Title>
                </Card.Header>
                <Card.Body>
                  <UGCFinder />
                </Card.Body>
              </Card>
            </Col>

            <Col md={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Revenue Attribution</Card.Title>
                </Card.Header>
                <Card.Body>
                  <RevenueTracker />
                </Card.Body>
              </Card>
            </Col>

            <Col md={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Platform Performance</Card.Title>
                </Card.Header>
                <Card.Body>
                  <PlatformPerformance />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}