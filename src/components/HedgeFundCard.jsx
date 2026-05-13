import { RISK_LEVELS } from '../data/hedgeFunds';

const RISK_COLORS = {
  Low: { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  Medium: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  High: { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
  'Very High': { bg: '#ede9fe', text: '#5b21b6', dot: '#8b5cf6' },
};

const CATEGORY_COLORS = {
  Equity: '#3b82f6',
  Macro: '#8b5cf6',
  'Event-Driven': '#f59e0b',
  Quantitative: '#06b6d4',
  Credit: '#10b981',
  'Multi-Strategy': '#ec4899',
};

export default function HedgeFundCard({ fund, selected, onSelect }) {
  const risk = RISK_COLORS[fund.riskLevel];
  const catColor = CATEGORY_COLORS[fund.category] || '#6b7280';

  return (
    <div
      onClick={() => onSelect(selected ? null : fund.id)}
      style={{
        background: '#fff',
        border: `2px solid ${selected ? catColor : '#e5e7eb'}`,
        borderRadius: 16,
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: selected
          ? `0 8px 30px ${catColor}30`
          : '0 1px 4px rgba(0,0,0,0.06)',
        transform: selected ? 'translateY(-2px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Category accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 4,
        background: catColor,
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 32, lineHeight: 1 }}>{fund.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>
              {fund.name}
            </h3>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 999,
              background: `${catColor}18`,
              color: catColor,
              letterSpacing: '0.02em',
            }}>
              {fund.category}
            </span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
            {fund.tagline}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          borderRadius: 999,
          background: risk.bg,
          flexShrink: 0,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: risk.dot }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: risk.text }}>{fund.riskLevel}</span>
        </div>
      </div>

      <p style={{ margin: '0 0 16px', fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
        {fund.description}
      </p>

      {/* Key metrics row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 16,
      }}>
        {[
          { label: 'Avg Return', value: fund.avgAnnualReturn, color: '#059669' },
          { label: 'Fee Structure', value: fund.typicalFee, color: '#6b7280' },
          { label: 'Min Investment', value: fund.minInvestment, color: '#6b7280' },
        ].map(m => (
          <div key={m.label} style={{
            background: '#f9fafb',
            borderRadius: 10,
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Liquidity + AUM */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
          <span>💧</span><span><b style={{ color: '#374151' }}>Liquidity:</b> {fund.liquidity}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
          <span>🏦</span><span><b style={{ color: '#374151' }}>Industry AUM:</b> {fund.aum}</span>
        </div>
      </div>

      {/* Pros & Cons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ✓ Pros
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {fund.pros.slice(0, selected ? fund.pros.length : 3).map((pro, i) => (
              <li key={i} style={{
                fontSize: 12,
                color: '#374151',
                padding: '3px 0',
                paddingLeft: 12,
                position: 'relative',
                lineHeight: 1.4,
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#10b981', fontWeight: 700 }}>+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ✗ Cons
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {fund.cons.slice(0, selected ? fund.cons.length : 3).map((con, i) => (
              <li key={i} style={{
                fontSize: 12,
                color: '#374151',
                padding: '3px 0',
                paddingLeft: 12,
                position: 'relative',
                lineHeight: 1.4,
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#ef4444', fontWeight: 700 }}>−</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!selected && fund.pros.length > 3 && (
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#9ca3af' }}>
          Click to see all {fund.pros.length} pros & cons
        </div>
      )}

      {selected && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Suitable For
            </span>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#374151' }}>{fund.suitableFor}</p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Key Risks
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {fund.keyRisks.map(r => (
                <span key={r} style={{
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: '#fee2e2',
                  color: '#991b1b',
                  fontWeight: 500,
                }}>{r}</span>
              ))}
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Notable Examples
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {fund.notableExamples.map(e => (
                <span key={e} style={{
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: `${catColor}15`,
                  color: catColor,
                  fontWeight: 600,
                }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
