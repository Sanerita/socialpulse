import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export default function ThemeToggle() {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme')
    const newTheme = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return (
    <Button 
      variant="outline-secondary" 
      onClick={toggleTheme}
      className="me-2"
    >
      <FontAwesomeIcon icon={faMoon} className="dark-icon" />
      <FontAwesomeIcon icon={faSun} className="light-icon" />
    </Button>
  )
}