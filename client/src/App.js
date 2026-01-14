import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HeroPage from "./pages/HeroPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero/:nickname" element={<HeroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
