import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { register } from '../api'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [done, setDone]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  async function handle(e) {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const res = await register({ name, email, password })
      if (res.user) {
        setDone(true)
        setTimeout(() => nav('/login'), 1600)
      } else {
        setError(res.message || res.error || 'Registration failed. Please try again.')
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-mark">
          <ShoppingBag size={22} />
        </div>
        <h2 className="auth-headline">Create account</h2>
        <p className="auth-sub">Join the ULM student marketplace</p>

        {done ? (
          <div className="success-state">
            <CheckCircle size={40} color="var(--success)" />
            <h3>Account created!</h3>
            <p>Taking you to sign in…</p>
          </div>
        ) : (
          <form onSubmit={handle}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <div className="fi-wrap">
                <User size={14} className="fi" />
                <input
                  type="text"
                  className="form-input with-icon"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email address</label>
              <div className="fi-wrap">
                <Mail size={14} className="fi" />
                <input
                  type="email"
                  className="form-input with-icon"
                  placeholder="you@ulm.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="fi-wrap">
                <Lock size={14} className="fi" />
                <input
                  type="password"
                  className="form-input with-icon"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <div className="form-hint">At least 6 characters</div>
            </div>

            {error && (
              <div className="form-error">
                <AlertCircle size={14} style={{ flexShrink: 0 }} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: 22 }}
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        )}

        <div className="auth-footer-link">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
