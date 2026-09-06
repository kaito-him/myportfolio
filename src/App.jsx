import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<Home />} />
      <Route path="/projects" element={<Home />} />
      <Route path="/interests" element={<Home />} />
      <Route path="/contact" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
