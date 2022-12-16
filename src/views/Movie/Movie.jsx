import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Button, Form, InputNumber, Input, List, Typography } from "antd";

import { getMovie, getMovieScore, getReviews } from "service/movieService";
import { addReview } from "service/movieService";

import "./Movie.css";

const { TextArea } = Input;

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [movieScore, setMovieScore] = useState("N/A");

  const onFinish = async (values) => {
    try {
      console.log(values.score, values.review);
      await addReview(movieId, values.score, values.review);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getMovie(movieId)
      .then((response) => setMovie(response.data))
      .catch((err) => console.log(err));
    getMovieScore(movieId)
      .then((response) => setMovieScore(response.data || "N/A"))
      .catch((err) => console.log(err));
    getReviews(movieId)
      .then((response) => setReviews(response.data))
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
            <Descriptions.Item label="Director">
              {movie.director}
            </Descriptions.Item>
            <Descriptions.Item label="Release date">
              {movie.release_date}
            </Descriptions.Item>
            <Descriptions.Item label="Length">{movie.length}</Descriptions.Item>
            <Descriptions.Item label="Summary">
              {movie.summary}
            </Descriptions.Item>
          </Descriptions>
          <h3>Score: {movieScore}</h3>
        </div>
      </div>
      <div className="create-review-container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Score"
            name="score"
            rules={[
              { required: true, message: "Please input your score! (1..10)" },
            ]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item
            label="Review"
            name="review"
            rules={[{ required: true, message: "Please input your review!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit review
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="reviews-container">
        <List
          header={<h2>Reviews</h2>}
          bordered
          dataSource={reviews}
          renderItem={(item) => (
            <List.Item>
              <h3>{item.score}</h3> <h5>{item.reviewed_on}</h5> <br/> {item.text}
            </List.Item>
          )}
        />
      </div>
    </section>
  );
};

export default Movie;
