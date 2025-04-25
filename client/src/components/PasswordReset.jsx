import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return 'Password reset failed. Please try again';
    }
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="auth-card shadow">
            <Card.Body className="p-4 p-md-5">
              <Button 
                variant="link" 
                onClick={() => navigate(-1)}
                className="text-muted mb-3 p-0"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back
              </Button>

              <div className="text-center mb-4">
                <h2 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Reset Password
                </h2>
                <p className="text-muted">
                  {success 
                    ? 'Check your email for further instructions'
                    : 'Enter your email to receive a reset link'}
                </p>
              </div>

              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              {success && (
                <Alert variant="success" className="text-center">
                  <FontAwesomeIcon icon={faCheck} className="me-2" />
                  Password reset email sent!
                </Alert>
              )}

              {!success ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
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

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </Form>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Didn't receive the email?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-primary" 
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Resend
                    </Button>
                  </p>
                  <p className="text-muted small mt-3">
                    Check your spam folder if you don't see it in your inbox
                  </p>
                </div>
              )}
            </Card.Body>

            <Card.Footer className="bg-transparent border-0 text-center py-3">
              <p className="text-muted mb-0">
                Remember your password?{' '}
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