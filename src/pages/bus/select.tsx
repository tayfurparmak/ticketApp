import BusSeatSelection from '@/components/busSelect';
import { MainLayout } from '@/layout/mainLayout';
import React from 'react';

const ExamplePage: React.FC = () => {
  const formData = {
    kalkis: 'İstanbul',
    varis: 'Ankara',
    tarih: '2024-01-15',
    saat: '14:30',
    bosKoltuk: 50,
    fiyat: '150 TL',
  };

  return (
    <MainLayout>
      <div
        className='bg-no-repeat bg-cover bg-center  relative'
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className='absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0'></div>
        <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center z-10'>
          <BusSeatSelection formData={formData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamplePage;
