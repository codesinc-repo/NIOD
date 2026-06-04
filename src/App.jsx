import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthProvider } from './lib/AuthContext';
import { CartProvider } from './lib/CartContext';
import { AdminAuthProvider, useAdminAuth } from './lib/AdminAuthContext';

import StoreShell from './components/StoreShell';
import AppLoader from './components/AppLoader';

// Public pages
import HomeSections from './components/HomeSections';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LogoShowcase from './pages/LogoShowcase';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ShippingPage from './pages/ShippingPage';
import FaqPage from './pages/FaqPage';
import SustainabilityPage from './pages/SustainabilityPage';
import CareersPage from './pages/CareersPage';

// Cart / checkout / account
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AccountOrdersPage from './pages/AccountOrdersPage';
import AccountAddressesPage from './pages/AccountAddressesPage';
import AccountWishlistPage from './pages/AccountWishlistPage';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCategoryEdit from './pages/admin/AdminCategoryEdit';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostEdit from './pages/admin/AdminPostEdit';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCustomerDetail from './pages/admin/AdminCustomerDetail';
import AdminSimpleList from './pages/admin/AdminSimpleList';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import AdminContactMessages from './pages/admin/AdminContactMessages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminMedia from './pages/admin/AdminMedia';

import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedAdmin({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">Loading…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

function Home() { return <StoreShell><HomeSections /></StoreShell>; }

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (isLoading) return <AppLoader />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AdminAuthProvider>
            <ScrollToTop />
            <Routes>
              {/* ----- STORE ----- */}
              <Route path="/" element={<Home />} />
              <Route path="/category/skincare/skincare-sets" element={<Navigate to="/category/skincare-sets" replace />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/logo-showcase" element={<LogoShowcase />} />

              {/* Content pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/careers" element={<CareersPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<AccountOrdersPage />} />
              <Route path="/account/addresses" element={<AccountAddressesPage />} />
              <Route path="/account/wishlist" element={<AccountWishlistPage />} />

              {/* ----- ADMIN ----- */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductEdit />} />
                <Route path="products/:id" element={<AdminProductEdit />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="categories/new" element={<AdminCategoryEdit />} />
                <Route path="categories/:id" element={<AdminCategoryEdit />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="posts/new" element={<AdminPostEdit />} />
                <Route path="posts/:id" element={<AdminPostEdit />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="customers/:id" element={<AdminCustomerDetail />} />
                <Route path="concerns" element={<AdminSimpleList resource="concerns" title="Concerns" fields={[{ key: 'name', label: 'Name', required: true }, { key: 'image', label: 'Image URL', kind: 'image' }, { key: 'sort_order', label: 'Sort', kind: 'number' }, { key: 'is_active', label: 'Active', kind: 'bool' }]} />} />
                <Route path="member-benefits" element={<AdminSimpleList resource="member-benefits" title="Member Benefits" fields={[{ key: 'text', label: 'Text', required: true }, { key: 'image', label: 'Image URL', kind: 'image' }, { key: 'sort_order', label: 'Sort', kind: 'number' }, { key: 'is_active', label: 'Active', kind: 'bool' }]} />} />
                <Route path="social-cards" element={<AdminSimpleList resource="social-cards" title="Social Cards" fields={[{ key: 'title', label: 'Title', required: true }, { key: 'image', label: 'Image URL', kind: 'image' }, { key: 'product_image', label: 'Product Image URL', kind: 'image' }, { key: 'link_url', label: 'Link URL' }, { key: 'sort_order', label: 'Sort', kind: 'number' }, { key: 'is_active', label: 'Active', kind: 'bool' }]} />} />
                <Route path="scientists" element={<AdminSimpleList resource="scientists" title="Scientists" fields={[{ key: 'name', label: 'Name', required: true }, { key: 'title', label: 'Title' }, { key: 'image', label: 'Image URL', kind: 'image' }, { key: 'sort_order', label: 'Sort', kind: 'number' }, { key: 'is_active', label: 'Active', kind: 'bool' }]} />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="subscribers" element={<AdminSubscribers />} />
                <Route path="contact-messages" element={<AdminContactMessages />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="media" element={<AdminMedia />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AdminAuthProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
