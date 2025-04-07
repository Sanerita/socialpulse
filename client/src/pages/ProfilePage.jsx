import { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs, Image, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserEdit, 
  faEnvelope, 
  faCalendarDay,
  faLink,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import UserPosts from '../components/UserPosts';
import AnalyticsChart from '../components/AnalyticsChart';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    username: '@alexj',
    bio: 'Digital marketer & content creator. Sharing tips on social media growth.',
    email: 'alex@example.com',
    joinDate: 'Joined March 2023',
    website: 'alexjohnson.com',
    profileImage: 'https://i.pravatar.cc/300',
    coverImage: 'https://source.unsplash.com/random/1200x400/?social,media',
    stats: {
      posts: 142,
      followers: 5280,
      following: 342
    },
    socialConnections: {
      twitter: true,
      instagram: true,
      linkedin: false,
      facebook: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialConnection = (platform) => {
    setUser(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        [platform]: !prev.socialConnections[platform]
      }
    }));
  };

  return (
    <Container fluid className="px-0">
      {/* Cover Photo */}
      <div className="cover-photo" style={{ 
        backgroundImage: `url(${user.coverImage})`,
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      <Container className="mt-n5">
        <Row>
          <Col lg={4}>
            {/* Profile Card */}
            <Card className="shadow-sm border-0">
              <Card.Body className="text-center">
                <Image 
                  src={user.profileImage} 
                  roundedCircle 
                  width={150}
                  height={150}
                  className="border border-4 border-white shadow-sm mt-n5"
                />
                
                {editMode ? (
                  <Form.Group className="mb-3 mt-3">
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="text-center h4 border-0"
                    />
                  </Form.Group>
                ) : (
                  <h2 className="mt-3">{user.name}</h2>
                )}
                
                <p className="text-muted">{user.username}</p>
                
                {editMode ? (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      name="bio"
                      value={user.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </Form.Group>
                ) : (
                  <p className="px-4">{user.bio}</p>
                )}
                
                <div className="d-flex justify-content-center gap-3 my-3">
                  <Button 
                    variant={user.socialConnections.twitter ? "primary" : "outline-primary"} 
                    size="sm"
                    onClick={() => handleSocialConnection('twitter')}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.instagram ? "danger" : "outline-danger"} 
                    size="sm"
                    onClick={() => handleSocialConnection('instagram')}
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.linkedin ? "info" : "outline-info"} 
                    size="sm"
                    onClick={() => handleSocialConnection('linkedin')}
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.facebook ? "primary" : "outline-primary"} 
                    size="sm"
                    onClick={() => handleSocialConnection('facebook')}
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>
                </div>
                
                <div className="d-flex justify-content-center gap-4 my-3">
                  <div className="text-center">
                    <h5>{user.stats.posts}</h5>
                    <small className="text-muted">Posts</small>
                  </div>
                  <div className="text-center">
                    <h5>{user.stats.followers}</h5>
                    <small className="text-muted">Followers</small>
                  </div>
                  <div className="text-center">
                    <h5>{user.stats.following}</h5>
                    <small className="text-muted">Following</small>
                  </div>
                </div>
                
                <ul className="list-unstyled text-start px-4">
                  <li className="mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                    {editMode ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <small>{user.email}</small>
                    )}
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-muted" />
                    <small>{user.joinDate}</small>
                  </li>
                  {user.website && (
                    <li className="mb-2">
                      <FontAwesomeIcon icon={faLink} className="me-2 text-muted" />
                      {editMode ? (
                        <Form.Control
                          type="text"
                          name="website"
                          value={user.website}
                          onChange={handleInputChange}
                          size="sm"
                        />
                      ) : (
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                          <small>{user.website}</small>
                        </a>
                      )}
                    </li>
                  )}
                </ul>
                
                <Button 
                  variant={editMode ? "success" : "outline-primary"} 
                  className="mt-2"
                  onClick={() => setEditMode(!editMode)}
                >
                  <FontAwesomeIcon icon={editMode ? "check" : faUserEdit} className="me-2" />
                  {editMode ? "Save Profile" : "Edit Profile"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Tabs defaultActiveKey="posts" className="mb-4">
                  <Tab eventKey="posts" title="Posts">
                    <UserPosts />
                  </Tab>
                  <Tab eventKey="analytics" title="Analytics">
                    <AnalyticsChart />
                  </Tab>
                  <Tab eventKey="settings" title="Settings">
                    <div className="p-3">
                      <Button variant="outline-danger" className="mt-2">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Logout
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}