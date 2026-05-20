import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setSearch, setSort, resetFilters } from '../store/uiSlice';

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Дата створення' },
  { value: 'firstName', label: "Ім'я" },
  { value: 'lastName', label: 'Прізвище' },
  { value: 'email', label: 'Email' },
];

export function FilterPanel() {
  const dispatch = useDispatch();
  const search = useSelector((s: RootState) => s.ui.search);
  const sortBy = useSelector((s: RootState) => s.ui.sortBy);
  const sortOrder = useSelector((s: RootState) => s.ui.sortOrder);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => { setLocalSearch(search); }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) dispatch(setSearch(localSearch));
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, search, dispatch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort({ sortBy: e.target.value, sortOrder }));
  };

  const toggleOrder = () => {
    dispatch(setSort({ sortBy, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  const handleReset = () => {
    setLocalSearch('');
    dispatch(resetFilters());
  };

  return (
    <div style={panel}>
      <div style={panelHeader}>
        <span style={panelTitle}>Пошук і фільтрація</span>
        <button onClick={handleReset} style={resetBtn}>Скинути вибір</button>
      </div>
      <p style={hint}>Фільтр зберігається у стані та автоматично викликає повторне завантаження списку.</p>
      <input
        style={inputStyle}
        type="search"
        placeholder="Пошук за ім'ям, email або роллю"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <div style={sortRow}>
        <select style={selectStyle} value={sortBy} onChange={handleSortChange}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button onClick={toggleOrder} style={orderBtn} title={sortOrder === 'asc' ? 'За зростанням' : 'За спаданням'}>
          {sortOrder === 'asc' ? '↑ Зрост.' : '↓ Спад.'}
        </button>
      </div>
    </div>
  );
}

const panel: React.CSSProperties = {
  background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb',
  padding: '1rem 1.25rem', marginBottom: '1rem',
};
const panelHeader: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem',
};
const panelTitle: React.CSSProperties = { fontWeight: 600, fontSize: '0.95rem', color: '#111827' };
const hint: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.75rem' };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db',
  borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box', marginBottom: '0.6rem',
};
const sortRow: React.CSSProperties = { display: 'flex', gap: '0.5rem' };
const selectStyle: React.CSSProperties = {
  flex: 1, padding: '0.45rem 0.7rem', border: '1px solid #d1d5db',
  borderRadius: '6px', fontSize: '0.875rem', background: '#fff',
};
const orderBtn: React.CSSProperties = {
  padding: '0.45rem 0.9rem', border: '1px solid #d1d5db',
  borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem',
  background: '#f9fafb', color: '#374151', whiteSpace: 'nowrap',
};
const resetBtn: React.CSSProperties = {
  padding: '0.3rem 0.7rem', border: '1px solid #d1d5db',
  borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem',
  background: '#f3f4f6', color: '#374151',
};
