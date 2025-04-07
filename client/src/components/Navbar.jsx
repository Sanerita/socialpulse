import { useState } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faEnvelope, 
  faMagic, 
  faUser, 
  faCog, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  // Mock notification data
  const notifications = [
    { id: 1, text: "New follower: @user123" },
    { id: 2, text: "Your post got 10 likes" }
  ];

  // Mock messages data
  const messages = [
    { id: 1, sender: "Team SocialPulse", text: "Welcome to our platform!" }
  ];

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span className="navbar-brand">
          <FontAwesomeIcon icon={faMagic} className="icon me-2" style={{ color: '#88D8C0' }} />
          SocialPulse
        </span>
        
        <div className="d-flex align-items-center">
          <ThemeToggle />
          
          {/* Notifications Icon with Dropdown */}
          <Dropdown show={showNotifications} onToggle={setShowNotifications}>
            <Dropdown.Toggle variant="link" className="position-relative mx-3 text-muted">
              <FontAwesomeIcon icon={faBell} />
              {notifications.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.length}
                </span>
              )}
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="dropdown-menu-end" style={{ width: '300px' }}>
              <Dropdown.Header>Notifications</Dropdown.Header>
              {notifications.map(notification => (
                <Dropdown.Item key={notification.id}>
                  {notification.text}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item>View all notifications</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {/* Messages Icon with Dropdown */}
          <Dropdown show={showMessages} onToggle={setShowMessages}>
            <Dropdown.Toggle variant="link" className="me-3 text-muted">
              <FontAwesomeIcon icon={faEnvelope} />
              {messages.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {messages.length}
                </span>
              )}
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="dropdown-menu-end" style={{ width: '300px' }}>
              <Dropdown.Header>Messages</Dropdown.Header>
              {messages.map(message => (
                <Dropdown.Item key={message.id}>
                  <strong>{message.sender}:</strong> {message.text}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item>View all messages</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {/* Profile Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="link" className="p-0">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="rounded-circle border border-2 border-primary"
                style={{ cursor: 'pointer' }}
              />
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item as={NavLink} to="/profile">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings">
                <FontAwesomeIcon icon={faCog} className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}