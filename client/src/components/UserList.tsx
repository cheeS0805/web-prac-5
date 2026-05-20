import type { User } from '../types';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserList({ users, loading, error, success, onEdit, onDelete }: UserListProps) {
  const statusLabel = loading ? 'LOADING' : error ? 'ERROR' : success ? 'SUCCESS' : '—';
  const statusColor = loading ? '#d97706' : error ? '#dc2626' : success ? '#16a34a' : '#6b7280';

  return (
    <div style={panel}>
      <div style={panelHeader}>
        <span style={panelTitle}>Список користувачів</span>
        <span style={{ ...statusBadge, color: statusColor, borderColor: statusColor }}>
          {statusLabel}
        </span>
      </div>

      {error && (
        <div style={errorBanner}>{error}</div>
      )}

      {loading ? (
        <div style={center}>Завантаження...</div>
      ) : users.length === 0 ? (
        <div style={center}>Користувачів не знайдено</div>
      ) : (
        <div>
          {users.map((u) => (
            <div key={u.id} style={userCard}>
              <div style={userInfo}>
                <div style={userName}>{u.firstName} {u.lastName}</div>
                <div style={userEmail}>{u.email}</div>
                {u.phone && <div style={userPhone}>{u.phone}</div>}
                <span style={deptBadge}>{u.department.name}</span>
              </div>
              <div style={actions}>
                <button onClick={() => onEdit(u)} style={editBtn}>Редагувати</button>
                <button onClick={() => onDelete(u)} style={deleteBtn}>Видалити</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const panel: React.CSSProperties = {
  background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb',
};
const panelHeader: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0.85rem 1.25rem', borderBottom: '1px solid #f3f4f6',
};
const panelTitle: React.CSSProperties = { fontWeight: 600, fontSize: '0.95rem', color: '#111827' };
const statusBadge: React.CSSProperties = {
  fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem',
  borderRadius: '4px', border: '1px solid', letterSpacing: '0.03em',
};
const errorBanner: React.CSSProperties = {
  background: '#fef2f2', borderBottom: '1px solid #fca5a5', color: '#b91c1c',
  padding: '0.6rem 1.25rem', fontSize: '0.875rem',
};
const center: React.CSSProperties = {
  textAlign: 'center', padding: '2.5rem', color: '#9ca3af', fontSize: '0.9rem',
};
const userCard: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
  padding: '0.9rem 1.25rem', borderBottom: '1px solid #f3f4f6',
};
const userInfo: React.CSSProperties = { flex: 1 };
const userName: React.CSSProperties = { fontWeight: 600, fontSize: '0.95rem', color: '#111827', marginBottom: '0.2rem' };
const userEmail: React.CSSProperties = { fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' };
const userPhone: React.CSSProperties = { fontSize: '0.82rem', color: '#9ca3af', marginBottom: '0.3rem' };
const deptBadge: React.CSSProperties = {
  display: 'inline-block', background: '#eff6ff', color: '#1d4ed8',
  padding: '0.15rem 0.55rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 500,
};
const actions: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '0.4rem', marginLeft: '1rem', flexShrink: 0,
};
const editBtn: React.CSSProperties = {
  padding: '0.35rem 0.85rem', background: '#eff6ff', color: '#1d4ed8',
  border: '1px solid #bfdbfe', borderRadius: '5px', cursor: 'pointer', fontSize: '0.82rem',
};
const deleteBtn: React.CSSProperties = {
  padding: '0.35rem 0.85rem', background: '#fef2f2', color: '#b91c1c',
  border: '1px solid #fecaca', borderRadius: '5px', cursor: 'pointer', fontSize: '0.82rem',
};
