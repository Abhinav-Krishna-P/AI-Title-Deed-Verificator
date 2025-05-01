import Heading from "../src/components/header/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from '../src/Pages/Titleverification'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from '../src/Pages/Langingpage'
function App() {
  return(
    <>
    <BrowserRouter>
    <Heading />
    <Routes>
      <Route path="/verification" element={<Title/>} />
      <Route path="/" element={<Landing/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
