// components/FlightForm.tsx

import Link from 'next/link';
import React from 'react';


const FlightForm = ({ busTickets }: { busTickets :any}) => {
  return (
    <div className='z-20'>
      <h2 className='text-[36px] font-semibold mb-4'>{busTickets?.totalItems} expedition found</h2>
      <div className='flex flex-row gap-8'>
        {/* {labels.map((label, index) => (
            <div key={index} className='mb-4 flex items-center'>
              <div className='w-full flex gap-2'>
                <label className='flex text-xl  font-medium text-gray-600'>{label.name} :</label>
                <p className='text-xl  text-gray-800'>{label.value}</p>
              </div>
            </div>
          ))} */}
        <div className='mb-4 grid grid-cols-3 gap-6 items-center'>
          {busTickets?.items &&
            busTickets?.items?.map((ticket: any, index: number) => (
              <div key={index} className='mx-auto w-80 bg-white rounded p-6 shadow-xl flex flex-col gap-3 '>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>Kalkış :</label>
                  <p className='text-xl  text-gray-800'>{ticket?.from}</p>
                </div>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>Varış :</label>
                  <p className='text-xl  text-gray-800'>{ticket?.to}</p>
                </div>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>Tarih :</label>
                  <p className='text-xl  text-gray-800'>
                    {new Date(ticket?.date)?.toLocaleString('tr-TR', {
                      timeZone: 'Europe/Istanbul',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                </div>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>süre :</label>
                  <p className='text-xl  text-gray-800'>{ticket?.time} saat</p>
                </div>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>Boş Koltuk :</label>
                  <p className='text-xl  text-gray-800'>{ticket?.emty_count}</p>
                </div>
                <div className='w-full flex gap-2'>
                  <label className='flex text-xl  font-medium text-gray-600'>Fiyat :</label>
                  <p className='text-xl  text-gray-800'>{ticket?.price}</p>
                </div>
                <div className='mb-4 flex items-center'>
                  <div className='w-full flex gap-2'>
                    <Link href='/bus/select' type='submit' className='w-full flex justify-center bg-[#8D3FD6]  hover:bg-purple-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FlightForm;
