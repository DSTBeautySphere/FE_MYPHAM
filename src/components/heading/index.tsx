export const Heading = ({ text, ...props }: { text: string }) => {
  return (
    <>
      <h1 className='text-2xl font-black leading-7 sm:truncate sm:text-3xl uppercase text-slate-950 sm:tracking-tight mb-5' {...props}>
        {text}
      </h1>
    </>
  );
};
