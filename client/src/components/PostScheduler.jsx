import { useState } from 'react';
import { Button, Form, Modal, Tab, Tabs, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faMagic, 
  faRocket,
  faGlobe 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faInstagram, 
  faFacebook, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

export default function PostScheduler() {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState({ 
    text: '', 
    date: '', 
    platform: 'twitter',
    media: null
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setPost({...post, media: e.target.files[0]});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate inputs
      if (!post.text.trim()) {
        throw new Error('Post content is required');
      }
      
      if (!post.date) {
        throw new Error('Please select a schedule time');
      }

      // Platform-specific validation
      if (post.platform === 'linkedin' && post.text.length > 3000) {
        throw new Error('LinkedIn posts have a 3000 character limit');
      }

      // Here you would call your API to schedule the post
      console.log('Scheduling post:', post);
      
      // Reset form on success
      setPost({ text: '', date: '', platform: 'twitter', media: null });
      setShow(false);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlatformIcon = () => {
    switch(post.platform) {
      case 'twitter': return <FontAwesomeIcon icon={faTwitter} className="me-2" />;
      case 'instagram': return <FontAwesomeIcon icon={faInstagram} className="me-2" />;
      case 'facebook': return <FontAwesomeIcon icon={faFacebook} className="me-2" />;
      case 'linkedin': return <FontAwesomeIcon icon={faLinkedin} className="me-2" />;
      default: return <FontAwesomeIcon icon={faGlobe} className="me-2" />;
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
        Schedule Post
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faRocket} className="me-2 text-primary" />
            Schedule New Post {getPlatformIcon()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Tabs defaultActiveKey="manual" className="mb-3">
            <Tab eventKey="manual" title="Manual">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Post Content</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    value={post.text}
                    onChange={(e) => setPost({...post, text: e.target.value})}
                    placeholder={`What's on your mind? ${
                      post.platform === 'twitter' ? '(280 character limit)' : 
                      post.platform === 'linkedin' ? '(3000 character limit)' : ''
                    }`}
                    maxLength={post.platform === 'twitter' ? 280 : 3000}
                  />
                  <Form.Text className="text-muted">
                    {post.text.length}/{post.platform === 'twitter' ? 280 : 3000} characters
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Platform</Form.Label>
                  <Form.Select 
                    value={post.platform}
                    onChange={(e) => setPost({...post, platform: e.target.value})}
                  >
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Media Attachment</Form.Label>
                  <Form.Control 
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                  />
                  {post.platform === 'linkedin' && (
                    <Form.Text className="text-muted">
                      LinkedIn supports images (recommended 1200x627px) and documents
                    </Form.Text>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Schedule Time</Form.Label>
                  <Form.Control 
                    type="datetime-local"
                    value={post.date}
                    onChange={(e) => setPost({...post, date: e.target.value})}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </Form.Group>
              </Form>
            </Tab>
            
            <Tab eventKey="ai" title="AI Generator">
              <div className="text-center p-4">
                <FontAwesomeIcon icon={faMagic} size="2x" className="text-primary mb-3" />
                <p>AI-powered post suggestions coming soon!</p>
                <Button variant="outline-primary">Generate Ideas</Button>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} disabled={isSubmitting}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}