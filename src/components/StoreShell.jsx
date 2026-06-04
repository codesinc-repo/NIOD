import Header from './Header';
import Footer from './Footer';
import ChatButton from './ChatButton';

export default function StoreShell({ children, hideFooter = false }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
      {!hideFooter && <Footer />}
      <ChatButton />
    </div>
  );
}
