import { useState, useEffect } from "react";
import { List, Button } from "antd";
import {
  deleteToken,
  getUsername,
  getUserReservations,
  deleteReservation,
} from "service/userService";

import "./MyReservations.css";

const MyReservations = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      let response = await getUserReservations();
      response.data.sort((a, b) => a.start_time > b.start_time ? -1 : 1);
      setData(response.data);
    } catch (e) {
      console.log(e);
      deleteToken();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <div className="welcome-message">
        <h2>Hello, {getUsername()}</h2>
      </div>
      <div className="my-reservations">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={data}
          footer={
            <div>
              <b>Click</b> title to view movie
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={<img width={100} alt="logo" src={item.movie_poster_url} />}
            >
              <List.Item.Meta
                title={
                  <a href={`/movie/${item.movie_id}`}>{item.movie_title}</a>
                }
                description={
                  <div>
                    Date: {item.start_time}
                    <br />
                    Room: {item.room_name} Seat: {item.seat}
                  </div>
                }
              />
              <Button
                type="primary"
                onClick={() => {
                  deleteReservation(item.id)
                    .then((res) => loadData())
                    .catch((err) => console.log(err));
                }}
              >
                Cancel
              </Button>
            </List.Item>
          )}
        />
      </div>
    </section>
  );
};

export default MyReservations;
