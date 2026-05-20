import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'users_ui_params';

interface UiState {
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
}

function loadFromStorage(): Partial<UiState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<UiState>) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: UiState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      search: state.search,
      page: state.page,
    }));
  } catch {
    // ignore
  }
}

const saved = loadFromStorage();

const initialState: UiState = {
  search: saved.search ?? '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: saved.page ?? 1,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      saveToStorage(state);
    },
    setSort(state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      saveToStorage(state);
    },
    resetFilters(state) {
      state.search = '';
      state.sortBy = 'createdAt';
      state.sortOrder = 'desc';
      state.page = 1;
      saveToStorage(state);
    },
  },
});

export const { setSearch, setSort, setPage, resetFilters } = uiSlice.actions;
export default uiSlice.reducer;
