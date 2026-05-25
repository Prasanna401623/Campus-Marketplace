import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, DollarSign, Phone, Link2 } from 'lucide-react'
import { createListing } from '../api'
import { CATEGORIES } from '../data/listings'

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c.id !== 'all')

export default function CreateListing() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')

  const [form, setForm] = useState({
    title:        '',
    category:     '',
    description:  '',
    price:        '',
    contact_info: '',
    image_url:    '',
  })
  const [isFree, setIsFree]   = useState(false)
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }))

  async function handle(e) {
    e.preventDefault()
    setError(null)
    if (!token) { nav('/login'); return }
    if (!form.title.trim())  { setError('Title is required.'); return }
    if (!form.category)      { setError('Please select a category.'); return }

    setLoading(true)
    try {
      const payload = {
        title:        form.title.trim(),
        category:     form.category,
        description:  form.description.trim() || null,
        price:        isFree ? null : (form.price ? Number(form.price) : null),
        contact_info: form.contact_info.trim() || null,
        image_url:    form.image_url.trim()    || null,
      }
      const res = await createListing(payload)
      if (res.id) nav(`/listings/${res.id}`)
      else setError(res.error || res.message || 'Failed to post listing.')
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-page">
      <Link to="/" className="page-back">
        <ArrowLeft size={14} /> Back to listings
      </Link>

      <div className="create-head">
        <h2>Post a listing</h2>
        <p>Fill in the details below — your item will be visible to all ULM students.</p>
      </div>

      {!token && (
        <div className="form-error" style={{ marginBottom: 20 }}>
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          You need to{' '}
          <Link to="/login" style={{ color: 'var(--maroon)', fontWeight: 700, marginLeft: 3 }}>
            sign in
          </Link>{' '}
          before posting a listing.
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handle}>
          {/* ─ Item details ─ */}
          <div className="form-section-label">Item details</div>

          <div className="form-group">
            <label className="form-label">
              Title <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Calculus 8th Edition, nearly new"
              value={form.title}
              onChange={set('title')}
              maxLength={120}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Category <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <select
                className="form-select"
                value={form.category}
                onChange={set('category')}
              >
                <option value="">Select category…</option>
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price</label>
              <label className={`free-toggle${isFree ? ' checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={e => setIsFree(e.target.checked)}
                />
                Giving this away for free
              </label>
              {!isFree && (
                <div className="fi-wrap" style={{ marginTop: 8 }}>
                  <DollarSign size={14} className="fi" />
                  <input
                    type="number"
                    className="form-input with-icon"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={set('price')}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Describe the item's condition, what's included, why you're selling, etc."
              value={form.description}
              onChange={set('description')}
              maxLength={800}
            />
          </div>

          <hr className="form-sep" />

          {/* ─ Contact & image ─ */}
          <div className="form-section-label">Contact & media</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Contact info</label>
              <div className="fi-wrap">
                <Phone size={14} className="fi" />
                <input
                  type="text"
                  className="form-input with-icon"
                  placeholder="Phone, email, Snap, etc."
                  value={form.contact_info}
                  onChange={set('contact_info')}
                />
              </div>
              <div className="form-hint">How buyers should reach you</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Image URL{' '}
                <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span>
              </label>
              <div className="fi-wrap">
                <Link2 size={14} className="fi" />
                <input
                  type="url"
                  className="form-input with-icon"
                  placeholder="https://…"
                  value={form.image_url}
                  onChange={set('image_url')}
                />
              </div>
              <div className="form-hint">A direct link to a photo of the item</div>
            </div>
          </div>

          {error && (
            <div className="form-error">
              <AlertCircle size={14} style={{ flexShrink: 0 }} /> {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={loading || !token}
            >
              {loading ? 'Posting…' : 'Post listing'}
            </button>
            <Link to="/" className="btn btn-outline btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
