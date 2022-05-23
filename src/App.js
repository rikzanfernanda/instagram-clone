import "./App.css"
import React from 'react';
import { SessionProvider } from "./context/SessionContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";

function App() {
  return (
    <>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:UserId" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </>
  )
}

export default App
