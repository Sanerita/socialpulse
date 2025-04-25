import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faCalendarAlt, 
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import screenshot from '../assets/dashboard-screenshot.jpg'; // Make sure this path is correct

export default function Homepage() {
  return (
    <div className="homepage" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <section className="hero py-5" style={{ 
        backgroundColor: '#88D8C0',
        color: 'white',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                AI-Powered Social Media Management
              </h1>
              <p className="lead" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                Grow your revenue with smart scheduling, analytics, and content tools 
                designed for startups and SMEs.
              </p>
              <div className="cta-buttons d-flex">
                <Link to="/register" className="btn btn-primary btn-lg me-3" style={{ padding: '0.75rem 1.5rem' }}>
                  Start Free Trial
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg" style={{ padding: '0.75rem 1.5rem' }}>
                  Login
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src={screenshot} 
                alt="SocialPulse Dashboard" 
                className="img-fluid shadow rounded" 
                style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>
            Everything You Need to Succeed
          </h2>
          <div className="row g-4">
            {[
              {
                icon: faRobot,
                title: "AI Content Tools",
                description: "Generate posts, predict virality, and analyze competitors with our AI-powered toolkit."
              },
              {
                icon: faCalendarAlt,
                title: "Smart Scheduling",
                description: "Bulk schedule across platforms with optimal timing recommendations."
              },
              {
                icon: faChartLine,
                title: "Revenue Analytics",
                description: "Track which posts drive sales with our unique revenue attribution."
              }
            ].map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="p-4 h-100 bg-white rounded shadow" style={{ height: '100%' }}>
                  <FontAwesomeIcon 
                    icon={feature.icon} 
                    size="3x" 
                    style={{ color: '#88D8C0', marginBottom: '1rem' }} 
                  />
                  <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>
            How SocialPulse Works
          </h2>
          <div className="row g-4">
            {[
              {
                step: "1",
                title: "Connect Your Accounts",
                description: "Link all your social profiles in one place."
              },
              {
                step: "2",
                title: "Create & Schedule",
                description: "Use our AI tools to craft perfect posts."
              },
              {
                step: "3",
                title: "Analyze & Grow",
                description: "See what's working and optimize your strategy."
              }
            ].map((step, index) => (
              <div className="col-md-4" key={index}>
                <div className="p-4 text-center h-100">
                  <div 
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      fontSize: '1.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="pricing-teaser py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Simple, Transparent Pricing</h2>
          <p className="lead mb-5" style={{ fontSize: '1.25rem' }}>
            Start for free, upgrade as you grow
          </p>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="p-4 bg-white shadow rounded">
                <div className="row">
                  {[
                    {
                      name: "Starter",
                      price: "$0",
                      buttonVariant: "outline-primary"
                    },
                    {
                      name: "Growth",
                      price: "$19",
                      buttonVariant: "primary"
                    },
                    {
                      name: "Pro",
                      price: "$49", 
                      buttonVariant: "primary"
                    }
                  ].map((plan, index) => (
                    <div 
                      className={`col-md-4 ${index < 2 ? 'border-end' : ''}`} 
                      key={index}
                      style={{ padding: '1.5rem' }}
                    >
                      <h3 style={{ marginBottom: '1rem' }}>{plan.name}</h3>
                      <p className="price" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {plan.price}<span style={{ fontSize: '1rem' }}>/mo</span>
                      </p>
                      <Link 
                        to="/register" 
                        className={`btn btn-${plan.buttonVariant}`}
                        style={{ padding: '0.5rem 1.5rem' }}
                      >
                        {plan.name === "Starter" ? "Get Started" : "Try Free"}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>
            Trusted by Growing Businesses
          </h2>
          <div className="row">
            {[
              {
                quote: "SocialPulse helped us double our engagement in just 30 days!",
                author: "- Sarah K., Ecommerce Store"
              },
              {
                quote: "The revenue tracking alone is worth the price.",
                author: "- Michael T., SaaS Startup"
              },
              {
                quote: "Finally a tool that understands small business needs.",
                author: "- Priya N., Consulting Firm"
              }
            ].map((testimonial, index) => (
              <div className="col-md-4 mb-4 mb-md-0" key={index}>
                <div className="p-4 bg-light rounded" style={{ height: '100%' }}>
                  <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{testimonial.quote}</p>
                  <div className="author" style={{ fontWeight: 'bold' }}>{testimonial.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-5 text-center" style={{ backgroundColor: '#88D8C0', color: 'white' }}>
        <div className="container">
          <h2 className="mb-4" style={{ fontWeight: 'bold' }}>
            Ready to Transform Your Social Media?
          </h2>
          <Link 
            to="/register" 
            className="btn btn-light btn-lg px-5"
            style={{ 
              color: '#88D8C0',
              fontWeight: 'bold',
              padding: '0.75rem 2rem'
            }}
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}