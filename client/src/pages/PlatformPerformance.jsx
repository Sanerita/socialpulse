import { Card, ProgressBar } from 'react-bootstrap';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';

export default function PlatformPerformance() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const q = query(
      collection(db, 'platformPerformance'),
      where('userId', '==', auth.currentUser.uid),
      where('date', '>=', new Date(new Date().setDate(new Date().getDate() - 30)))
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      if (data.length > 0) {
        setPlatforms(data[0].platforms || []);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Platform Performance</Card.Title>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />
          </div>
        ) : platforms.length === 0 ? (
          <p className="text-muted text-center">No platform data available</p>
        ) : (
          <div className="platform-list">
            {platforms.map((platform, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold">{platform.name}</span>
                  <span>{platform.engagement}% engagement</span>
                </div>
                <ProgressBar 
                  now={platform.engagement} 
                  variant={getVariant(platform.engagement)}
                  className="mb-2"
                />
                <div className="d-flex justify-content-between small text-muted">
                  <span>{platform.followers.toLocaleString()} followers</span>
                  <span>{platform.growth > 0 ? '+' : ''}{platform.growth}% growth</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function getVariant(engagement) {
  if (engagement > 70) return 'success';
  if (engagement > 40) return 'primary';
  if (engagement > 20) return 'warning';
  return 'danger';
}