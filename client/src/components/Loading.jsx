import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Loading() {
  return (
    <Container 
      fluid 
      className="loading-spinner d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <h3 className="mt-3" style={{ color: 'var(--primary)' }}>SocialPulse</h3>
      </div>
      <Spinner 
        animation="border" 
        role="status" 
        variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}