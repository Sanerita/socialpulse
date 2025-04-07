import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faMagic } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span className="navbar-brand">
          <FontAwesomeIcon icon={faMagic} className="icon me-2" />
          SocialPulse
        </span>
        <div className="d-flex align-items-center">
          <ThemeToggle />
          <FontAwesomeIcon icon={faBell} className="mx-3 text-muted" />
          <FontAwesomeIcon icon={faEnvelope} className="me-3 text-muted" />
          <img 
            src="https://i.pravatar.cc/40" 
            alt="Profile" 
            className="rounded-circle" 
          />
        </div>
      </div>
    </nav>
  )
}