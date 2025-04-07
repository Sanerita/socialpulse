import { Form, Card, Button } from 'react-bootstrap'

export default function Settings() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Account Settings</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="your@email.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Timezone</Form.Label>
            <Form.Select>
              <option>Select your timezone</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC-6">Central Time (UTC-6)</option>
              <option value="UTC-7">Mountain Time (UTC-7)</option>
              <option value="UTC-8">Pacific Time (UTC-8)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Connected Accounts</Form.Label>
            <div className="border rounded p-3 mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <span>Twitter</span>
                <Button variant="outline-primary" size="sm">Connect</Button>
              </div>
            </div>
            <div className="border rounded p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Instagram</span>
                <Button variant="outline-primary" size="sm">Connect</Button>
              </div>
            </div>
          </Form.Group>
          <Button variant="primary">Save Changes</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}