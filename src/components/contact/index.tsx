import { Button } from "@/components/ui/button";
import { CalendarDays, Hand } from "lucide-react";

export const Contact = () => {
  return (
    <>
      <div className='container mt-20'>
        <div className='relative py-16 overflow-hidden isolate sm:py-24 lg:py-32'>
          <div className='px-6 mx-auto max-w-7xl lg:px-8'>
            <div className='grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
              <div className='max-w-xl lg:max-w-lg'>
                <h2 className='text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl'>Cập nhật thông tin khuyến mãi</h2>
                <p className='mt-4 text-lg leading-8 text-slate-950'>Đăng ký để không bỏ lỡ khuyến mại nào</p>
                <div className='flex max-w-md mt-6 gap-x-4'>
                  <label htmlFor='email-address' className='sr-only'>
                    Email của bạn
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    required
                    placeholder='Nhập email của bạn...'
                    autoComplete='off'
                    className='min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-950 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  />
                  <Button>Đăng ký</Button>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden='true' className='absolute top-0 -translate-x-1/2 left-1/2 -z-10 blur-3xl xl:-top-6'>
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className='aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
            />
          </div>
        </div>
      </div>
    </>
  );
};
