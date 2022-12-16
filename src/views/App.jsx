import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Admin from "views/Admin/Admin";
import Login from "views/Login/Login";
import Logout from "views/Logout/Logout";
import Movie from "views/Movie/Movie";
import Movies from "views/Movies/Movies";
import Navbar from "components/Navbar/Navbar";
import Reserve from "views/Reserve/Reserve";
import Signup from "views/Signup/Signup";
import LoggedRoute from "components/Routes/LoggedRoute/LoggedRoute";
import GuestRoute from "components/Routes/GuestRoute/GuestRoute";
import MyReservations from "views/MyReservations/MyReservations";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />

        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <LoggedRoute>
                <Logout />
              </LoggedRoute>
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route
            path="/reserve"
            element={
              <LoggedRoute>
                <Reserve />
              </LoggedRoute>
            }
          />
          <Route
            path="/my-reservations"
            element={
              <LoggedRoute>
                <MyReservations />
              </LoggedRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
