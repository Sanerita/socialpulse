import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPulse } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <Container 
      fluid 
      className="loading-spinner d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="text-center mb-4">
        <FontAwesomeIcon 
          icon={faPulse} 
          size="3x" 
          className="text-primary mb-3"
          style={{ animation: 'pulse 2s infinite' }}
        />
        <h3 className="mt-3" style={{ color: 'var(--primary)' }}>SocialPulse</h3>
      </div>
      <Spinner 
        animation="border" 
        role="status" 
        variant="primary"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Container>
  );
}