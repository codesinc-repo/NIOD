export function formatMoney(value, currency = 'PKR') {
  const n = Number(value || 0);
  if (currency === 'PKR') return `Rs ${n.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  return `${currency} ${n.toFixed(2)}`;
}

export function formatDate(value) {
  if (!value) return '';
  const d = new Date(typeof value === 'string' ? value.replace(' ', 'T') : value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(typeof value === 'string' ? value.replace(' ', 'T') : value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}
