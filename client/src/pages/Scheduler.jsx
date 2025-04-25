import { Row, Col, Card, Table, Button, Spinner } from 'react-bootstrap';
import PostScheduler from '../components/PostScheduler';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';

export default function Scheduler() {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const q = query(
      collection(db, 'scheduledPosts'),
      where('userId', '==', auth.currentUser.uid),
      where('status', 'in', ['scheduled', 'pending'])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setScheduledPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Row>
      <Col md={12}>
        <Card className="mb-4">
          <Card.Header>
            <Card.Title className="mb-0">Create New Post</Card.Title>
          </Card.Header>
          <Card.Body>
            <PostScheduler />
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <Card>
          <Card.Header>
            <Card.Title className="mb-0">Scheduled Posts</Card.Title>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Content</th>
                    <th>Platform</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledPosts.map(post => (
                    <tr key={post.id}>
                      <td>{post.content}</td>
                      <td>{post.platform}</td>
                      <td>{post.scheduledTime?.toDate().toLocaleString()}</td>
                      <td>
                        <span className={`badge bg-${post.status === 'scheduled' ? 'success' : 'warning'}`}>
                          {post.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm">Edit</Button>
                        <Button variant="outline-danger" size="sm" className="ms-2">Cancel</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}