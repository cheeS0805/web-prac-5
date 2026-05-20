import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useUsers } from '../hooks/useUsers';
import { getDepartments } from '../api/userApi';
import { FilterPanel } from '../components/FilterPanel';
import { UserList } from '../components/UserList';
import { UserForm } from '../components/UserForm';
import { Pagination } from '../components/Pagination';
import { DeleteConfirm } from '../components/DeleteConfirm';
import type { User, Department, CreateUserDto } from '../types';

export function UsersPage() {
  const {
    users, meta, loading, error, success,
    page,
    handlePage, handleCreate, handleUpdate, handleDelete,
  } = useUsers();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const statusLabel = loading ? 'LOADING' : error ? 'ERROR' : success ? 'SUCCESS' : 'IDLE';
  const statusColor = loading ? '#d97706' : error ? '#dc2626' : success ? '#16a34a' : '#6b7280';

  useEffect(() => {
    getDepartments().then(setDepartments).catch(() => {});
  }, []);

  const openEdit = (u: User) => {
    setEditUser(u);
    setFormMode('edit');
    setDeleteUser(null);
  };

  const openDelete = (u: User) => {
    setDeleteUser(u);
    setDeleteError(null);
    setEditUser(null);
    setFormMode('create');
  };

  const cancelForm = () => {
    setEditUser(null);
    setFormMode('create');
  };

  const handleSubmit = async (data: CreateUserDto) => {
    if (formMode === 'edit' && editUser) {
      await handleUpdate(editUser.id, data);
    } else {
      await handleCreate(data);
    }
    setEditUser(null);
    setFormMode('create');
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;
    setDeleteError(null);
    try {
      await handleDelete(deleteUser.id);
      setDeleteUser(null);
    } catch (err: unknown) {
      const e = err as { error?: string; message?: string };
      setDeleteError(e?.error ?? e?.message ?? 'Помилка видалення');
    }
  };

  return (
    <div style={pageWrapper}>
      {/* Header */}
      <div style={header}>
        <div>
          <div style={breadcrumb}>ПРАКТИЧНА РОБОТА 05</div>
          <h1 style={title}>Керування користувацькими даними та станом інтерфейсу</h1>
          <p style={subtitle}>
            Референсний інтерфейс демонструє, як компоненти подання працюють через hook
            координації, окремий рівень стану та модуль доступу до даних.
          </p>
        </div>
        <div style={statusPanel}>
          <div style={statusLabel_}>Стан запиту</div>
          <div style={{ ...statusValue, color: statusColor }}>{statusLabel}</div>
          <div style={statusHint}>Зміни автоматично синхронізують список.</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={columns}>
        {/* LEFT COLUMN */}
        <div style={leftCol}>
          <FilterPanel />
          <UserList
            users={users}
            loading={loading}
            error={error}
            success={success}
            onEdit={openEdit}
            onDelete={openDelete}
          />
          <Pagination
            page={page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
            onPageChange={handlePage}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div style={rightCol}>
          {deleteUser ? (
            <DeleteConfirm
              user={deleteUser}
              loading={loading}
              error={deleteError}
              onConfirm={confirmDelete}
              onCancel={() => setDeleteUser(null)}
            />
          ) : (
            <UserForm
              initial={editUser}
              departments={departments}
              onSubmit={handleSubmit}
              onCancel={cancelForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  minHeight: '100vh', background: '#f3f4f6', padding: '1.5rem 1rem',
};
const header: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
  background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb',
  padding: '1.25rem 1.5rem', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap',
  maxWidth: '1200px', margin: '0 auto 1.25rem',
};
const breadcrumb: React.CSSProperties = {
  fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.35rem',
  textTransform: 'uppercase', letterSpacing: '0.04em',
};
const title: React.CSSProperties = {
  fontSize: '1.3rem', fontWeight: 700, color: '#111827', margin: '0 0 0.35rem',
};
const subtitle: React.CSSProperties = {
  fontSize: '0.82rem', color: '#6b7280', margin: 0, maxWidth: '480px',
};
const statusPanel: React.CSSProperties = {
  border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.9rem 1.25rem',
  minWidth: '180px', textAlign: 'right', flexShrink: 0,
};
const statusLabel_: React.CSSProperties = {
  fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem',
};
const statusValue: React.CSSProperties = {
  fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.2rem',
};
const statusHint: React.CSSProperties = { fontSize: '0.75rem', color: '#6b7280' };
const columns: React.CSSProperties = {
  display: 'flex', gap: '1rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start',
};
const leftCol: React.CSSProperties = { flex: '1 1 55%', minWidth: 0 };
const rightCol: React.CSSProperties = { flex: '1 1 40%', minWidth: '280px' };
