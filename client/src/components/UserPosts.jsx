import { Card, Row, Col } from 'react-bootstrap';

export default function UserPosts() {
  const posts = [
    {
      id: 1,
      content: "Just launched our new product! Check it out at example.com",
      date: "2 hours ago",
      likes: 42,
      comments: 8,
      platform: "twitter"
    },
    {
      id: 2,
      content: "Beautiful day for a photoshoot! Here's one of my favorites...",
      date: "1 day ago",
      likes: 128,
      comments: 24,
      platform: "instagram"
    }
  ];

  return (
    <Row className="g-3">
      {posts.map(post => (
        <Col key={post.id} md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Text>{post.content}</Card.Text>
              <div className="d-flex justify-content-between text-muted">
                <small>{post.date}</small>
                <small>{post.likes} likes • {post.comments} comments</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}