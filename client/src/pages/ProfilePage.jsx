import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Tabs, Image, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserEdit, 
  faEnvelope, 
  faCalendarDay,
  faLink,
  faSignOutAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import UserPosts from '../components/UserPosts';
import AnalyticsChart from '../components/AnalyticsChart';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    if (!currentUser?.uid) return;

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUser({
            id: docSnap.id,
            ...docSnap.data(),
            stats: docSnap.data().stats || {
              posts: 0,
              followers: 0,
              following: 0
            },
            socialConnections: docSnap.data().socialConnections || {
              twitter: false,
              instagram: false,
              linkedin: false,
              facebook: false
            }
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error("Error fetching document: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialConnection = async (platform) => {
    const updatedConnections = {
      ...user.socialConnections,
      [platform]: !user.socialConnections[platform]
    };
    
    try {
      await updateDoc(doc(db, 'users', user.id), {
        socialConnections: updatedConnections
      });
      setUser(prev => ({
        ...prev,
        socialConnections: updatedConnections
      }));
    } catch (err) {
      console.error("Error updating social connections: ", err);
    }
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', user.id), {
        name: user.name,
        bio: user.bio,
        email: user.email,
        website: user.website,
        profileImage: user.profileImage,
        coverImage: user.coverImage
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setEditMode(false);
    } catch (err) {
      setError('Failed to save profile');
      console.error("Error updating document: ", err);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      
      const storageRef = ref(storage, `profilePictures/${getAuth().currentUser.uid}/profile.jpg`);
      const uploadResult = await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(uploadResult.ref);
      
      await updateDoc(doc(db, 'users', user.id), {
        profileImage: url,
      });
      
      setUser(prev => ({...prev, profileImage: url}));
      setProfilePictureUrl(url);
      setSelectedFile(null);
    } catch (error) {
      setError('Failed to upload profile picture');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate('/login');
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>No user data found</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-0">
      {/* Cover Photo */}
      <div className="cover-photo" style={{ 
        backgroundImage: `url(${user.coverImage || 'https://source.unsplash.com/random/1200x400/?social,media'})`,
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
                <div className='position-relative d-flex justify-content-center'>
                  <Image 
                    src={user.profileImage || 'https://i.pravatar.cc/300'} 
                    roundedCircle 
                    width={150}
                    height={150}
                    className="border border-4 border-white shadow-sm mt-n5"
                  />
                  {editMode && (
                    <div className="position-absolute bottom-0 end-0">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control 
                          type="file" 
                          onChange={handleFileChange} 
                          accept="image/*" 
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={handleUpload} size="sm">
                          Upload
                      </Button>
                    </div>
                  )}
                </div>
                
                {editMode ? (
                  <Form.Group className="mb-3 mt-3">
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name || ''}
                      onChange={handleInputChange}
                      className="text-center h4 border-0"
                    />
                  </Form.Group>
                ) : (
                  <h2 className="mt-3">{user.name || 'No name set'}</h2>
                )}
                
                <p className="text-muted">{user.username || '@username'}</p>
                
                {editMode ? (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      name="bio"
                      value={user.bio || ''}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </Form.Group>
                ) : (
                  <p className="px-4">{user.bio || 'No bio yet'}</p>
                )}
                
                <div className="d-flex justify-content-center gap-3 my-3">
                  <Button 
                    variant={user.socialConnections.twitter ? "primary" : "outline-primary"} 
                    size="sm"
                    onClick={() => handleSocialConnection('twitter')}
                    disabled={!editMode}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.instagram ? "danger" : "outline-danger"} 
                    size="sm"
                    onClick={() => handleSocialConnection('instagram')}
                    disabled={!editMode}
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.linkedin ? "info" : "outline-info"} 
                    size="sm"
                    onClick={() => handleSocialConnection('linkedin')}
                    disabled={!editMode}
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Button>
                  <Button 
                    variant={user.socialConnections.facebook ? "primary" : "outline-primary"} 
                    size="sm"
                    onClick={() => handleSocialConnection('facebook')}
                    disabled={!editMode}
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>
                </div>
                
                <div className="d-flex justify-content-center gap-4 my-3">
                  <div className="text-center">
                    <h5>{user.stats.posts || 0}</h5>
                    <small className="text-muted">Posts</small>
                  </div>
                  <div className="text-center">
                    <h5>{user.stats.followers || 0}</h5>
                    <small className="text-muted">Followers</small>
                  </div>
                  <div className="text-center">
                    <h5>{user.stats.following || 0}</h5>
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
                        value={user.email || ''}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <small>{user.email || 'No email set'}</small>
                    )}
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-muted" />
                    <small>{user.joinDate || 'Joined date unknown'}</small>
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon icon={faLink} className="me-2 text-muted" />
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name="website"
                        value={user.website || ''}
                        onChange={handleInputChange}
                        size="sm"
                        placeholder="yourwebsite.com"
                      />
                    ) : user.website ? (
                      <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                        <small>{user.website}</small>
                      </a>
                    ) : (
                      <small>No website</small>
                    )}
                  </li>
                </ul>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Profile updated successfully!</Alert>}
                
                <Button 
                  variant={editMode ? "success" : "outline-primary"} 
                  className="mt-2"
                  onClick={editMode ? handleSave : () => setEditMode(true)}
                >
                  <FontAwesomeIcon icon={editMode ? faCheck : faUserEdit} className="me-2" />
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
                      <Button 
                        variant="outline-danger" 
                        className="mt-2"
                        onClick={handleLogout}
                      >
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