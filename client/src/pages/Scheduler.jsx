import { Row, Col, Card, Table, Button } from 'react-bootstrap'  // Added Button to imports
import PostScheduler from '../components/PostScheduler'

const scheduledPosts = [
  {
    id: 1,
    content: "Check out our new feature! #SocialPulse",
    platform: "Twitter",
    date: "2023-06-15 09:00",
    status: "Scheduled"
  },
  {
    id: 2,
    content: "Summer sale starts today! 🎉",
    platform: "Instagram",
    date: "2023-06-16 12:00",
    status: "Pending"
  }
]

export default function Scheduler() {
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
                    <td>{post.date}</td>
                    <td>
                      <span className={`badge bg-${post.status === 'Scheduled' ? 'success' : 'warning'}`}>
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
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}