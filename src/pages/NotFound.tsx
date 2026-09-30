import { Link } from 'react-router-dom'
import './pages.css'

export default function NotFound() {
  return (
    <div className="page">
      <div className="wrap empty empty--page">
        <p className="micro muted">404</p>
        <h1 className="display page-head__title">
          This page has <em>evaporated.</em>
        </h1>
        <Link to="/" className="link">
          Return home <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  )
}
