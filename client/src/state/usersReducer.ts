import type { User, PaginatedResponse } from '../types';

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersState {
  data: {
    users: User[];
    selectedUser: User | null;
    meta: PaginatedMeta;
  };
  ui: {
    search: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    page: number;
  };
  status: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

export type UsersAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: PaginatedResponse<User> }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: string; sortOrder: 'asc' | 'desc' } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SELECT_USER'; payload: User | null }
  | { type: 'CLEAR_STATUS' };

export const initialState: UsersState = {
  data: {
    users: [],
    selectedUser: null,
    meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
  },
  ui: {
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
  },
  status: {
    loading: false,
    error: null,
    success: false,
  },
};

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        status: { loading: true, error: null, success: false },
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          users: action.payload.data,
          meta: action.payload.meta,
        },
        status: { loading: false, error: null, success: true },
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        status: { loading: false, error: action.payload, success: false },
      };

    case 'SET_SEARCH':
      return {
        ...state,
        ui: { ...state.ui, search: action.payload, page: 1 },
      };

    case 'SET_SORT':
      return {
        ...state,
        ui: { ...state.ui, ...action.payload, page: 1 },
      };

    case 'SET_PAGE':
      return {
        ...state,
        ui: { ...state.ui, page: action.payload },
      };

    case 'SELECT_USER':
      return {
        ...state,
        data: { ...state.data, selectedUser: action.payload },
      };

    case 'CLEAR_STATUS':
      return {
        ...state,
        status: { ...state.status, success: false, error: null },
      };

    default:
      return state;
  }
}
