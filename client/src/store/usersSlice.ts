import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import type { User, UsersQueryParams, CreateUserDto } from '../types';
import type { PaginatedMeta } from '../state/usersReducer';

interface UsersSliceState {
  users: User[];
  selectedUser: User | null;
  meta: PaginatedMeta;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UsersSliceState = {
  users: [],
  selectedUser: null,
  meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
  loading: false,
  error: null,
  success: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: UsersQueryParams) => {
    const result = await getUsers(params);
    return result;
  }
);

export const createUserThunk = createAsyncThunk(
  'users/createUser',
  async (data: CreateUserDto) => {
    return await createUser(data);
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }: { id: number; data: CreateUserDto }) => {
    return await updateUser(id, data);
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    await deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearStatus(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
        state.success = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Помилка завантаження';
        state.success = false;
      })
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Помилка створення';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.selectedUser = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Помилка оновлення';
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Помилка видалення';
      });
  },
});

export const { selectUser, clearStatus } = usersSlice.actions;
export default usersSlice.reducer;
