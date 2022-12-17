import API_ADAPTER from "service/apiService";
import { getToken } from "service/userService";

export const getMovie = (id) => {
  return API_ADAPTER.get(`movies/${id}`);
};

export const getMovieScore = (id) => {
  return API_ADAPTER.get(`movies/${id}/score`);
};

export const getMovies = (like, limit) => {
  const params = {
    like,
    limit,
  };

  return API_ADAPTER.get("movies", { params });
};

export const addReview = (movie_id, score, text) => {
  let data = {
    movie_id,
    score,
    text,
  };

  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.post("reviews", data, { headers });
};

export const getReviews = (movie_id) => {
  return API_ADAPTER.get(`reviews/${movie_id}`);
};

export const getAvailableMovies = () => {
  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.get("screenings/movies", { headers });
};

export const getDaysWithMovieScreening = (movie_id) => {
  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.get(`screenings/movies/${movie_id}/days`, { headers });
};

export const getCinemasWithMovieScreening = (movie_id, day) => {
  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.get(`screenings/movies/${movie_id}/days/${day}/cinemas`, {
    headers,
  });
};

export const getScreeningsInCinemaWithMovieOnDay = (
  movie_id,
  day,
  cinema_id
) => {
  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.get(
    `screenings/movies/${movie_id}/days/${day}/cinemas/${cinema_id}`,
    { headers }
  );
};

export const getFreeSeatsForScreening = (screening_id) => {
  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.get(`screenings/${screening_id}/free-seats`, {
    headers,
  });
};

export const makeReservation = (screening_id, seat) => {
  let data = {
    id: screening_id,
    seat,
  };

  let headers = { Authorization: "Bearer " + getToken() };
  return API_ADAPTER.post("reserve", data, { headers });
};
