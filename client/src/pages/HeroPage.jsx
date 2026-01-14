import React from "react";
import { useParams } from "react-router-dom";

const HeroPage = () => {
  const { nickname } = useParams();

  return <div>{nickname}</div>;
};

export default HeroPage;
