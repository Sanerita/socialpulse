import { Row, Col, Card, Spinner } from 'react-bootstrap';
import AnalyticsChart from '../components/AnalyticsChart';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const q = query(
      collection(db, 'platformStats'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setPlatformData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
            {loading ? (
              <div className="text-center py-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
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
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}