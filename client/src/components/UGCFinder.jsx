import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

export default function UGCFinder() {
  const ugcPosts = [
    {
      id: 1,
      text: "Loving the new features! #SocialPulse",
      username: "@user123",
      likes: 42,
      comments: 8,
      shares: 5
    },
    {
      id: 2,
      text: "This tool saved me hours of work!",
      username: "@marketingpro",
      likes: 89,
      comments: 12,
      shares: 15
    }
  ]

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>Top User Content</Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {ugcPosts.map(post => (
            <ListGroup.Item key={post.id} className="border-0">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">{post.username}</span>
                <Button variant="outline-primary" size="sm">Repost</Button>
              </div>
              <p>{post.text}</p>
              <div className="d-flex gap-3">
                <small>
                  <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" />
                  {post.likes}
                </small>
                <small>
                  <FontAwesomeIcon icon={faComment} className="me-1 text-primary" />
                  {post.comments}
                </small>
                <small>
                  <FontAwesomeIcon icon={faRetweet} className="me-1 text-success" />
                  {post.shares}
                </small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}