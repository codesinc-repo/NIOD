import { useEffect, useState } from 'react';
import logoUrl from '../assets/logops.png';
import './AppLoader.css';

const AppLoader = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsDone(true);
      const exitTimeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(exitTimeout);
    }, 900);

    return () => clearTimeout(showTimeout);
  }, [onComplete]);

  return (
    <div className={`app-loader-container ${isDone ? 'fade-out' : ''}`}>
      <div className="loader-ring">
        <img src={logoUrl} alt="Pareshey Organics" className="loader-logo" />
      </div>
    </div>
  );
};

export default AppLoader;
