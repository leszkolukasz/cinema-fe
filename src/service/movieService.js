import API_ADAPTER from "service/apiService";

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
