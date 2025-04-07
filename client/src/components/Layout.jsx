import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Container fluid className="px-0">
      <button 
        className="mobile-menu-toggle btn btn-primary"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </Container>
  )
}