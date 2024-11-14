// src/components/RouteTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageView } from '../Pixel/metaPixel';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    pageView();
  }, [location]);

  return null;
};

export default RouteTracker;