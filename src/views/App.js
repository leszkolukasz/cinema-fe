import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Admin from "views/Admin/Admin";
import Login from "views/Login/Login";
import Movie from "views/Movie/Movie";
import Movies from "views/Movies/Movies";
import Navbar from "components/Navbar/Navbar";
import Reserve from "views/Reserve/Reserve";
import MyReservations from "views/MyReservations/MyReservations";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar/>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
