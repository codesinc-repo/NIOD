import Header from './Header';
import Footer from './Footer';

export default function StoreShell({ children, hideFooter = false }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
      {!hideFooter && <Footer />}
    </div>
  );
}
