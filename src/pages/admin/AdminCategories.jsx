import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminCategories() {
  const { data, loading, reload } = useApi('/api/admin/categories', { admin: true });
  const rows = data || [];

  async function remove(c) {
    if (!confirm(`Delete category "${c.name}"?`)) return;
    await api.delete(`/api/admin/categories/${c.id}`, { admin: true });
    reload();
  }

  return (
    <div>
      <PageTitle title="Categories" subtitle={`${rows.length} total`}
        action={<Btn as="link" to="/admin/categories/new" variant="primary">+ New category</Btn>} />
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-neutral-500">Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState title="No categories yet" action={<Btn as="link" to="/admin/categories/new" variant="primary">+ New category</Btn>} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
              <tr>
                <th className="text-left px-4 py-2.5">Name</th>
                <th className="text-left px-4 py-2.5">Slug</th>
                <th className="text-left px-4 py-2.5">Parent</th>
                <th className="text-right px-4 py-2.5">Sort</th>
                <th className="text-center px-4 py-2.5">Active</th>
                <th className="text-right px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="px-4 py-3"><Link to={`/admin/categories/${c.id}`} className="font-medium hover:underline">{c.name}</Link></td>
                  <td className="px-4 py-3 text-neutral-500">{c.slug}</td>
                  <td className="px-4 py-3 text-neutral-500">{rows.find((p) => p.id === c.parent_id)?.name || '—'}</td>
                  <td className="px-4 py-3 text-right">{c.sort_order}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${c.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>{c.is_active ? 'Active' : 'Hidden'}</span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Btn as="link" to={`/admin/categories/${c.id}`} className="mr-1.5">Edit</Btn>
                    <Btn variant="danger" onClick={() => remove(c)}>Delete</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
