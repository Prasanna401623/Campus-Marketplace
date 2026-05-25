import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Search, LogOut, Plus } from 'lucide-react'
import Login from './pages/Login'
import Register from './pages/Register'
import Listings from './pages/Listings'
import ListingDetail from './pages/ListingDetail'
import CreateListing from './pages/CreateListing'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (q.trim()) navigate(`/?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          Campus<span>Market</span>
        </Link>

        <form onSubmit={handleSearch} className="navbar-search-wrap">
          <Search size={14} />
          <input
            placeholder="Search listings…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </form>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/listings/new" className="btn btn-primary btn-sm">
                <Plus size={14} /> Post Item
              </Link>
              <button className="btn btn-ghost btn-sm" onClick={onLogout}>
                <LogOut size={14} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/listings/new" className="btn btn-ghost btn-sm">
                <Plus size={14} /> Post Item
              </Link>
              <Link to="/login"    className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 <strong>CampusMarket</strong> — University of Louisiana Monroe</p>
    </footer>
  )
}

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setUser({ token })
  }, [])

  return (
    <div className="page-wrapper">
      <Navbar
        user={user}
        onLogout={() => { localStorage.removeItem('token'); setUser(null) }}
      />
      <Routes>
        <Route path="/"              element={<Listings />} />
        <Route path="/login"         element={<Login onLogin={d => setUser(d)} />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/listings/new"  element={<CreateListing />} />
        <Route path="/listings/:id"  element={<ListingDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}
