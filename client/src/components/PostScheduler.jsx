import { useState } from 'react'
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faMagic, faRocket } from '@fortawesome/free-solid-svg-icons'

export default function PostScheduler() {
  const [show, setShow] = useState(false)
  const [post, setPost] = useState({ 
    text: '', 
    date: '', 
    platform: 'twitter' 
  })

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
            Schedule New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="manual" className="mb-3">
            <Tab eventKey="manual" title="Manual">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Post Content</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={post.text}
                    onChange={(e) => setPost({...post, text: e.target.value})}
                  />
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
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule Time</Form.Label>
                  <Form.Control 
                    type="datetime-local"
                    value={post.date}
                    onChange={(e) => setPost({...post, date: e.target.value})}
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
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary">
            Schedule Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}