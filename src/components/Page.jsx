const Page = ({ children }) => {
   return (
      <div className='text-black font-semibold p-4 pt-16 flex flex-col justify-center items-center gap-3'>
         {children}
      </div>
   );
};

export default Page;
