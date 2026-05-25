import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Mail, Lock, AlertCircle } from 'lucide-react'
import { login } from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  async function handle(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await login({ email, password })
      if (res.token) {
        localStorage.setItem('token', res.token)
        if (onLogin) onLogin({ token: res.token })
        nav('/')
      } else {
        setError(res.message || res.error || 'Incorrect email or password.')
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
        <h2 className="auth-headline">Welcome back</h2>
        <p className="auth-sub">Sign in to your CampusMarket account</p>

        <form onSubmit={handle}>
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
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
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
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer-link">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  )
}
