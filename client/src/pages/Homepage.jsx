import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faCalendarAlt, 
  faRobot, 
  faDollarSign,
  faUsers,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import screenshot from '../assets/dashboard-screenshot.jpg'; // Add this image to your assets

export default function Homepage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundColor: '#88D8C0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>AI-Powered Social Media Management</h1>
              <p className="lead">
                Grow your revenue with smart scheduling, analytics, and content tools 
                designed for startups and SMEs.
              </p>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Start Free Trial
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg ms-3">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src={screenshot} 
                alt="SocialPulse Dashboard" 
                className="img-fluid shadow rounded" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-5">Everything You Need to Succeed</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 h-100">
                <FontAwesomeIcon icon={faRobot} size="3x" className="text-aqua mb-3" />
                <h3>AI Content Tools</h3>
                <p>
                  Generate posts, predict virality, and analyze competitors with 
                  our AI-powered toolkit.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 h-100">
                <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="text-aqua mb-3" />
                <h3>Smart Scheduling</h3>
                <p>
                  Bulk schedule across platforms with optimal timing recommendations.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 h-100">
                <FontAwesomeIcon icon={faChartLine} size="3x" className="text-aqua mb-3" />
                <h3>Revenue Analytics</h3>
                <p>
                  Track which posts drive sales with our unique revenue attribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How SocialPulse Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card p-4 text-center">
                <div className="step-number">1</div>
                <h3>Connect Your Accounts</h3>
                <p>Link all your social profiles in one place.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card p-4 text-center">
                <div className="step-number">2</div>
                <h3>Create & Schedule</h3>
                <p>Use our AI tools to craft perfect posts.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card p-4 text-center">
                <div className="step-number">3</div>
                <h3>Analyze & Grow</h3>
                <p>See what's working and optimize your strategy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="pricing-teaser py-5">
        <div className="container text-center">
          <h2 className="mb-4">Simple, Transparent Pricing</h2>
          <p className="lead mb-5">
            Start for free, upgrade as you grow
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="pricing-card p-4 bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-4 border-end">
                    <h3>Starter</h3>
                    <p className="price">$0<span>/mo</span></p>
                    <Link to="/register" className="btn btn-outline-primary">
                      Get Started
                    </Link>
                  </div>
                  <div className="col-md-4 border-end">
                    <h3>Growth</h3>
                    <p className="price">$19<span>/mo</span></p>
                    <Link to="/register" className="btn btn-primary">
                      Try Free
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <h3>Pro</h3>
                    <p className="price">$49<span>/mo</span></p>
                    <Link to="/register" className="btn btn-primary">
                      Try Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 bg-aqua-light">
        <div className="container">
          <h2 className="text-center mb-5">Trusted by Growing Businesses</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white rounded shadow">
                <p>"SocialPulse helped us double our engagement in just 30 days!"</p>
                <div className="author">- Sarah K., Ecommerce Store</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white rounded shadow">
                <p>"The revenue tracking alone is worth the price."</p>
                <div className="author">- Michael T., SaaS Startup</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white rounded shadow">
                <p>"Finally a tool that understands small business needs."</p>
                <div className="author">- Priya N., Consulting Firm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Ready to Transform Your Social Media?</h2>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}