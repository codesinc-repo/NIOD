import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDate } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminPosts() {
  const { data, loading, reload } = useApi('/api/admin/posts', { admin: true });
  const rows = data || [];
  async function remove(p) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await api.delete(`/api/admin/posts/${p.id}`, { admin: true });
    reload();
  }
  return (
    <div>
      <PageTitle title="Blog Posts" subtitle={`${rows.length} total`}
        action={<Btn as="link" to="/admin/posts/new" variant="primary">+ New post</Btn>} />
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No posts yet" action={<Btn as="link" to="/admin/posts/new" variant="primary">+ New post</Btn>} />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
                <tr>
                  <th className="text-left px-4 py-2.5">Title</th>
                  <th className="text-left px-4 py-2.5">Category</th>
                  <th className="text-left px-4 py-2.5">Published</th>
                  <th className="text-center px-4 py-2.5">Status</th>
                  <th className="text-right px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3"><Link to={`/admin/posts/${p.id}`} className="font-medium hover:underline">{p.title}</Link><div className="text-xs text-neutral-500">/{p.slug}</div></td>
                    <td className="px-4 py-3 text-neutral-600">{p.category || '—'}</td>
                    <td className="px-4 py-3 text-neutral-600">{formatDate(p.published_at || p.created_at)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${p.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>{p.is_published ? 'Live' : 'Draft'}</span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Btn as="link" to={`/admin/posts/${p.id}`} className="mr-1.5">Edit</Btn>
                      <Btn variant="danger" onClick={() => remove(p)}>Delete</Btn>
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
