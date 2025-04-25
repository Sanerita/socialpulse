import { Card, ListGroup, Button, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faHeart, faComment, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { query, collection, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useEffect, useState } from 'react';

export default function UGCFinder() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const q = query(
        collection(db, 'ugcPosts'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
        setLoading(false);
      });
  
      return () => unsubscribe();
    }
  }, []);

  const handleRepost = async (postId) => {
    try {
      if (!auth.currentUser?.uid) return;

      const postToRepost = posts.find(p => p.id === postId);
      if (!postToRepost) return;

      await addDoc(collection(db, 'scheduledPosts'), {
        content: `Reposting great content from our community: ${postToRepost.content}`,
        platform: 'twitter', // Default to Twitter
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        status: 'draft',
        isRepost: true,
        originalPostId: postId
      });
      // Show success toast
    } catch (error) {
      console.error('Repost failed:', error);
    }
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>Top User Content</Card.Title>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted text-center py-4">No UGC found yet</p>
        ) : (
          <ListGroup variant="flush">
            {posts.map(post => (
              <ListGroup.Item key={post.id} className="border-0">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">{post.username}</span>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleRepost(post.id)}
                  >
                    Repost
                  </Button>
                </div>
                <p>{post.content}</p>
                <div className="d-flex gap-3">
                  <small>
                    <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" />
                    {post.likes || 0}
                  </small>
                  <small>
                    <FontAwesomeIcon icon={faComment} className="me-1 text-primary" />
                    {post.comments || 0}
                  </small>
                  <small>
                    <FontAwesomeIcon icon={faRetweet} className="me-1 text-success" />
                    {post.shares || 0}
                  </small>
                  {post.revenueImpact > 0 && (
                    <small>
                      <FontAwesomeIcon icon={faDollarSign} className="me-1 text-warning" />
                      ${post.revenueImpact.toFixed(2)}
                    </small>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}