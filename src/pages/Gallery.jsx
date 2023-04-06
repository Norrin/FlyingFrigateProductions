import React, { useState } from "react";
import { Page } from "@components";
import { UseFetch } from "../utils";

const Gallery = () => {
   const [post, setPost] = useState({});

   const { data, loading, error } = UseFetch(
      "https://jsonplaceholder.typicode.com/posts"
   );

   const fetchPost = (id) => {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
         .then((response) => response.json())
         .then((json) => console.log(json));
   };

   return (
      <Page>
         <main className='flex justify-center pt-5'>Gallery</main>
         <section className='flex flex-col justify-center items-center mt-2 mb-5 border-red-100 border-2 h-[600px] overflow-auto'>
            <h1 className='text-2xl'>Posts</h1>
            <div>
               {loading && <p>Loading...</p>}
               {error && <p>Error</p>}
               {data && (
                  <div>
                     {data.map((post) => (
                        <p key={post.id}>{post.title}</p>
                     ))}
                  </div>
               )}
            </div>
         </section>
      </Page>
   );
};

export default Gallery;
