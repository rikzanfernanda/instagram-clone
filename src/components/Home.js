import React, {useContext, useEffect, useState} from "react";
import { getPosts } from "../api/post";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import UploadForm from "./UploadForm";
import {getSession} from "../api/auth";
import {SessionContext} from "../context/SessionContext";

const Home = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(SessionContext);
  const [data, setData] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  // console.log('user', user)
  console.log('data', data)

  useEffect(() => {
    cekSession()
  }, [])

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn])

  const cekSession = async () => {
    let {data} = await getSession();
    if (data.user !== undefined) {
      setUser(data.user);
      setIsLoggedIn(true);
    }
  }

  const fetchData = async() => {
    const res = await getPosts();
    setData(res?.data.data);
  }

  const onSubmit = (v) => {
    // setData([v, ...data]);
    fetchData();
  };

  return (
    <>
      <Navbar isShowForm={isShowForm} setIsShowForm={setIsShowForm} />
      <div className="container">
        {
          isShowForm && <UploadForm onSubmit={onSubmit} />
        }
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <PostCard
                key={index}
                image={item.image}
                caption={item.content}
                username={item.author?.name}
                id={item.id}
                userId={item.author.id}
                date={item.createdAt}
                liked={item.liked}
                disliked={item.disliked}
                likeCount={item.likeCount}
                dislikeCount={item.dislikeCount}
              />
            );
          })}
      </div>
    </>
  );
};

export default Home;
