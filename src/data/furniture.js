export const FURNITURE_CATALOG = {
  seating: {
    label: 'Seating',
    items: [
      { id: 'sofa', label: 'Sofa', emoji: '🛋️', width: 3, height: 1.5, color: '#8B7355' },
      { id: 'armchair', label: 'Armchair', emoji: '🪑', width: 1.5, height: 1.5, color: '#A0856C' },
      { id: 'dining-chair', label: 'Dining Chair', emoji: '🪑', width: 1, height: 1, color: '#C4A882' },
      { id: 'office-chair', label: 'Office Chair', emoji: '💺', width: 1.2, height: 1.2, color: '#666' },
    ],
  },
  tables: {
    label: 'Tables',
    items: [
      { id: 'coffee-table', label: 'Coffee Table', emoji: '🟫', width: 2, height: 1, color: '#8B6914' },
      { id: 'dining-table', label: 'Dining Table', emoji: '🟫', width: 3, height: 1.5, color: '#A0522D' },
      { id: 'desk', label: 'Desk', emoji: '🖥️', width: 2.5, height: 1.2, color: '#6B4423' },
      { id: 'side-table', label: 'Side Table', emoji: '🟫', width: 0.8, height: 0.8, color: '#B8860B' },
    ],
  },
  beds: {
    label: 'Beds & Storage',
    items: [
      { id: 'king-bed', label: 'King Bed', emoji: '🛏️', width: 3, height: 2.5, color: '#C9B99A' },
      { id: 'queen-bed', label: 'Queen Bed', emoji: '🛏️', width: 2.5, height: 2, color: '#D4C5B0' },
      { id: 'single-bed', label: 'Single Bed', emoji: '🛏️', width: 1.5, height: 2, color: '#DDD0BC' },
      { id: 'wardrobe', label: 'Wardrobe', emoji: '🚪', width: 2, height: 0.8, color: '#8B6914' },
      { id: 'dresser', label: 'Dresser', emoji: '🗄️', width: 1.5, height: 0.6, color: '#966F33' },
    ],
  },
  decor: {
    label: 'Decor & Plants',
    items: [
      { id: 'plant', label: 'Plant', emoji: '🪴', width: 0.8, height: 0.8, color: '#228B22' },
      { id: 'bookshelf', label: 'Bookshelf', emoji: '📚', width: 1.5, height: 0.5, color: '#8B4513' },
      { id: 'tv', label: 'TV', emoji: '📺', width: 2, height: 0.2, color: '#1a1a1a' },
      { id: 'lamp', label: 'Floor Lamp', emoji: '💡', width: 0.5, height: 0.5, color: '#FFD700' },
      { id: 'rug', label: 'Area Rug', emoji: '🟥', width: 3, height: 2, color: '#CC4444' },
    ],
  },
  kitchen: {
    label: 'Kitchen',
    items: [
      { id: 'fridge', label: 'Refrigerator', emoji: '🧊', width: 1, height: 0.8, color: '#C0C0C0' },
      { id: 'stove', label: 'Stove', emoji: '🍳', width: 1, height: 0.8, color: '#888' },
      { id: 'sink', label: 'Sink', emoji: '🚿', width: 1, height: 0.6, color: '#B0C4DE' },
      { id: 'kitchen-counter', label: 'Counter', emoji: '⬛', width: 2, height: 0.7, color: '#D2B48C' },
    ],
  },
};

export const STYLE_THEMES = [
  {
    id: 'modern',
    label: 'Modern',
    floor: '#E8E0D5',
    wall: '#F5F0EB',
    accent: '#2C3E50',
    grid: '#D5CCC0',
  },
  {
    id: 'scandinavian',
    label: 'Scandinavian',
    floor: '#F0EBE3',
    wall: '#FAFAF8',
    accent: '#6B8F71',
    grid: '#E5DDD5',
  },
  {
    id: 'industrial',
    label: 'Industrial',
    floor: '#6B6052',
    wall: '#4A4A4A',
    accent: '#C0392B',
    grid: '#5A5048',
  },
  {
    id: 'bohemian',
    label: 'Bohemian',
    floor: '#D4A76A',
    wall: '#F4E4C1',
    accent: '#8B4513',
    grid: '#C49A5A',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    floor: '#FFFFFF',
    wall: '#FAFAFA',
    accent: '#333333',
    grid: '#EEEEEE',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    floor: '#2C1810',
    wall: '#1A1A2E',
    accent: '#D4AF37',
    grid: '#3D2314',
  },
];

export const ROOM_PRESETS = [
  { id: 'living', label: 'Living Room', width: 20, height: 15, icon: '🛋️' },
  { id: 'bedroom', label: 'Bedroom', width: 15, height: 15, icon: '🛏️' },
  { id: 'kitchen', label: 'Kitchen', width: 18, height: 12, icon: '🍳' },
  { id: 'office', label: 'Home Office', width: 14, height: 12, icon: '💻' },
  { id: 'dining', label: 'Dining Room', width: 16, height: 14, icon: '🍽️' },
];

export const COLOR_PALETTES = [
  { id: 'neutral', label: 'Neutral', colors: ['#F5F5F0', '#E8E0D5', '#D3C9BC', '#B5A99A', '#8B7D6E'] },
  { id: 'earthy', label: 'Earthy', colors: ['#F4E4C1', '#D4A76A', '#A0522D', '#6B3A2A', '#3D1C0F'] },
  { id: 'cool', label: 'Cool Blues', colors: ['#E8F4FD', '#A8D8EA', '#619BB5', '#2E6A8E', '#1A3A4A'] },
  { id: 'green', label: 'Nature', colors: ['#F0F4E8', '#C8D8A0', '#8BAF5A', '#4A7C25', '#2A4A10'] },
  { id: 'warm', label: 'Warm Tones', colors: ['#FFF8F0', '#FFD9B5', '#F4A460', '#CC6633', '#8B3A1A'] },
  { id: 'mono', label: 'Monochrome', colors: ['#FFFFFF', '#CCCCCC', '#888888', '#444444', '#111111'] },
];
