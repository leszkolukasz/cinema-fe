import { useState, useEffect } from "react";
import { Input, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { getMovies } from "service/movieService";

import "./Movies.css";

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [like, setLike] = useState("");

  const onInputChange = (event) => {
    console.log(event)
    setLike(event.target.value);
  }

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      let response = await getMovies(like, data.length + 10);
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, [like]);

  return (
    <section>
      <div className="search-bar">
        <Input placeholder="Search movies" value={like} onChange={onInputChange} style={{height: "50px"}}/>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: "800px",
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 1000}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>Nothing more to show</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={<img width={100} alt="logo" src={item.poster_url} />}
              >
                <List.Item.Meta
                  title={<a href={`/movie/${item.id}`}>{item.title}</a>}
                  description={item.email}
                />
                <div className="summary">{item.summary}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Movies;
