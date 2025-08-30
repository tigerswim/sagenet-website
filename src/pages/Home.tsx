import React from 'react';
import Hero from '../components/home/Hero';
import CustomerLogos from '../components/home/CustomerLogos';
import StatsSection from '../components/home/StatsSection';
import ROIPreview from '../components/home/ROIPreview';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <CustomerLogos />
      <StatsSection />
      <ROIPreview />
    </>
  );
};

export default Home;