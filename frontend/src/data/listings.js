export const CATEGORIES = [
  { id: 'all',         label: 'All Items' },
  { id: 'books',       label: 'Books' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'furniture',   label: 'Furniture' },
  { id: 'clothing',    label: 'Clothing' },
  { id: 'appliances',  label: 'Appliances' },
  { id: 'sports',      label: 'Sports' },
  { id: 'free',        label: 'Free' },
]

const AVATAR_COLORS = [
  '#7A1E2E','#1E3A7A','#1E5C35','#6B1E7A',
  '#7A4A1E','#1E5A7A','#5C1522','#1E4A6B',
]

export function avatarColor(name = '') {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

export function timeAgo(dateStr) {
  const ms = Date.now() - new Date(dateStr).getTime()
  const m  = Math.floor(ms / 60000)
  const h  = Math.floor(ms / 3600000)
  const d  = Math.floor(ms / 86400000)
  if (m < 60)  return `${m}m ago`
  if (h < 24)  return `${h}h ago`
  if (d === 1) return 'Yesterday'
  if (d < 7)   return `${d}d ago`
  if (d < 30)  return `${Math.floor(d / 7)}w ago`
  return `${Math.floor(d / 30)}mo ago`
}

export const HARDCODED_LISTINGS = [
  {
    id: 'h1',
    title: 'Calculus: Early Transcendentals (8th Ed)',
    description: 'Mint condition — no highlights or markings anywhere. Covers Calc I, II, and III. Unused online access code still sealed.',
    price: 45,
    category: 'books',
    contact_info: 'Text (318) 555-0101',
    user: { name: 'Alex R.' },
    created_at: '2026-05-20T10:00:00Z',
  },
  {
    id: 'h2',
    title: 'MacBook Air M2 (2023) — Space Gray',
    description: 'Barely used — bought in January, switching to a Windows laptop for engineering lab. 8GB RAM, 256GB SSD. AppleCare until 2026. Original box and charger included.',
    price: 899,
    category: 'electronics',
    contact_info: 'Email: jordan@ulm.edu',
    user: { name: 'Jordan M.' },
    created_at: '2026-05-21T14:30:00Z',
  },
  {
    id: 'h3',
    title: 'IKEA MICKE Study Desk (White)',
    description: 'Great for dorm rooms, 73×50cm. Minor scuff on the rear panel that is hidden once placed against a wall. Easy to disassemble and move.',
    price: 55,
    category: 'furniture',
    contact_info: 'DM on Instagram @sam_kelly',
    user: { name: 'Sam K.' },
    created_at: '2026-05-22T09:00:00Z',
  },
  {
    id: 'h4',
    title: 'Nike Air Force 1 — White, Size 10',
    description: 'Worn twice, essentially brand new. Classic all-white colorway. Original box included. Ordered the wrong size — your gain.',
    price: 70,
    category: 'clothing',
    contact_info: 'Snap: priya_ulm',
    user: { name: 'Priya S.' },
    created_at: '2026-05-19T16:00:00Z',
  },
  {
    id: 'h5',
    title: 'Python Crash Course, 3rd Edition',
    description: 'Solid intro to Python — used for CS101 here. Light pencil notes in chapters 1–3 only, otherwise very clean. A genuinely good book.',
    price: 18,
    category: 'books',
    contact_info: 'Text (318) 555-0202',
    user: { name: 'Chris W.' },
    created_at: '2026-05-18T11:00:00Z',
  },
  {
    id: 'h6',
    title: 'Ergonomic Mesh Office Chair',
    description: 'Used for one semester. Adjustable height, armrests, and lumbar support. Matte black frame. Comfortable for long study sessions. Easy to transport.',
    price: 120,
    category: 'furniture',
    contact_info: 'Call (318) 555-0303',
    user: { name: 'Marcus T.' },
    created_at: '2026-05-23T08:30:00Z',
  },
  {
    id: 'h7',
    title: 'TI-84 Plus CE Graphing Calculator',
    description: 'Perfect working condition. Comes with USB cable, protective slide cover, and a fresh set of batteries. Required for most math and science courses at ULM.',
    price: 65,
    category: 'electronics',
    contact_info: 'Text (318) 555-0404',
    user: { name: 'Nina P.' },
    created_at: '2026-05-17T12:00:00Z',
  },
  {
    id: 'h8',
    title: 'Danby 2.6 cu ft Mini Fridge',
    description: 'Ideal for a dorm room. Quiet motor, runs well. Small freezer compartment inside. Moving out of Sandel Hall next week — need it gone.',
    price: 80,
    category: 'appliances',
    contact_info: 'Email: omar@ulm.edu',
    user: { name: 'Omar A.' },
    created_at: '2026-05-16T13:00:00Z',
  },
  {
    id: 'h9',
    title: 'Organic Chemistry, 10th Ed — Clayden',
    description: 'Some highlighting in chapters 1–5 only. Excellent condition beyond that. This book is what got me through Orgo — take good care of it.',
    price: 55,
    category: 'books',
    contact_info: 'Snap: bella_chem',
    user: { name: 'Bella F.' },
    created_at: '2026-05-15T15:00:00Z',
  },
  {
    id: 'h10',
    title: 'Trek FX3 Hybrid Bicycle',
    description: '21-speed, size M aluminum frame. Recently serviced — new brake pads and chain. Kryptonite lock and a helmet both included. Great for getting around campus.',
    price: 280,
    category: 'sports',
    contact_info: 'Call (318) 555-0505',
    user: { name: 'Daniel G.' },
    created_at: '2026-05-14T10:00:00Z',
  },
  {
    id: 'h11',
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Industry-leading noise cancellation. Perfect for studying in Brown Library. Comes with hard case, 3.5mm cable, and airplane adapter. Like new condition.',
    price: 180,
    category: 'electronics',
    contact_info: 'Text (318) 555-0606',
    user: { name: 'Mia C.' },
    created_at: '2026-05-13T14:00:00Z',
  },
  {
    id: 'h12',
    title: "North Face Puffer Jacket — Women's Medium",
    description: 'Warm 600-fill down, dark navy. Worn one winter season only, zero damage or stains. Folds into its own pocket. Perfect for Louisiana winters.',
    price: 95,
    category: 'clothing',
    contact_info: 'DM: @liv_campus',
    user: { name: 'Olivia R.' },
    created_at: '2026-05-12T11:00:00Z',
  },
  {
    id: 'h13',
    title: 'Keurig K-Mini Coffee Maker',
    description: 'Works perfectly. Matte black. Comes with a 24-count K-Cup variety pack. The essential dorm appliance for surviving 8am classes.',
    price: 30,
    category: 'appliances',
    contact_info: 'Text (318) 555-0707',
    user: { name: 'Tyler B.' },
    created_at: '2026-05-11T09:00:00Z',
  },
  {
    id: 'h14',
    title: 'Manduka PRO Yoga Mat (6mm)',
    description: 'Premium non-slip surface, barely used. Deep forest green. Retails for $130 — selling for much less. Great for the campus rec center.',
    price: 55,
    category: 'sports',
    contact_info: 'Email: sarah@ulm.edu',
    user: { name: 'Sarah H.' },
    created_at: '2026-05-10T16:00:00Z',
  },
  {
    id: 'h15',
    title: 'Moving Boxes — 20+ Boxes',
    description: "End-of-semester move-out. 20+ sturdy cardboard boxes in various sizes, most used only once. Pickup from Schuler Hall, Room 112. First come, first served.",
    price: null,
    category: 'free',
    contact_info: 'Text (318) 555-0808',
    user: { name: 'Jake L.' },
    created_at: '2026-05-24T08:00:00Z',
  },
  {
    id: 'h16',
    title: 'IKEA Kallax Bookshelf (4×2, White)',
    description: 'Solid condition, 147×77cm. Perfect for dorm cube storage, books, or records. Two minor scratches on the back, invisible once placed against a wall.',
    price: 40,
    category: 'furniture',
    contact_info: 'Call (318) 555-0909',
    user: { name: 'Emma V.' },
    created_at: '2026-05-09T13:00:00Z',
  },
]
