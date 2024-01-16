'use client'
import FlightForm from '@/components/form';
import { MainLayout } from '@/layout/mainLayout';
import pb from '@/lib/pocketbase';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const ExamplePage: React.FC = () => {
  const router = useRouter();
  const { to, from, date } = router.query;
  const [busTickets, setBusTickets]:any = React.useState({});
  async function getBusTickets() {
    if (to && from && date) {
      try {
        const resultList:any = await pb.collection('seferler').getList(1, 50, {
          filter: `date>="${date}" && from="${from}" && to="${to}"`,
          sort: 'date',
        });

        setBusTickets(resultList);
        console.log(resultList);
        /* Swal.fire({
          title: 'Success!',
          text: 'You clicked the button!',
          icon: 'success',
          confirmButtonText: 'Cool',
        }); */
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'You clicked the button!',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    } else {
      console.log('error');
      /* Swal.fire({
        title: 'Error!',
        text: 'You clicked the button!',
        icon: 'error',
        confirmButtonText: 'Cool',
      }); */
    }
  }
  useEffect(() => {
    getBusTickets();
  }, [to]);
  return (
    <MainLayout>
      <div
        className='bg-no-repeat bg-cover bg-center  relative'
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)',
        }}
      >
        <div className='absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0'></div>
        <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center '>
          <FlightForm  busTickets={busTickets} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamplePage;
