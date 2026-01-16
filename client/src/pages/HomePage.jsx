import React from "react";
import HeroList from "../components/HeroList/HeroList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home container">
      <div>
        <button className="createHeroBtn" onClick={() => navigate(`/form`)}>
          Create Hero
        </button>
      </div>
      <HeroList />
    </div>
  );
};

export default HomePage;
