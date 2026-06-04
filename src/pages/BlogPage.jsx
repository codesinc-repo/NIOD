import { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import AnimatedSection from '../components/AnimatedSection';
import { usePosts } from '../lib/hooks';
import { formatDate } from '../lib/format';

export default function BlogPage() {
  const [q, setQ] = useState('');
  const { data, loading } = usePosts({ q, limit: 24 });
  const posts = data?.data || [];
  const featured = posts.find((p) => p.is_featured) || posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <StoreShell>
      <AnimatedSection direction="up">
        <header className="bg-[#f6f4f0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-xs uppercase tracking-widest text-neutral-500">The O. Library</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-light max-w-2xl">Stories, science and skincare guides.</h1>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 max-w-lg flex gap-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white" />
            </form>
          </div>
        </header>
      </AnimatedSection>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? <div className="text-sm text-neutral-500">Loading…</div>
          : posts.length === 0 ? <div className="text-sm text-neutral-500 py-12 text-center">No posts found.</div>
          : (
            <>
              {featured && (
                <AnimatedSection direction="left">
                  <Link to={`/blog/${featured.slug}`} className="block group mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-3 aspect-video bg-neutral-100 rounded-xl overflow-hidden">
                        {featured.image && <img src={featured.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <div className="lg:col-span-2 flex flex-col justify-center">
                        {featured.category && <div className="text-xs uppercase tracking-wider text-neutral-500">{featured.category}</div>}
                        <h2 className="text-3xl font-light mt-2 group-hover:underline">{featured.title}</h2>
                        <div className="mt-3 text-sm text-neutral-500">{featured.author ? `${featured.author} · ` : ''}{formatDate(featured.published_at || featured.created_at)}</div>
                        {featured.excerpt && <p className="mt-4 text-neutral-700">{featured.excerpt}</p>}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              <AnimatedSection direction="right">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {rest.map((p) => (
                    <li key={p.id} className="group">
                      <Link to={`/blog/${p.slug}`}>
                        <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden">
                          {p.image && <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                        </div>
                        {p.category && <div className="mt-3 text-xs uppercase tracking-wider text-neutral-500">{p.category}</div>}
                        <h3 className="mt-1 text-lg font-medium group-hover:underline">{p.title}</h3>
                        <div className="mt-1 text-sm text-neutral-500">{formatDate(p.published_at || p.created_at)}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </>
          )}
      </div>
    </StoreShell>
  );
}
