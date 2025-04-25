import { Form, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    email: '',
    timezone: '',
    connectedAccounts: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const fetchSettings = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings(docSnap.data().settings || settings);
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        settings
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating settings: ", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Account Settings</Card.Title>
      </Card.Header>
      <Card.Body>
        {success && <Alert variant="success">Settings saved successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Timezone</Form.Label>
            <Form.Select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
            >
              <option value="">Select your timezone</option>
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
                <Button 
                  variant={settings.connectedAccounts?.twitter ? "success" : "outline-primary"} 
                  size="sm"
                >
                  {settings.connectedAccounts?.twitter ? "Connected" : "Connect"}
                </Button>
              </div>
            </div>
            <div className="border rounded p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Instagram</span>
                <Button 
                  variant={settings.connectedAccounts?.instagram ? "success" : "outline-primary"} 
                  size="sm"
                >
                  {settings.connectedAccounts?.instagram ? "Connected" : "Connect"}
                </Button>
              </div>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <Spinner size="sm" /> : 'Save Changes'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}