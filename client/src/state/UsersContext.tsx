import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { usersReducer, initialState } from './usersReducer';
import type { UsersState, UsersAction } from './usersReducer';

interface UsersContextValue {
  state: UsersState;
  dispatch: React.Dispatch<UsersAction>;
}

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext(): UsersContextValue {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsersContext must be used within UsersProvider');
  return ctx;
}
