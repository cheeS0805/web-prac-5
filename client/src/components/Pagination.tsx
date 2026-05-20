interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div style={wrapper}>
      <div style={info}>
        <span style={infoLabel}>Пагінація</span>
        <span style={infoText}>Усього записів: {total}. Поточна сторінка: {page} із {totalPages}.</span>
      </div>
      <div style={controls}>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} style={btn}>
          Попередня
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const p = totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i;
          if (p > totalPages) return null;
          return (
            <button key={p} onClick={() => onPageChange(p)} style={{ ...btn, ...(p === page ? active : {}) }}>
              {p}
            </button>
          );
        })}
        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages || totalPages === 0} style={btn}>
          Наступна
        </button>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{from}–{to} з {total}</span>
    </div>
  );
}

const wrapper: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0.85rem 1.25rem', background: '#fff', borderRadius: '8px',
  border: '1px solid #e5e7eb', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem',
};
const info: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.1rem' };
const infoLabel: React.CSSProperties = { fontWeight: 600, fontSize: '0.85rem', color: '#111827' };
const infoText: React.CSSProperties = { fontSize: '0.78rem', color: '#6b7280' };
const controls: React.CSSProperties = { display: 'flex', gap: '0.35rem', flexWrap: 'wrap' };
const btn: React.CSSProperties = {
  padding: '0.35rem 0.75rem', border: '1px solid #d1d5db', background: '#fff',
  borderRadius: '5px', cursor: 'pointer', fontSize: '0.82rem', color: '#374151',
};
const active: React.CSSProperties = { background: '#2563eb', color: '#fff', borderColor: '#2563eb' };
