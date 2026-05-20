import type { User } from '../types';

interface DeleteConfirmProps {
  user: User;
  loading: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirm({ user, loading, error, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div style={panel}>
      <div style={panelHeader}>
        <span style={panelTitle}>Підтвердження видалення</span>
      </div>
      <div style={{ padding: '1rem 1.25rem' }}>
        <p style={text}>
          Ви справді хочете видалити користувача{' '}
          <strong>{user.firstName} {user.lastName}</strong>? Цю дію неможливо скасувати.
        </p>
        {error && <div style={errorBox}>{error}</div>}
        <div style={btnRow}>
          <button onClick={onConfirm} style={btnDanger} disabled={loading}>
            {loading ? 'Видалення...' : 'Видалити'}
          </button>
          <button onClick={onCancel} style={btnSecondary} disabled={loading}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}

const panel: React.CSSProperties = {
  background: '#fff', borderRadius: '8px', border: '1px solid #fecaca',
};
const panelHeader: React.CSSProperties = {
  padding: '0.85rem 1.25rem', borderBottom: '1px solid #fee2e2',
  background: '#fef2f2', borderRadius: '8px 8px 0 0',
};
const panelTitle: React.CSSProperties = { fontWeight: 600, fontSize: '0.95rem', color: '#b91c1c' };
const text: React.CSSProperties = { color: '#374151', marginBottom: '1rem', fontSize: '0.9rem' };
const errorBox: React.CSSProperties = {
  background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c',
  padding: '0.5rem', borderRadius: '6px', marginBottom: '0.75rem', fontSize: '0.875rem',
};
const btnRow: React.CSSProperties = { display: 'flex', gap: '0.5rem' };
const btnDanger: React.CSSProperties = {
  padding: '0.5rem 1.25rem', background: '#dc2626', color: '#fff',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600,
};
const btnSecondary: React.CSSProperties = {
  padding: '0.5rem 1.25rem', background: '#f3f4f6', color: '#374151',
  border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer',
};
