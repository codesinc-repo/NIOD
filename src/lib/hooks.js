import { useEffect, useState, useCallback } from 'react';
import { api } from './api';

export function useApi(path, opts) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const d = await api.get(path, opts);
      setData(d);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [path, JSON.stringify(opts || {})]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (path) reload(); }, [reload, path]);
  return { data, error, loading, reload, setData };
}

export function useHome() {
  return useApi('/api/home');
}

export function useProducts(params = {}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  const path = `/api/products${qs.toString() ? `?${qs.toString()}` : ''}`;
  return useApi(path);
}

export function useProduct(slug) {
  return useApi(slug ? `/api/products/${slug}` : null);
}

export function useCategory(slug) {
  return useApi(slug ? `/api/categories/${slug}` : null);
}

export function useCategories() {
  return useApi('/api/categories');
}

export function usePosts(params = {}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
  return useApi(`/api/posts${qs.toString() ? `?${qs.toString()}` : ''}`);
}

export function usePost(slug) {
  return useApi(slug ? `/api/posts/${slug}` : null);
}
