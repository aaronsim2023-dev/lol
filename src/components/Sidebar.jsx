import { useState } from 'react';
import { FURNITURE_CATALOG } from '../data/furniture';

export default function Sidebar({ onDragStart }) {
  const [activeCategory, setActiveCategory] = useState('seating');
  const [search, setSearch] = useState('');

  const categories = Object.entries(FURNITURE_CATALOG);
  const items = FURNITURE_CATALOG[activeCategory]?.items.filter(
    (item) => !search || item.label.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <aside style={{
      width: '220px',
      background: 'var(--panel-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Furniture
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          style={{
            width: '100%',
            padding: '7px 10px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
        {categories.map(([key, cat]) => (
          <button
            key={key}
            onClick={() => { setActiveCategory(key); setSearch(''); }}
            style={{
              padding: '5px 10px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: activeCategory === key ? 'var(--accent)' : 'transparent',
              color: activeCategory === key ? '#fff' : 'var(--text)',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: activeCategory === key ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '10px' }}>
        {items.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>No items found</div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'grab',
                transition: 'all 0.15s',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '4px' }}>{item.emoji}</div>
              <div style={{ fontSize: '11px', color: 'var(--text)', fontWeight: 500, lineHeight: 1.3 }}>{item.label}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px' }}>
                {item.width}×{item.height}m
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
        Drag items onto the canvas
      </div>
    </aside>
  );
}
