import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Descriptions } from "antd";

import { getMovie } from "service/movieService";

import "./Movie.css";

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie(movieId)
      .then((response) => setMovie(response.data))
      .catch((err) => console.log(err));
  }, []);

  if (!movie) return <section></section>;

  return (
    <section>
      <div className="movie-container">
        <img width={300} alt="poster" src={movie.poster_url} />
        <div className="movie-description">
          <h2>{movie.title}</h2>
          <Descriptions bordered={true} column={1}>
            <Descriptions.Item label="Director">{movie.director}</Descriptions.Item>
            <Descriptions.Item label="Release date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="Length">{movie.length}</Descriptions.Item>
            <Descriptions.Item label="Summary">{movie.summary}</Descriptions.Item>
          </Descriptions>
          <h3>Score: </h3>
        </div>
      </div>
      <div className="reviews-container"></div>
    </section>
  );
};

export default Movie;
