import React from 'react';
import MainSection from '@/components/main/MainSection';
import ServicesSection from '@/components/main/ServicesSection';
import MainFooter from '@/components/common/layout/footer/MainFooter';

export default function page() {
  return (
    <>
      <MainSection />
      <ServicesSection />
      <MainFooter />
    </>
  );
}
