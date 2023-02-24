import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Navbar from './components/Navbar'

const App = () => {
  return (
  <BrowserRouter>
    <Navbar />
    <main className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
