import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';

const NAV_LINKS = [
  { to: '/category/best-sellers',           label: 'Bestsellers' },
  { to: '/category/newfeatured',            label: 'New & Featured' },
  { to: '/category/skincare',               label: 'Skincare' },
  { to: '/category/body-hair',              label: 'Body + Hair' },
  { to: '/category/skincare/skincare-sets', label: 'Sets & Collections' },
  { to: '/blog',                            label: 'The O. Library' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onUser() {
    if (!user) navigate('/login');
    else setUserMenuOpen((v) => !v);
  }

  return (
    <header className="w-full font-['Inter',sans-serif] bg-white relative z-50">
      <div className="bg-black text-white py-[10px] px-4 md:px-6 flex items-center justify-between">
        <div className="hidden md:flex flex-1"></div>
        <div className="flex flex-1 md:flex-none items-center justify-center md:justify-start gap-4 md:gap-6">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-80"><path d="m15 18-6-6 6-6" /></svg>
          <span className="text-[9.5px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-center">
            Cash on Delivery available across Pakistan.
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-80"><path d="m9 18 6-6-6-6" /></svg>
        </div>
        <div className="flex-1 flex justify-end items-center gap-5 md:gap-7">
          <Link to="/" className="hidden sm:block text-white hover:opacity-70" title="Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></svg>
          </Link>

          <div className="relative">
            <button onClick={onUser} className="text-white hover:opacity-70 flex items-center" title={user ? user.email : 'Sign in'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>
            {user && userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-neutral-900 rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-neutral-100">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs text-neutral-500 truncate">{user.email}</div>
                </div>
                <Link to="/account" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-neutral-50">Account</Link>
                <Link to="/account/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-neutral-50">Orders</Link>
                <Link to="/account/wishlist" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-neutral-50">Wishlist</Link>
                <button onClick={() => { setUserMenuOpen(false); logout(); navigate('/'); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 border-t border-neutral-100">Sign out</button>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative text-white hover:opacity-70" title="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-white text-black rounded-full text-[10px] font-bold flex items-center justify-center px-1">{count}</span>
          </Link>
        </div>
      </div>

      <div className="h-[70px] md:h-[90px] flex items-center">
        <div className="w-full flex items-center justify-between md:justify-center px-4 md:px-0">
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>

          <Link to="/" className="md:hidden font-bold tracking-widest">PARESHEY</Link>

          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-14">
            {NAV_LINKS.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}
                className={({ isActive }) => `border-b-4 pb-[27px] pt-[31px] text-[15px] font-bold tracking-tight transition-opacity hover:opacity-50 lg:text-[17px] ${isActive ? 'border-black' : 'border-transparent'}`}>
                {n.label}
              </NavLink>
            ))}
          </div>

          <Link to="/category/best-sellers" className="md:ml-10 border border-black rounded-full px-6 md:px-10 py-2.5 md:py-4 text-[14px] md:text-[16px] font-bold hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap">
            Build My Regimen
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl md:hidden py-6 flex flex-col items-center gap-5">
          {NAV_LINKS.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setIsMenuOpen(false)}
              className="text-[18px] font-bold tracking-tight py-2 w-full text-center hover:bg-gray-50">
              {n.label}
            </Link>
          ))}
          {!user && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[16px] py-2 w-full text-center text-neutral-600">Sign in</Link>}
        </div>
      )}
    </header>
  );
};

export default Header;
