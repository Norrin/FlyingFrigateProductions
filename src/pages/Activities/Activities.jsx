import React from "react";
import { Page } from "@components";
import { Maze } from "@pages";

const Activities = () => {
   return (
      <Page>
         <div className='flex flex-col items-center mb-12'>Activitites</div>

         <Maze />
      </Page>
   );
};

export default Activities;
