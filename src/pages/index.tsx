import Image from 'next/image';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/layout/mainLayout';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Link from 'next/link';
import pb from '@/lib/pocketbase';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  console.log('value:', value);

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };
const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const from = e.target.from.value;
      const to = e.target.to.value;
      const date = value.startDate;
      console.log(from, to, date);
      router.push(`/bus/find_ticket?from=${from}&to=${to}&date=${date}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainLayout>
      <div
        className='bg-no-repeat bg-cover bg-center  relative'
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)',
        }}
      >
        <div className='absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0'></div>

        <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center z-10 '>
          <div className='flex-col flex  self-center p-10 sm:max-w-xl xl:max-w-2xl w-2/3  z-10'>
            <div className='self-start hidden lg:flex flex-col  text-white'>
              <h1 className='mb-3 font-bold text-5xl'>Journey with us for your unforgettable memories!</h1>
              <p className='pr-3'>Book your seat now and start your preparations for an unforgettable experience! Booking tickets is now much easier. Choose the event you want, select a date and time, then easily complete your booking. Book your ticket now to get one step closer to the fun!</p>
            </div>
          </div>
          <div className='flex justify-center self-center  z-10 w-1/3 text-gray-700 font-medium'>
            <div className='px-6 py-10 bg-white mx-auto rounded-2xl w-full max-w-xs '>
              <form onSubmit={handleSubmit} className=''>
                <div className='flex flex-col gap-3'>
                  <label className='text-sm  tracking-wide'>
                    Departure point :<br />
                    <select name='from' className=' w-full border py-2 rounded-md'>
                      <option value='İstanbul'>İstanbul</option>
                      <option value='Ankara'>Ankara</option>
                      <option value='İzmir'>İzmir</option>
                    </select>
                  </label>

                  <label className=' text-sm   tracking-wide'>
                    Destination point : <br />
                    <select name='to' className='w-full border py-2 rounded-md'>
                      <option value='İstanbul'>İstanbul</option>
                      <option value='Ankara'>Ankara</option>
                      <option value='İzmir'>İzmir</option>
                    </select>
                  </label>
                  <div className='flex flex-col gap-2 datePicker'>
                    Expedition Date :
                    <Datepicker asSingle={true} primaryColor={'green'} value={value} onChange={handleValueChange} showShortcuts={false} />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'></div>
                  </div>
                  <div>
                    <button /* href='/bus/find_ticket' */ type='submit' className='w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
                      Find a ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
