import "./App.css";
import Header from "../src/components/Header";
import HomeGuest from "./page/HomeGuest";
import Footer from "../src/components/Footer";
import About from "./page/About";
import Terms from "./page/Terms";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
