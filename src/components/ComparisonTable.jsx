import { RISK_LEVELS } from '../data/hedgeFunds';

const RISK_BAR_COLORS = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#ef4444',
  'Very High': '#8b5cf6',
};

function RiskBar({ level }) {
  const score = RISK_LEVELS[level] || 1;
  const color = RISK_BAR_COLORS[level];
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 14, height: 8,
          borderRadius: 2,
          background: i <= score ? color : '#e5e7eb',
          transition: 'background 0.2s',
        }} />
      ))}
      <span style={{ marginLeft: 6, fontSize: 11, color: '#6b7280' }}>{level}</span>
    </div>
  );
}

export default function ComparisonTable({ funds }) {
  if (!funds.length) return null;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f3f4f6',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>
          Strategy Comparison
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>
          Side-by-side view of all hedge fund strategies
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Strategy', 'Category', 'Avg Return', 'Fee', 'Min Invest', 'Liquidity', 'Risk', 'AUM'].map(h => (
                <th key={h} style={{
                  padding: '10px 14px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#6b7280',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  borderBottom: '1px solid #e5e7eb',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr key={fund.id} style={{
                background: idx % 2 === 0 ? '#fff' : '#fafafa',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 18, marginRight: 8 }}>{fund.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{fund.name}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{fund.category}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>{fund.avgAnnualReturn}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, color: '#374151', fontFamily: 'monospace' }}>{fund.typicalFee}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{fund.minInvestment}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{fund.liquidity}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <RiskBar level={fund.riskLevel} />
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{fund.aum}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
