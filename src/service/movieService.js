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
