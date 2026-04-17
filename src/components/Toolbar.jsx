export default function Toolbar({ room, onUndo, onRedo, canUndo, canRedo, onExport, onShareToTelegram, shareStatus }) {
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
        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />
        <ShareButton onClick={onShareToTelegram} status={shareStatus} />
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

function ShareButton({ onClick, status }) {
  const label = status === 'sending' ? '⏳' : status === 'ok' ? '✅' : status === 'err' ? '❌' : '✈️';
  const title =
    status === 'sending' ? 'Sending to Telegram…' :
    status === 'ok' ? 'Sent to Telegram!' :
    status === 'err' ? 'Failed to send — check agent' :
    'Share to Telegram';
  return (
    <button
      onClick={onClick}
      disabled={status === 'sending'}
      title={title}
      style={{
        height: '32px',
        padding: '0 10px',
        border: '1px solid var(--border)',
        borderRadius: '7px',
        background: status === 'ok' ? '#22c55e22' : 'var(--bg)',
        color: 'var(--text)',
        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 500,
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { if (status !== 'sending') { e.currentTarget.style.background = '#229ED922'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = status === 'ok' ? '#22c55e22' : 'var(--bg)'; }}
    >
      {label} Telegram
    </button>
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
