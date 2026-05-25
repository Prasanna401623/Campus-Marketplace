import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SearchX, Plus } from 'lucide-react'
import { fetchListings } from '../api'
import { HARDCODED_LISTINGS, CATEGORIES, avatarColor, timeAgo } from '../data/listings'

function ListingCard({ listing: l }) {
  const seller = l.user?.name || 'Student'

  return (
    <Link to={`/listings/${l.id}`} style={{ textDecoration: 'none' }}>
      <article className="listing-card">
        <div className="card-strip">
          <span className="card-strip-cat">
            {l.category || 'other'}
          </span>
          <span className={`card-strip-price${!l.price ? ' free' : ''}`}>
            {l.price ? `$${Number(l.price).toLocaleString()}` : 'Free'}
          </span>
        </div>

        <div className="card-body">
          <div className="card-title">{l.title}</div>
          <div className="card-desc">{l.description}</div>
          <div className="card-footer">
            <div className="card-seller">
              <div className="avatar av-xs" style={{ background: avatarColor(seller) }}>
                {seller[0]}
              </div>
              <span>{seller.split(' ')[0]}</span>
            </div>
            {l.created_at && (
              <span>{timeAgo(l.created_at)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function Listings() {
  const [searchParams] = useSearchParams()
  const [listings, setListings]           = useState(HARDCODED_LISTINGS)
  const [searchTerm, setSearchTerm]       = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetchListings()
      .then(data => {
        if (data?.listings?.length) {
          setListings([...data.listings, ...HARDCODED_LISTINGS])
        }
      })
      .catch(() => {})
  }, [])

  const filtered = listings.filter(l => {
    const q = searchTerm.toLowerCase()
    const matchSearch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      (l.description || '').toLowerCase().includes(q)
    const matchCat =
      activeCategory === 'all' ||
      l.category === activeCategory ||
      (activeCategory === 'free' && !l.price)
    return matchSearch && matchCat
  })

  const activeCatLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Items'

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">University of Louisiana Monroe — Warhawks</p>
          <h1>
            Everything your campus<br />needs, <em>all in one place.</em>
          </h1>
          <p className="hero-sub">
            Buy and sell textbooks, furniture, electronics, and more with fellow students.
            No fees. No middlemen.
          </p>

          <div className="hero-search">
            <input
              placeholder="Search for textbooks, electronics, furniture…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setSearchTerm('')}
            />
            <button type="button">
              Search
            </button>
          </div>

          <div className="hero-divider" />

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">{listings.length}+</div>
              <div className="hero-stat-lbl">Active listings</div>
            </div>
            <div>
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-lbl">Students selling</div>
            </div>
            <div>
              <div className="hero-stat-num">7</div>
              <div className="hero-stat-lbl">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category tabs ─────────────────────────────── */}
      <div className="categories">
        <div className="container">
          <div className="categories-inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-btn${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Listings ──────────────────────────────────── */}
      <main className="main-content">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-title">{activeCatLabel}</div>
              <div className="section-count">
                {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} available
              </div>
            </div>
            <Link to="/listings/new" className="btn btn-primary">
              <Plus size={15} /> Post a listing
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="listings-grid">
              {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <SearchX size={22} />
              </div>
              <h3>No listings found</h3>
              <p>Try a different keyword or category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
