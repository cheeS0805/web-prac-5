import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  fetchUsers,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
} from '../store/usersSlice';
import { setSearch, setSort, setPage } from '../store/uiSlice';
import type { CreateUserDto } from '../types';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((s: RootState) => s.users.users);
  const meta = useSelector((s: RootState) => s.users.meta);
  const loading = useSelector((s: RootState) => s.users.loading);
  const error = useSelector((s: RootState) => s.users.error);
  const success = useSelector((s: RootState) => s.users.success);
  const selectedUser = useSelector((s: RootState) => s.users.selectedUser);

  const search = useSelector((s: RootState) => s.ui.search);
  const sortBy = useSelector((s: RootState) => s.ui.sortBy);
  const sortOrder = useSelector((s: RootState) => s.ui.sortOrder);
  const page = useSelector((s: RootState) => s.ui.page);

  const load = useCallback(() => {
    dispatch(fetchUsers({ search, sortBy, sortOrder, page, limit: 10 }));
  }, [dispatch, search, sortBy, sortOrder, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (val: string) => dispatch(setSearch(val));
  const handleSort = (col: string) => {
    if (col === sortBy) {
      dispatch(setSort({ sortBy: col, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' }));
    } else {
      dispatch(setSort({ sortBy: col, sortOrder: 'asc' }));
    }
  };
  const handlePage = (p: number) => dispatch(setPage(p));

  const handleCreate = async (data: CreateUserDto) => {
    await dispatch(createUserThunk(data)).unwrap();
    load();
  };

  const handleUpdate = async (id: number, data: CreateUserDto) => {
    await dispatch(updateUserThunk({ id, data })).unwrap();
    load();
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteUserThunk(id)).unwrap();
    load();
  };

  return {
    users, meta, loading, error, success, selectedUser,
    search, sortBy, sortOrder, page,
    handleSearch, handleSort, handlePage,
    handleCreate, handleUpdate, handleDelete,
    reload: load,
  };
}
