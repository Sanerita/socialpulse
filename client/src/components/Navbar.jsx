import { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dropdown, Nav, Button, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faEnvelope, 
  faMagic, 
  faUser, 
  faCog, 
  faSignOutAlt,
  faChartLine,
  faCalendarAlt,
  faHome,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // New CSS file for custom styles

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded]);

  // Mock data - replace with real data from your backend
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New follower: @user123" },
    { id: 2, text: "Your post got 10 likes" }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "Team SocialPulse", text: "Welcome to our platform!" }
  ]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" ref={navbarRef}>
      <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand">
          <FontAwesomeIcon icon={faMagic} className="icon me-2" style={{ color: '#88D8C0' }} />
          SocialPulse
        </NavLink>

        {/* Mobile Toggle Button */}
        <div className="d-flex align-items-center">
          {expanded ? (
            <Button 
              variant="link"
              className="navbar-toggler-close text-white"
              onClick={() => setExpanded(false)}
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </Button>
          ) : (
            <Button 
              className="navbar-toggler"
              variant="link"
              type="button" 
              onClick={() => setExpanded(!expanded)}
              aria-controls="navbarContent"
              aria-expanded={expanded}
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          )}
        </div>

        {/* Collapsible Content */}
        <Collapse in={expanded} className="navbar-collapse" id="navbarContent">
          <div className="d-flex flex-column flex-lg-row w-100">
            {/* Main Navigation Links */}
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link 
                as={NavLink} 
                to="/dashboard" 
                className="nav-link"
                activeclassname="active"
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Dashboard
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/scheduler" 
                className="nav-link"
                activeclassname="active"
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                Scheduler
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/analytics" 
                className="nav-link"
                activeclassname="active"
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faChartLine} className="me-1" />
                Analytics
              </Nav.Link>
            </Nav>

            {/* Right-aligned icons */}
            <div className="d-flex align-items-center gap-3 mb-3 mb-lg-0">
              <ThemeToggle />
              
              {/* Notifications Dropdown */}
              <Dropdown 
                show={showNotifications} 
                onToggle={setShowNotifications} 
                align="end"
                drop="down"
              >
                <Dropdown.Toggle 
                  variant="link" 
                  className="position-relative text-muted"
                  id="notifications-dropdown"
                >
                  <FontAwesomeIcon icon={faBell} />
                  {notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications.length}
                    </span>
                  )}
                </Dropdown.Toggle>
                
                <Dropdown.Menu className="dropdown-menu-end shadow-lg">
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <Dropdown.Item key={notification.id} className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="notification-dot bg-primary me-2"></div>
                          <span>{notification.text}</span>
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled className="text-muted">
                      No new notifications
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    as={NavLink} 
                    to="/notifications"
                    onClick={() => {
                      setExpanded(false);
                      setShowNotifications(false);
                    }}
                  >
                    View all notifications
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              {/* Messages Dropdown */}
              <Dropdown 
                show={showMessages} 
                onToggle={setShowMessages} 
                align="end"
                drop="down"
              >
                <Dropdown.Toggle 
                  variant="link" 
                  className="position-relative text-muted"
                  id="messages-dropdown"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  {messages.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {messages.length}
                    </span>
                  )}
                </Dropdown.Toggle>
                
                <Dropdown.Menu className="dropdown-menu-end shadow-lg">
                  <Dropdown.Header>Messages</Dropdown.Header>
                  {messages.length > 0 ? (
                    messages.map(message => (
                      <Dropdown.Item key={message.id} className="py-2">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar-sm bg-light rounded-circle"></div>
                          </div>
                          <div className="flex-grow-1">
                            <strong>{message.sender}</strong>
                            <p className="mb-0 text-muted small">{message.text}</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled className="text-muted">
                      No new messages
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    as={NavLink} 
                    to="/messages"
                    onClick={() => {
                      setExpanded(false);
                      setShowMessages(false);
                    }}
                  >
                    View all messages
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              {/* Profile Dropdown */}
              {currentUser && (
                <Dropdown align="end" drop="down">
                  <Dropdown.Toggle variant="link" className="p-0">
                    <div className="position-relative">
                      {!profileImageLoaded && (
                        <div className="avatar-placeholder rounded-circle"></div>
                      )}
                      <img
                        src={currentUser.photoURL || 'https://i.pravatar.cc/40'}
                        alt="Profile"
                        className={`rounded-circle border border-2 border-primary ${profileImageLoaded ? 'visible' : 'invisible'}`}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          cursor: 'pointer',
                          position: profileImageLoaded ? 'relative' : 'absolute'
                        }}
                        referrerPolicy="no-referrer"
                        onLoad={() => setProfileImageLoaded(true)}
                        onError={() => setProfileImageLoaded(false)}
                      />
                    </div>
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu className="dropdown-menu-end shadow-lg">
                    <Dropdown.Header>
                      <div className="d-flex align-items-center">
                        <img
                          src={currentUser.photoURL || 'https://i.pravatar.cc/40'}
                          alt="Profile"
                          className="rounded-circle me-2"
                          width="32"
                          height="32"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="fw-bold">{currentUser.displayName || 'User'}</div>
                          <div className="small text-muted">{currentUser.email}</div>
                        </div>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Item 
                      as={NavLink} 
                      to="/profile"
                      onClick={() => setExpanded(false)}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item 
                      as={NavLink} 
                      to="/settings"
                      onClick={() => setExpanded(false)}
                    >
                      <FontAwesomeIcon icon={faCog} className="me-2" />
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </Collapse>
      </div>
    </nav>
  );
}