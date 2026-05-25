import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { fetchListing, deleteListing } from '../api'
import { HARDCODED_LISTINGS, avatarColor, timeAgo } from '../data/listings'

export default function ListingDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id.startsWith('h')) {
      const found = HARDCODED_LISTINGS.find(l => l.id === id)
      setListing(found || null)
      setLoading(false)
    } else {
      fetchListing(id)
        .then(data => { setListing(data?.id ? data : null); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [id])

  async function handleDelete() {
    if (!localStorage.getItem('token')) return nav('/login')
    if (!window.confirm('Remove this listing?')) return
    setDeleting(true)
    const res = await deleteListing(id)
    if (res.status === 204) nav('/')
    else { alert('Delete failed'); setDeleting(false) }
  }

  if (loading) return <div className="loading">Loading…</div>

  if (!listing) {
    return (
      <div className="detail-page">
        <div className="empty-state" style={{ paddingTop: 80 }}>
          <div className="empty-icon"><ArrowLeft size={22} /></div>
          <h3>Listing not found</h3>
          <p>It may have been removed.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            Back to listings
          </Link>
        </div>
      </div>
    )
  }

  const seller     = listing.user?.name || 'Student'
  const isHardcode = id.startsWith('h')
  const related    = HARDCODED_LISTINGS
    .filter(l => l.category === listing.category && l.id !== id)
    .slice(0, 3)

  return (
    <div className="detail-page">
      <Link to="/" className="page-back">
        <ArrowLeft size={14} /> All listings
      </Link>

      {/* Hero image area */}
      <div className="detail-hero">
        {listing.image_url ? (
          <img src={listing.image_url} alt={listing.title} />
        ) : (
          <>
            <div className="detail-hero-bg">
              <div className="detail-hero-bg-text">
                {listing.category || 'item'}
              </div>
            </div>
            <div className="detail-hero-content">
              <div className={listing.price ? 'detail-hero-price' : 'detail-hero-free'}>
                {listing.price ? `$${Number(listing.price).toLocaleString()}` : 'Free'}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="detail-grid">
        {/* Main */}
        <div>
          <div className="detail-badge-row">
            <span className="badge">{listing.category || 'Other'}</span>
          </div>
          <h1 className="detail-title">{listing.title}</h1>

          {!listing.image_url && (
            <div className={`detail-price-inline${!listing.price ? ' free' : ''}`}>
              {listing.price ? `$${Number(listing.price).toLocaleString()}` : 'Free'}
            </div>
          )}

          <p className="detail-desc">{listing.description}</p>

          {listing.contact_info && (
            <div className="detail-info-row">
              <span className="detail-info-label">Contact</span>
              <span className="detail-info-value">{listing.contact_info}</span>
            </div>
          )}

          {listing.category && (
            <div className="detail-info-row">
              <span className="detail-info-label">Category</span>
              <span className="detail-info-value" style={{ textTransform: 'capitalize' }}>
                {listing.category}
              </span>
            </div>
          )}

          {listing.created_at && (
            <p className="detail-time">Posted {timeAgo(listing.created_at)}</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          {/* Seller card */}
          <div className="sidebar-seller">
            <div className="sidebar-seller-top">
              <div className="avatar av-md" style={{ background: avatarColor(seller) }}>
                {seller[0]}
              </div>
              <div>
                <div className="sidebar-seller-name">{seller}</div>
                <div className="sidebar-seller-sub">ULM Student</div>
              </div>
            </div>

            {listing.contact_info && (
              <div className="sidebar-contact">
                <div className="sidebar-contact-label">How to reach them</div>
                <div className="sidebar-contact-value">{listing.contact_info}</div>
              </div>
            )}

            <div className="sidebar-actions">
              {listing.contact_info && (
                <a
                  href={`sms:${listing.contact_info}`}
                  className="btn btn-primary btn-block"
                >
                  Contact seller
                </a>
              )}
              {!isHardcode && (
                <button
                  className="btn btn-danger btn-block"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <Trash2 size={14} />
                  {deleting ? 'Removing…' : 'Delete listing'}
                </button>
              )}
              <Link to="/" className="btn btn-outline btn-block">
                <ArrowLeft size={14} /> Back
              </Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="related-section">
              <div className="related-title">More in {listing.category}</div>
              {related.map(l => (
                <Link key={l.id} to={`/listings/${l.id}`} className="related-item">
                  <div className="related-bar" />
                  <div>
                    <div className="related-name">{l.title}</div>
                    <div className="related-price">
                      {l.price ? `$${l.price}` : 'Free'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
