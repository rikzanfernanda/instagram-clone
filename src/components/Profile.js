// TODO: answer here
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import { getSession } from "../api/auth";
import { API_URL } from "../api/config";
import { getProfile } from "../api/profile";
import PostCard from "./PostCard";
import {SessionContext} from "../context/SessionContext";

export default function Profile() {
  let {UserId} = useParams();
  let navigate = useNavigate();
  const {isLoggedIn} = useContext(SessionContext);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  console.log('posts', posts)

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
    if (isLoggedIn) {
      getProfile(UserId).then((res) => {
        setProfile(res.data.data.profile);
        setPosts(res.data.data.posts);
      })
    }
  }, [])

  return <>
    <div aria-label="Navbar" className="navbar">
        <div className="container">
          <div className="top-nav">
            <div className="app-logo" aria-label="App">
              <Link to="/" aria-label="App Title">
                <img src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png' alt="logo" aria-label="App Logo" />
                Instagram Clone
              </Link>
            </div>
            <Link to={`/profile/${UserId}`}>{profile.name}</Link>
          </div>
        </div>
      </div>
    <div className="container">
      {
        posts.length > 0 && posts.map((item, index) => {
          return (
              <PostCard
                  key={index}
                  image={item.image}
                  caption={item.content}
                  username={item.author?.name}
                  userId={item.id}
                  date={item.createdAt}
                  liked={item.liked}
                  disliked={item.disliked}
                  likeCount={item.likeCount}
                  dislikeCount={item.dislikeCount}
              />
          )
        })
      }
    </div>
  </>
}
