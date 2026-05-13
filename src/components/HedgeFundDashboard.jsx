import { useState, useMemo } from 'react';
import { HEDGE_FUNDS, FUND_CATEGORIES, RISK_LEVELS } from '../data/hedgeFunds';
import HedgeFundCard from './HedgeFundCard';
import ComparisonTable from './ComparisonTable';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name A–Z' },
  { value: 'return', label: 'Highest Return' },
  { value: 'risk-asc', label: 'Lowest Risk' },
  { value: 'risk-desc', label: 'Highest Risk' },
];

function StatCard({ value, label, sub }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '16px 20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.12)',
    }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#f1f5f9' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function HedgeFundDashboard() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'table'

  const filtered = useMemo(() => {
    let result = HEDGE_FUNDS.filter(f => {
      const matchCat = activeCategory === 'All' || f.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q
        || f.name.toLowerCase().includes(q)
        || f.tagline.toLowerCase().includes(q)
        || f.description.toLowerCase().includes(q)
        || f.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'return') {
        const getHigh = s => parseFloat(s.split('–')[1] || s);
        return getHigh(b.avgAnnualReturn) - getHigh(a.avgAnnualReturn);
      }
      if (sortBy === 'risk-asc') return RISK_LEVELS[a.riskLevel] - RISK_LEVELS[b.riskLevel];
      if (sortBy === 'risk-desc') return RISK_LEVELS[b.riskLevel] - RISK_LEVELS[a.riskLevel];
      return 0;
    });

    return result;
  }, [activeCategory, sortBy, search]);

  const totalAUM = '$7.4T';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
    }}>
      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
        padding: '40px 32px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>🏦</span>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
              Hedge Fund Strategy Dashboard
            </h1>
          </div>
          <p style={{ margin: '0 0 32px', fontSize: 15, color: '#94a3b8', maxWidth: 600 }}>
            Explore the major hedge fund strategies — understand their mechanics, risk profiles, fees, and the real trade-offs of each approach.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <StatCard value="8" label="Strategies Covered" sub="Across all major categories" />
            <StatCard value={totalAUM} label="Combined Industry AUM" sub="Estimated global exposure" />
            <StatCard value="2 & 20" label="Standard Fee Model" sub="Management + performance fee" />
            <StatCard value="4–20%+" label="Return Range" sub="Annualized, strategy-dependent" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#9ca3af' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search strategies..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
                color: '#111827',
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FUND_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  background: activeCategory === cat ? '#0f172a' : '#f1f5f9',
                  color: activeCategory === cat ? '#f1f5f9' : '#6b7280',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              fontSize: 13,
              color: '#374151',
              background: '#fff',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* View toggle */}
          <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            {[{ v: 'grid', icon: '⊞' }, { v: 'table', icon: '☰' }].map(({ v, icon }) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '7px 12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  background: view === v ? '#0f172a' : '#fff',
                  color: view === v ? '#fff' : '#6b7280',
                  transition: 'all 0.15s',
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#9ca3af', whiteSpace: 'nowrap' }}>
            {filtered.length} of {HEDGE_FUNDS.length} strategies
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔎</div>
            <p style={{ fontSize: 16 }}>No strategies match your filter. Try adjusting your search.</p>
          </div>
        ) : view === 'table' ? (
          <ComparisonTable funds={filtered} />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
            gap: 20,
          }}>
            {filtered.map(fund => (
              <HedgeFundCard
                key={fund.id}
                fund={fund}
                selected={selectedId === fund.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          marginTop: 48,
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
              Educational Purposes Only
            </div>
            <p style={{ margin: 0, fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
              This dashboard is for informational and educational purposes only. The data presented (returns, fees, AUM) are
              estimates based on publicly available industry data and should not be taken as investment advice. Hedge funds
              are unregistered, high-risk investment vehicles available only to accredited and qualified investors.
              Past performance does not guarantee future results. Always consult a licensed financial advisor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
