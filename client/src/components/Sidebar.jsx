import { Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faCalendarAlt, 
  faChartBar,
  faUsers,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen }) {
  return (
    <Nav className={`flex-column sidebar p-3 ${isOpen ? 'active' : ''}`}>
      <NavLink to="/" className="nav-link mb-2" activeclassname="active">
        <FontAwesomeIcon icon={faHome} className="me-2" />
        Dashboard
      </NavLink>
      <NavLink to="/scheduler" className="nav-link mb-2" activeclassname="active">
        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
        Scheduler
      </NavLink>
      <NavLink to="/analytics" className="nav-link mb-2" activeclassname="active">
        <FontAwesomeIcon icon={faChartBar} className="me-2" />
        Analytics
      </NavLink>
      <NavLink to="/settings" className="nav-link mt-auto" activeclassname="active">
        <FontAwesomeIcon icon={faCog} className="me-2" />
        Settings
      </NavLink>
    </Nav>
  )
}