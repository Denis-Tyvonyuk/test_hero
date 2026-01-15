import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddImgToHero from "./AddImgToHero";

const Hero = () => {
  const { id } = useParams();

  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`http://localhost:3001/heros/${id}`);

        if (!res.ok) {
          throw new Error("Hero not found");
        }

        const data = await res.json();
        setHero(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hero) return <div>No hero data</div>;

  return (
    <div>
      <h1>{hero.nickname}</h1>
      <p>
        <strong>Real name:</strong> {hero.real_name}
      </p>
      <p>{hero.origin_description}</p>

      <h3>Superpowers</h3>
      <ul>
        {hero.superpowers.map((power, index) => (
          <li key={index}>{power}</li>
        ))}
      </ul>

      <h3>Images</h3>
      <div>
        {hero.images?.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3001${img}`}
            alt={hero.nickname}
            width={200}
          />
        ))}
      </div>
      <div>
        <AddImgToHero id={id} />
      </div>
    </div>
  );
};

export default Hero;
