import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar/>

        <Routes>
          <Route path="/login" element={<div />} />
          <Route path="/movies" element={<div />} />
          <Route path="/movie" element={<div />} />
          <Route path="/reserve" element={<div />} />
          <Route path="/reservations" element={<div />} />
          <Route path="/admin" element={<div />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
