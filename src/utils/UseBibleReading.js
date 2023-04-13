import { useState, useEffect } from "react";

import biblereading from "../data/bible-reading.json";

const useBibleReading = ({ date }) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const filterItems = (items) => {
      const currentDate = new Date(date);
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = parseInt(currentDate.getDate());
      const currentDays = [currentDay - 1, currentDay, currentDay + 1];

      return items.filter(
         (item) =>
            item.Month == currentMonth.toString() &&
            currentDays.includes(parseInt(item.Day))
      );
   };

   useEffect(() => {
      if (!biblereading || biblereading.length === 0) {
         setError("Failed to fetch data");
         setLoading(false);
      } else {
         const filtedItems = filterItems(biblereading);
         setData(filtedItems);
         setLoading(false);
      }
   }, [date]);

   return { data, loading, error };
};

export default useBibleReading;
