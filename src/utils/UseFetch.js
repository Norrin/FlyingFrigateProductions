import React, { useState, useEffect } from "react";

const UseFetch = (url) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return { data, loading, error };
};

export default UseFetch;
