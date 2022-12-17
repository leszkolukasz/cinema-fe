import { useState, useEffect, useRef } from "react";
import { Button, Select, Space } from "antd";

import {
  getDaysWithMovieScreening,
  getAvailableMovies,
  getCinemasWithMovieScreening,
  getScreeningsInCinemaWithMovieOnDay,
  getFreeSeatsForScreening,
  makeReservation,
} from "service/movieService";

import "./Reserve.css";

const Reserve = () => {
  const [data, setData] = useState([]);
  const movie = useRef(null);
  const day = useRef(null);
  const cinema = useRef(null);
  const screening = useRef(null);
  const seat = useRef(null);

  const prepareData = async () => {
    try {
      let data_tmp = [];

      // Movies
      let response = await getAvailableMovies();
      data_tmp.push({
        data: response.data.map((el) => {
          return { label: el.title, value: el.id };
        }),
        currentValue: movie.current,
        placeholder: "Select movie",
        id: 0,
        onChange: (value) => {
          movie.current = value;
          day.current = null;
          prepareData();
        },
        className: "movie-input",
      });

      if (movie.current === null) {
        setData(data_tmp);
        return;
      }

      // Days with screening for movie
      response = await getDaysWithMovieScreening(movie.current);
      data_tmp.push({
        data: response.data.map((el) => {
          return { label: el, value: el };
        }),
        currentValue: day.current,
        placeholder: "Select day",
        id: 1,
        onChange: (value) => {
          day.current = value;
          cinema.current = null;
          prepareData();
        },
        className: "day-input",
      });

      if (day.current === null) {
        setData(data_tmp);
        return;
      }

      // Cinema for given movie and day
      response = await getCinemasWithMovieScreening(movie.current, day.current);
      data_tmp.push({
        data: response.data.map((el) => {
          return { label: `${el.name} (${el.address})`, value: el.id };
        }),
        currentValue: cinema.current,
        placeholder: "Select cinema",
        id: 2,
        onChange: (value) => {
          cinema.current = value;
          screening.current = null;
          prepareData();
        },
        className: "cinema-input",
      });

      if (cinema.current === null) {
        setData(data_tmp);
        return;
      }

      // Screening for given movie, day, cinema
      response = await getScreeningsInCinemaWithMovieOnDay(
        movie.current,
        day.current,
        cinema.current
      );
      data_tmp.push({
        data: response.data.map((el) => {
          return {
            label: `${el.start_time} (Room: ${el.room_name})`,
            value: el.id,
          };
        }),
        currentValue: screening.current,
        placeholder: "Select screening",
        id: 3,
        onChange: (value) => {
          screening.current = value;
          seat.current = null;
          prepareData();
        },
        className: "screening-input",
      });

      if (screening.current === null) {
        setData(data_tmp);
        return;
      }

      // Free seats for screening
      response = await getFreeSeatsForScreening(screening.current);
      data_tmp.push({
        data: response.data.map((el) => {
          return { label: el, value: el };
        }),
        currentValue: seat.current,
        placeholder: "Select seat",
        id: 4,
        onChange: (value) => {
          seat.current = value;
          prepareData();
        },
        className: "seat-input",
      });

      setData(data_tmp);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <section className="reserve-container">
      <h2>Make reservation</h2>
      <Space size="large" align="center">
        {dataToInputs(data)}
        {seat.current !== null && (
          <Button
            onClick={() => {
              makeReservation(screening.current, seat.current)
                .then(() => window.location.reload())
                .catch((err) => console.log(err));
            }}
            type="primary"
          >
            Reserve
          </Button>
        )}
      </Space>
    </section>
  );
};

const dataToInputs = (data) => {
  let inputs = [];
  data.forEach((el) => {
    let input = (
      <Select
        key={el.id}
        className={el.className}
        showSearch
        value={el.currentValue}
        placeholder={el.placeholder}
        optionFilterProp="children"
        onChange={(e) => {
          el.onChange(e);
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={el.data}
      />
    );
    inputs.push(input);
  });

  return inputs;
};

export default Reserve;
