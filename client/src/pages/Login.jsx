import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email': return 'Invalid email address';
      case 'auth/user-disabled': return 'Account disabled';
      case 'auth/user-not-found': return 'Account not found';
      case 'auth/wrong-password': return 'Incorrect password';
      case 'auth/too-many-requests': return 'Too many attempts. Try again later';
      default: return 'Login failed. Please try again';
    }
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xl={6} lg={8} md={10} sm={12}>
            <Card className="login-card shadow-lg">
              <Row className="g-0">
                {/* Left Column - Branding/Visual */}
                <Col md={6} className="d-none d-md-flex login-brand-col">
                  <div className="login-brand-content">
                    <div className="brand-logo">
                      <FontAwesomeIcon icon={faArrowRight} size="3x" />
                      <h1>SocialPulse</h1>
                    </div>
                    <p className="brand-tagline">
                      Transform your social media management with AI-powered analytics
                    </p>
                  </div>
                </Col>

                {/* Right Column - Login Form */}
                <Col md={6}>
                  <Card.Body className="p-4 p-md-5">
                    <h2 className="text-center mb-4">Welcome Back</h2>
                    <p className="text-center text-muted mb-4">
                      Sign in to continue to your dashboard
                    </p>

                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <Form.Control
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <Form.Control
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 mb-3 py-2" 
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>
                            Sign In <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                          </>
                        )}
                      </Button>

                      <div className="text-center mt-3">
                        <Link 
                          to="/reset-password" 
                          className="text-decoration-none"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </Form>
                  </Card.Body>
                </Col>
              </Row>

              <Card.Footer className="bg-transparent border-0 text-center py-3">
                <p className="text-muted mb-0">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Sign up
                  </Link>
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}