// components/BusSeatSelection.tsx

import { useEffect, useState } from 'react';
import { MainLayout } from '@/layout/mainLayout';
import FlightForm from '@/components/form';
import Link from 'next/link';
// ... Diğer importlar
interface BusSeatSelectionProps {
  formData: {
    kalkis: string;
    varis: string;
    tarih: string;
    saat: string;
  };
}

const BusSeatSelection: React.FC<BusSeatSelectionProps> = ({ formData }) => {
  const totalSeats = 30;
  const seatPrice = 125;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [randomlyOccupiedSeats, setRandomlyOccupiedSeats] = useState<number[]>([]);
  const [genderIcons, setGenderIcons] = useState<Record<number, 'male' | 'female'>>({});

  useEffect(() => {
    const randomlyOccupied: React.SetStateAction<number[]> = [];
    const genderData: Record<number, 'male' | 'female'> = {};
    while (randomlyOccupied.length < totalSeats / 3) {
      const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
      if (!randomlyOccupied.includes(randomSeat)) {
        randomlyOccupied.push(randomSeat);
        genderData[randomSeat] = Math.random() < 0.5 ? 'male' : 'female'; // Random cinsiyet belirleme
      }
    }
    setRandomlyOccupiedSeats(randomlyOccupied);
    setGenderIcons(genderData);
  }, []);

  const handleSeatClick = (seatNumber: number) => {
    if (!randomlyOccupiedSeats.includes(seatNumber)) {
      setSelectedSeats(prevSelectedSeats => {
        if (prevSelectedSeats.includes(seatNumber)) {
          return prevSelectedSeats.filter(seat => seat !== seatNumber);
        } else {
          return [...prevSelectedSeats, seatNumber];
        }
      });
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  return (
    <div className='z-10'>
      <h2 className='text-2xl font-semibold mb-4 pt-4 text-white'>Bus Seat Selection</h2>
      <div className='w-full mx-auto  flex items-start mt-8'>
        <div className='grid grid-col gap-3'>
          {[...Array(Math.ceil(totalSeats / 3))].map((_, rowIndex) => (
            <div key={rowIndex} className='flex mb-4'>
              {[...Array(3)].map((_, colIndex) => {
                const seatNumber = rowIndex * 3 + colIndex + 1;
                const isSelected = selectedSeats.includes(seatNumber);
                const isRandomlyOccupied = randomlyOccupiedSeats.includes(seatNumber);
                const genderIcon = genderIcons[seatNumber] || 'neutral';
                return (
                  <div key={colIndex} className={`w-1/3 p-2 text-center border ${isSelected ? 'bg-[#FFA500]	] text-white' : isRandomlyOccupied ? 'bg-gray-400' : 'bg-gray-200'} cursor-pointer relative`} style={{ marginRight: colIndex === 0 ? '84px' : '0' }} onClick={() => handleSeatClick(seatNumber)}>
                    <div className='flex flex-col items-center h-full '>
                      {seatNumber <= totalSeats && seatNumber}
                      {isSelected && <div className='absolute hidden top-0 right-0 bg-white/20 p-1 text-xs text-black z-10 text-[10px]'>Koltuk: {seatNumber}</div>}
                      <div className='absolute bottom-0 left-0 right-0 bg-white p-1 text-xs flex justify-center items-center'>
                        {genderIcon === 'male' && (
                          <svg xmlns='http://www.w3.org/2000/svg' className='text-blue-400 h-8 w-fit' viewBox='0 0 192 512'>
                            <path d='M96 0c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64S60.7 0 96 0m48 144h-11.4c-22.7 10.4-49.6 10.9-73.3 0H48c-26.5 0-48 21.5-48 48v136c0 13.3 10.7 24 24 24h16v136c0 13.3 10.7 24 24 24h64c13.3 0 24-10.7 24-24V352h16c13.3 0 24-10.7 24-24V192c0-26.5-21.5-48-48-48z' />
                          </svg>
                        )}
                        {genderIcon === 'female' && (
                          <svg xmlns='http://www.w3.org/2000/svg' className='text-pink-400 h-8 w-fit' fill='currentColor' viewBox='0 0 256 512'>
                            <path d='M128 0c35.3 0 64 28.7 64 64s-28.7 64-64 64c-35.3 0-64-28.7-64-64S92.7 0 128 0m119.3 354.2l-48-192A24 24 0 0 0 176 144h-11.4c-22.7 10.4-49.6 10.9-73.3 0H80a24 24 0 0 0 -23.3 18.2l-48 192C4.9 369.3 16.4 384 32 384h56v104c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24V384h56c15.6 0 27.1-14.7 23.3-29.8z' />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className='mt-4 pl-20 gap-6 flex flex-col'>
          <p className='text-[16px] font-bold text-white'>Selected seat
: {selectedSeats.join(', ')}</p>

          {selectedSeats.length > 0 && (
            <p className='text-[16px] font-bold text-white'>
               Piece Price: {seatPrice} TL (Total {selectedSeats.length} koltuk)
            </p>
          )}
          <p className='text-[16px] font-bold text-white'>Total Price: {calculateTotalPrice()} TL</p>

          {/* Kalkış ve varış bilgileri */}
          <p className='text-[16px] font-bold text-white'>
          Departure: {formData.kalkis}, Arrival: {formData.varis}, History: {formData.tarih}, HOUR: {formData.saat}
          </p>
          <Link href={`/paypal?price=${calculateTotalPrice()}`} type='submit' className='w-full flex justify-center bg-[#8D3FD6]  hover:bg-purple-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
          PAYMENT{' '}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusSeatSelection;
