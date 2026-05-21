import { useEffect, useState } from 'react';
import Header from './components/Header';
import HomeSections from './components/HomeSections';
import AppLoader from './components/AppLoader';
import BestSellersPage from './pages/BestSellersPage';
import BodyHairPage from './pages/BodyHairPage';
import NewFeaturedPage from './pages/NewFeaturedPage';
import SetsCollectionsPage from './pages/SetsCollectionsPage';
import SkincarePage from './pages/SkincarePage';
import BlogPage from './pages/BlogPage';
import LogoShowcase from './pages/LogoShowcase';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const path = window.location.pathname;

  if (isLoading) {
    return <AppLoader onComplete={() => setIsLoading(false)} />;
  }

  let content;
  if (path === '/category/best-sellers') {
    content = <BestSellersPage />;
  } else if (path === '/category/newfeatured') {
    content = <NewFeaturedPage />;
  } else if (path === '/category/skincare') {
    content = <SkincarePage />;
  } else if (path === '/category/body-hair') {
    content = <BodyHairPage />;
  } else if (path === '/category/skincare/skincare-sets') {
    content = <SetsCollectionsPage />;
  } else if (path === '/blog') {
    content = <BlogPage />;
  } else if (path === '/logo-showcase') {
    content = <LogoShowcase />;
  } else {
    content = (
      <div className="min-h-screen bg-white">
        <Header />
        <HomeSections />
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      {content}
    </div>
  );
}

export default App;
