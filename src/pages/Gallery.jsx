import React, { useState, useEffect } from "react";
import { Page } from "@components";
import { useBibleReading } from "@utils";

const BibleCard = ({ reading }) => {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   const getMonthText = (month) => {
      return months[parseInt(month) - 1];
   };

   return (
      <div className='flex flex-col justify-center items-center border-2 border-slate-100 px-3 py-2 mb-5'>
         <div className='flex flex-col justify-center items-center pb-4'>
            <div className='text-2xl font-bold flex gap-2'>
               <div>{getMonthText(reading.Month)}</div>
               <div>{reading.Day}</div>
            </div>
         </div>
         <div className='flex flex-row justify-center items-center gap-7'>
            <div className='flex gap-2'>
               <div>{reading.Reading1}</div>
               <div>{reading.Reading1Verses}</div>
            </div>
            <div className='flex gap-2'>
               <div>{reading.Reading2}</div>
               <div>{reading.Reading2Verses}</div>
            </div>
            <div className='flex gap-2'>
               <div>{reading.Reading3}</div>
               <div>{reading.Reading3Verses}</div>
            </div>
            <div className='flex gap-2'>
               <div>{reading.Reading4}</div>
               <div>{reading.Reading4Verses}</div>
            </div>
         </div>
      </div>
   );
};

const BibleSlider = ({ readings }) => {
   return (
      <div>
         {readings &&
            readings.length > 0 &&
            readings.map((reading) => (
               <BibleCard
                  key={`${reading.Month}-${reading.Day}`}
                  reading={reading}
               />
            ))}
      </div>
   );
};

const Gallery = () => {
   const [date, setCurrentDate] = useState(Date.now());
   const { data, loading, error } = useBibleReading({ date: date });

   return (
      <Page>
         <main className='flex justify-center pt-5'>Gallery</main>
         <section className='flex flex-col justify-center items-center mt-2 mb-5 h-[400px] overflow-auto '>
            <div>
               {loading && <p>Loading...</p>}
               {error && <p>Error</p>}
               {data && data.length > 0 && <BibleSlider readings={data} />}
            </div>
         </section>
      </Page>
   );
};

export default Gallery;
