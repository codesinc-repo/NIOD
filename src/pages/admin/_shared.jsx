// Shared admin UI primitives.
import { Link } from 'react-router-dom';

export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Btn({ as = 'button', children, variant = 'default', className = '', to, ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
    default: 'bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
    danger:  'bg-red-600 text-white hover:bg-red-700',
    ghost:   'text-neutral-700 hover:bg-neutral-100',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (as === 'link' && to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function TextField({ label, hint, error, className = '', ...rest }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-xs font-medium text-neutral-700 mb-1">{label}</span>}
      <input {...rest}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
      {hint && !error && <span className="block mt-1 text-xs text-neutral-500">{hint}</span>}
      {error && <span className="block mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function TextArea({ label, ...rest }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-neutral-700 mb-1">{label}</span>}
      <textarea {...rest}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[100px]" />
    </label>
  );
}

export function Select({ label, options = [], ...rest }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-neutral-700 mb-1">{label}</span>}
      <select {...rest} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900">
        {options.map((o) => <option key={String(o.value)} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span className="text-sm text-neutral-700">{label}</span>
      <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-neutral-900' : 'bg-neutral-300'}`}
        onClick={() => onChange?.(!checked)}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
      </span>
    </label>
  );
}

export function StatusPill({ status }) {
  const colors = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    out_for_delivery: 'bg-purple-100 text-purple-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-neutral-200 text-neutral-700',
    refunded: 'bg-neutral-200 text-neutral-700',
    unpaid: 'bg-amber-100 text-amber-800',
    paid: 'bg-emerald-100 text-emerald-800',
    failed: 'bg-red-100 text-red-700',
  };
  const cls = colors[status] || 'bg-neutral-100 text-neutral-700';
  return <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${cls}`}>{(status || '').replaceAll('_', ' ')}</span>;
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="bg-white border border-dashed border-neutral-300 rounded-xl p-10 text-center">
      <div className="text-base font-medium">{title}</div>
      {hint && <div className="text-sm text-neutral-500 mt-1">{hint}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`bg-white border border-neutral-200 rounded-xl ${className}`}>{children}</div>;
}
