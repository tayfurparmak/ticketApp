
import CreditCardForm from '@/components/paypal';
import { MainLayout } from '@/layout/mainLayout';
import React from 'react';


const ExamplePage: React.FC = () => {


  return (
    <MainLayout>
          <div
          className="bg-no-repeat bg-cover bg-center  relative"
             style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-20 inset-0 z-0"></div>
    <div className='min-h-screen   w-2/4 p-20 '>
        
      <CreditCardForm/>
    </div>  </div>
    </MainLayout>

  );
};

export default ExamplePage;
