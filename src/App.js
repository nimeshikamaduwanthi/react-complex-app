import "./App.css";
import Header from "../src/components/Header";
import HomeGuest from "./pages/HomeGuest";
import Footer from "../src/components/Footer";
import About from "./pages/About";
import Terms from "./pages/Terms";
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
