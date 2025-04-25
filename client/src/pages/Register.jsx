import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        stats: {
          posts: 0,
          followers: 0,
          following: 0
        },
        socialConnections: {
          twitter: false,
          instagram: false,
          linkedin: false,
          facebook: false
        }
      });

      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/operation-not-allowed':
        return 'Account creation is currently disabled';
      default:
        return 'Registration failed. Please try again';
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4 p-lg-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Create your <span style={{ color: 'var(--dark)' }}>SocialPulse</span> account
                </h2>
                <p className="text-muted mb-4">Start managing your social media like a pro</p>
              </div>

              {error && <Alert variant="danger" className="text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faUser} className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="py-2"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-2"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="6"
                      required
                      className="py-2"
                    />
                  </div>
                  <Form.Text className="text-muted small">
                    At least 6 characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength="6"
                      required
                      className="py-2"
                    />
                  </div>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3 fw-semibold" 
                  disabled={loading}
                  style={{ height: '45px' }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      Create Account <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </>
                  )}
                </Button>

                <div className="text-center small text-muted mt-4">
                  By registering, you agree to our{' '}
                  <Link to="/terms" className="text-primary text-decoration-none">
                    Terms of Service
                  </Link>
                </div>
              </Form>
            </Card.Body>

            <Card.Footer className="bg-transparent border-0 text-center py-3">
              <p className="text-muted mb-0">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Sign in
                </Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}