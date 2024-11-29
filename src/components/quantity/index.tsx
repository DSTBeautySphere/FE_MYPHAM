interface IQuantity {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const Quantity = ({ quantity, setQuantity }: IQuantity) => {
  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className='relative flex items-center max-w-[10rem]'>
        <button
          type='button'
          id='decrement-button'
          onClick={() => handleDecrement()}
          data-input-counter-decrement='quantity-input'
          className='p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'>
          <svg className='w-3 h-3 text-gray-900 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h16' />
          </svg>
        </button>
        <div className='bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          <span>{quantity}</span>
        </div>
        <button
          type='button'
          id='increment-button'
          onClick={() => handleIncrement()}
          data-input-counter-increment='quantity-input'
          className='p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'>
          <svg
            className='w-3 h-3 text-gray-900 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 18'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 1v16M1 9h16' />
          </svg>
        </button>
      </div>
    </>
  );
};
