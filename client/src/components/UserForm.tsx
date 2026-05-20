import { useState, useEffect } from 'react';
import type { CreateUserDto, Department, User } from '../types';

interface UserFormProps {
  initial?: User | null;
  departments: Department[];
  onSubmit: (data: CreateUserDto) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ initial, departments, onSubmit, onCancel }: UserFormProps) {
  const [form, setForm] = useState<CreateUserDto>({
    firstName: '', lastName: '', email: '', phone: '', departmentId: departments[0]?.id ?? 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setForm({
        firstName: initial.firstName,
        lastName: initial.lastName,
        email: initial.email,
        phone: initial.phone ?? '',
        departmentId: initial.departmentId,
      });
    } else {
      setForm({ firstName: '', lastName: '', email: '', phone: '', departmentId: departments[0]?.id ?? 0 });
    }
    setError(null);
  }, [initial, departments]);

  const set = (field: keyof CreateUserDto) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = field === 'departmentId' ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ ...form, phone: form.phone || null });
    } catch (err: unknown) {
      const apiErr = err as { error?: string; message?: string };
      setError(apiErr?.error ?? apiErr?.message ?? 'Помилка збереження');
    } finally {
      setSubmitting(false);
    }
  };

  const isEdit = Boolean(initial);

  return (
    <div style={panel}>
      <div style={panelHeader}>
        <span style={panelTitle}>
          {isEdit ? 'Редагування користувача' : 'Створення користувача'}
        </span>
      </div>
      <p style={hint}>
        {isEdit
          ? 'Змініть потрібні поля та збережіть.'
          : 'Форма використовує локальний стан, а збереження проходить через загальний hook.'}
      </p>

      <form onSubmit={handleSubmit} style={{ padding: '0 1.25rem 1.25rem' }}>
        {error && <div style={errorBox}>{error}</div>}

        <Field label="Ім'я" required>
          <input style={inputStyle} value={form.firstName} onChange={set('firstName')} required placeholder="Наприклад, Олена Коваль" />
        </Field>
        <Field label="Email" required>
          <input style={inputStyle} type="email" value={form.email} onChange={set('email')} required placeholder="user@example.com" />
        </Field>
        <Field label="Прізвище" required>
          <input style={inputStyle} value={form.lastName} onChange={set('lastName')} required />
        </Field>
        <Field label="Телефон">
          <input style={inputStyle} value={form.phone ?? ''} onChange={set('phone')} placeholder="+380..." />
        </Field>
        <Field label="Відділ" required>
          <select style={inputStyle} value={form.departmentId} onChange={set('departmentId')} required>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </Field>

        <div style={btnRow}>
          <button type="submit" style={btnPrimary} disabled={submitting}>
            {submitting ? 'Збереження...' : isEdit ? 'Зберегти зміни' : 'Створити запис'}
          </button>
          <button type="button" onClick={onCancel} style={btnSecondary} disabled={submitting}>
            Очистити форму
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const panel: React.CSSProperties = {
  background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb',
};
const panelHeader: React.CSSProperties = {
  padding: '0.85rem 1.25rem', borderBottom: '1px solid #f3f4f6',
};
const panelTitle: React.CSSProperties = { fontWeight: 600, fontSize: '0.95rem', color: '#111827' };
const hint: React.CSSProperties = {
  fontSize: '0.8rem', color: '#6b7280', margin: '0.75rem 1.25rem 0.5rem',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db',
  borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: '0.3rem',
};
const btnRow: React.CSSProperties = {
  display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap',
};
const btnPrimary: React.CSSProperties = {
  padding: '0.5rem 1.25rem', background: '#2563eb', color: '#fff',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
};
const btnSecondary: React.CSSProperties = {
  padding: '0.5rem 1.25rem', background: '#f3f4f6', color: '#374151',
  border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem',
};
const errorBox: React.CSSProperties = {
  background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c',
  padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '0.75rem', fontSize: '0.875rem',
};
