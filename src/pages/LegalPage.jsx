// Generic content page (privacy, terms, shipping, sustainability, careers, etc.)
import StoreShell from '../components/StoreShell';

export default function LegalPage({ eyebrow, title, updated, children }) {
  return (
    <StoreShell>
      <header className="bg-[#f6f4f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {eyebrow && <p className="text-xs uppercase tracking-widest text-neutral-500">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl font-light">{title}</h1>
          {updated && <p className="mt-3 text-sm text-neutral-500">Last updated {updated}</p>}
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-neutral max-w-none text-neutral-800 leading-relaxed">
        {children}
      </article>
    </StoreShell>
  );
}
