import type { ApiError } from '../types';

export function normalizeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  const apiErr = err as ApiError;
  if (apiErr?.error) return apiErr.error;
  return 'Невідома помилка';
}
