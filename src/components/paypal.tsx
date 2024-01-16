import { useRouter } from 'next/router';
import { useState, ChangeEvent, FocusEvent } from 'react';
import Swal from 'sweetalert2';

const CreditCardForm = () => {
  const router = useRouter();
  const { price } = router.query;
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (value: string) => {
    if (value.length > 18) {
      return;
    }
    setCardNumber(value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: 'Success!',
        text: 'You payment is successfull!',
        icon: 'success',
        confirmButtonText: 'Back to home',
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    } catch (error) {
      
    }
  };

  return (
    <div className='m-4 z-10'>
      <form onSubmit={onSubmit} className='credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white' data-card='front'>
        {/* Ana içerik */}
        <main className='mt-4 p-4'>
          <h1 className='text-xl font-semibold text-gray-700 text-center'>Card payment</h1>
          <div>
            {/* Diğer inputlar */}
            <div className='my-3'>
              <input type='text' className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none' placeholder='Card holder' maxLength={22} name='cardholder' />
            </div>
            <div className='my-3'>
              <input type='text' className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none' placeholder='Card number' value={cardNumber} onKeyDown={(e: any) => formatCardNumber(e.target.value)} maxLength={19} onChange={(e: ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)} />
            </div>
            <div className='my-3 flex flex-col'>
              <div className='mb-2'>
                <label className='text-gray-700'>Expired</label>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                {/* Diğer select ve inputlar */}
                <select className='form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none' name='month'>
                  {Array.from(Array(12).keys()).map(month => (
                    <option key={month} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
                <select className='form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none' name='year'>
                  {Array.from(Array(10).keys()).map(year => (
                    <option key={year} value={year + 2021}>
                      {year + 2021}
                    </option>
                  ))}
                </select>
                <input type='text' className='block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none' placeholder='Security code' maxLength={3} name='securityCode' />
              </div>
            </div>
          </div>
        </main>
        {/* Alt kısım */}
        <div className='mt-0 p-4'>
          <button className='submit-button px-4 py-3 rounded-full bg-blue-300 hover:bg-blue-500 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors' type='submit'>
            Pay now {price} TL
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
