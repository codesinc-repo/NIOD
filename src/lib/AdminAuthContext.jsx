import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, tokenStore } from './api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!tokenStore.getAdmin()) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    try {
      const me = await api.get('/api/auth/me', { admin: true });
      if (me?.kind === 'admin') setAdmin(me.user);
      else { tokenStore.clearAdmin(); setAdmin(null); }
    } catch {
      tokenStore.clearAdmin();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/api/auth/admin/login', { email, password });
    tokenStore.setAdmin(res.token);
    setAdmin(res.user);
    return res.user;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clearAdmin();
    setAdmin(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, refresh }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
}
