import React from 'react';

import Hero from './home/Hero';
import CategoryArchive from './home/CategoryArchive';
import ModernWorkspaces from './home/ModernWorkspaces';
import SummerExpedition from './home/SummerExpedition';
import Testimonials from './home/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryArchive />
      <ModernWorkspaces />
      <SummerExpedition />
      <Testimonials />
    </>
  );
};

export default Home;
