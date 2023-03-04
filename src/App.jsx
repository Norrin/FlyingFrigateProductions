import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, About, Gallery, Blog, Activities } from "@pages";
import { Navbar } from "@components";

const App = () => {
   return (
      <BrowserRouter>
         <Navbar />
         <main className=''>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/Activities' element={<Activities />} />
               <Route path='/Gallery' element={<Gallery />} />
               <Route path='/Blog' element={<Blog />} />
               <Route path='/about' element={<About />} />
            </Routes>
         </main>
      </BrowserRouter>
   );
};

export default App;
