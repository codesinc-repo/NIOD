import { Link, useParams } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { usePost } from '../lib/hooks';
import { formatDate } from '../lib/format';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data, loading } = usePost(slug);
  return (
    <StoreShell>
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/blog" className="text-sm text-neutral-500 hover:underline">← All articles</Link>
        {loading ? <div className="mt-6 text-sm text-neutral-500">Loading…</div>
          : !data ? <div className="mt-6 text-sm text-neutral-600">Post not found.</div>
          : (
            <>
              {data.category && <div className="text-xs uppercase tracking-wider text-neutral-500 mt-6 mb-2">{data.category}</div>}
              <h1 className="text-4xl font-light leading-tight">{data.title}</h1>
              <div className="mt-2 text-sm text-neutral-500">{data.author ? `${data.author} · ` : ''}{formatDate(data.published_at || data.created_at)}</div>
              {data.image && <img src={data.image} alt="" className="mt-8 w-full rounded-xl object-cover aspect-video bg-neutral-50" />}
              {data.excerpt && <p className="mt-6 text-lg text-neutral-700">{data.excerpt}</p>}
              {data.body && (
                <div className="mt-6 prose prose-neutral max-w-none text-neutral-700" dangerouslySetInnerHTML={{ __html: data.body }} />
              )}
            </>
          )}
      </article>
    </StoreShell>
  );
}
