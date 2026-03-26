export default function Toolbar({ room, onUndo, onRedo, canUndo, canRedo, onExport }) {
  return (
    <header style={{
      height: '56px',
      background: 'var(--panel-bg)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '16px',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <span style={{ fontSize: '24px' }}>🏠</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            InteriorAI
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            Room Planner
          </div>
        </div>
      </div>

      <div style={{ width: '1px', height: '28px', background: 'var(--border)' }} />

      {/* Room name */}
      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
        {room.name || 'My Room'}
      </div>

      <div style={{ flex: 1 }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <ToolButton onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">↩</ToolButton>
        <ToolButton onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">↪</ToolButton>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />
        <ToolButton onClick={onExport} title="Export as PNG">
          💾
        </ToolButton>
      </div>

      {/* Keyboard shortcuts hint */}
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        background: 'var(--bg)',
        padding: '5px 10px',
        borderRadius: '6px',
        border: '1px solid var(--border)',
      }}>
        R: Rotate · Del: Remove · Arrows: Move
      </div>
    </header>
  );
}

function ToolButton({ children, onClick, disabled, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: '32px',
        height: '32px',
        border: '1px solid var(--border)',
        borderRadius: '7px',
        background: 'var(--bg)',
        color: disabled ? 'var(--text-muted)' : 'var(--text)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = disabled ? 'var(--text-muted)' : 'var(--text)'; }}
    >
      {children}
    </button>
  );
}
