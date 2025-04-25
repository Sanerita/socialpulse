import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-white border-bottom-0">
          <h1 className="h3 mb-0">Terms of Service</h1>
          <p className="text-muted">Last Updated: {new Date().toLocaleDateString()}</p>
        </Card.Header>
        
        <Card.Body className="px-4 py-4">
          <section className="mb-5">
            <h2 className="h4 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SocialPulse ("the Service"), you agree to be bound by these Terms of 
              Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">2. Description of Service</h2>
            <p>
              SocialPulse provides social media management tools including but not limited to post scheduling, 
              analytics, and content management across multiple social platforms.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">3. User Responsibilities</h2>
            <ul>
              <li className="mb-2">
                You are responsible for maintaining the confidentiality of your account and password
              </li>
              <li className="mb-2">
                You agree to comply with all applicable laws and regulations regarding online conduct
              </li>
              <li className="mb-2">
                You will not use the Service to post or transmit any unlawful, threatening, or harmful content
              </li>
              <li className="mb-2">
                You are solely responsible for the content you publish through the Service
              </li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">4. Privacy Policy</h2>
            <p>
              Your use of the Service is subject to our <Link to="/privacy" className="text-primary">Privacy Policy</Link>, 
              which explains how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by SocialPulse and 
              are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for 
              any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">7. Limitation of Liability</h2>
            <p>
              In no event shall SocialPulse, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              We will provide notice of any changes by posting the new Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="h4 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@socialpulse.example.com
            </p>
          </section>
        </Card.Body>

        <Card.Footer className="bg-white border-top-0 text-center py-4">
          <p className="text-muted mb-0">
            By using our services, you acknowledge that you have read and understood these Terms of Service.
          </p>
        </Card.Footer>
      </Card>
    </Container>
  );
}