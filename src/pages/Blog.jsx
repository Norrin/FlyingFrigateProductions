import React, { useMemo, useState, useDeferredValue } from "react";
import { Page } from "@components";

const List = ({ input }) => {
   const SIZE = 20000;
   const defInput = useDeferredValue(input);
   const results = useMemo(() => {
      const list = [];
      for (let i = 0; i < SIZE; i++) {
         list.push(<div key={i}>{defInput}</div>);
      }
      return list;
   }, [defInput]);

   return results;
};

const waitThenDo = (ms, cb) => {
   const now = performance.now();
   while (performance.now() - now < ms) {}

   return cb();
};

const Blog = () => {
   const [input, setInput] = useState("");

   const callWait = () => {
      console.log("Start wait");
      waitThenDo(2000, () => {
         console.log("Done Waiting");
      });
   };

   return (
      <Page>
         <main>
            <header className='flex flex-col justify-center items-center py-3'>
               Blog
               <button onClick={() => callWait()}>Try out timed func</button>
            </header>
            <section className='mt-3'>
               <input
                  type='text'
                  className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white'
                  value={input}
                  onChange={(e) => {
                     setInput(e.target.value);
                  }}
               />
               <List input={input} />
            </section>
         </main>
      </Page>
   );
};

export default Blog;
