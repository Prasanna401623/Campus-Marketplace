const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5050/api'

function authHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function fetchListings() {
  const res = await fetch(`${API_BASE}/listings`)
  return res.json()
}

export async function fetchListing(id) {
  const res = await fetch(`${API_BASE}/listings/${id}`)
  return res.json()
}

export async function createListing(data) {
  const res = await fetch(`${API_BASE}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateListing(id, data) {
  const res = await fetch(`${API_BASE}/listings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteListing(id) {
  const res = await fetch(`${API_BASE}/listings/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() }
  })
  return res
}
