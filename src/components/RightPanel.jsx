import { STYLE_THEMES, ROOM_PRESETS, COLOR_PALETTES } from '../data/furniture';

export default function RightPanel({ theme, setTheme, room, setRoom, items, onClear, selectedItem, onColorChange }) {
  return (
    <aside style={{
      width: '240px',
      background: 'var(--panel-bg)',
      borderLeft: '1px solid var(--border)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>

      {/* Room Settings */}
      <Section title="Room">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
          {ROOM_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setRoom({ width: preset.width, height: preset.height, name: preset.label })}
              style={{
                padding: '8px 6px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: room.name === preset.label ? 'var(--accent)' : 'var(--bg)',
                color: room.name === preset.label ? '#fff' : 'var(--text)',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{preset.icon}</span>
              {preset.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>Width (m)</div>
            <input
              type="number"
              value={room.width}
              min={5} max={30}
              onChange={(e) => setRoom((r) => ({ ...r, width: Math.max(5, Math.min(30, +e.target.value)) }))}
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>Height (m)</div>
            <input
              type="number"
              value={room.height}
              min={5} max={30}
              onChange={(e) => setRoom((r) => ({ ...r, height: Math.max(5, Math.min(30, +e.target.value)) }))}
              style={inputStyle}
            />
          </label>
        </div>
      </Section>

      {/* Style Themes */}
      <Section title="Style Theme">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {STYLE_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              style={{
                padding: '0',
                border: `2px solid ${theme.id === t.id ? t.accent : 'var(--border)'}`,
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'none',
              }}
            >
              <div style={{ height: '24px', display: 'flex' }}>
                <div style={{ flex: 1, background: t.floor }} />
                <div style={{ flex: 1, background: t.wall }} />
                <div style={{ width: '12px', background: t.accent }} />
              </div>
              <div style={{
                padding: '5px 6px',
                fontSize: '11px',
                fontWeight: 500,
                background: theme.id === t.id ? t.accent : 'var(--bg)',
                color: theme.id === t.id ? '#fff' : 'var(--text)',
              }}>
                {t.label}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Color Palettes */}
      <Section title="Color Palette">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {COLOR_PALETTES.map((palette) => (
            <div key={palette.id}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{palette.label}</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => onColorChange && onColorChange(color)}
                    style={{
                      flex: 1,
                      height: '22px',
                      background: color,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid rgba(0,0,0,0.1)',
                      transition: 'transform 0.1s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Selected Item Info */}
      {selectedItem && (
        <Section title="Selected Item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '32px' }}>{selectedItem.emoji}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{selectedItem.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {selectedItem.width}m × {selectedItem.height}m
              </div>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--bg)', padding: '8px 10px', borderRadius: '6px', lineHeight: '1.8' }}>
            <div>Rotation: {selectedItem.rotation}°</div>
            <div>X: {selectedItem.x.toFixed(1)}m, Y: {selectedItem.y.toFixed(1)}m</div>
            <div style={{ marginTop: '4px', fontStyle: 'italic' }}>R = Rotate, Del = Delete</div>
          </div>
        </Section>
      )}

      {/* Stats */}
      <Section title="Room Stats">
        <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <StatRow label="Items placed" value={items.length} />
          <StatRow label="Room area" value={`${room.width * room.height}m²`} />
        </div>
      </Section>

      {/* Actions */}
      <Section title="Actions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={onClear} style={dangerButtonStyle}>
            🗑️ Clear All Items
          </button>
        </div>
      </Section>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '14px' }}>
      <div style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{value}</span>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};

const dangerButtonStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #E74C3C33',
  borderRadius: '8px',
  background: '#E74C3C11',
  color: '#E74C3C',
  fontSize: '13px',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.15s',
};
