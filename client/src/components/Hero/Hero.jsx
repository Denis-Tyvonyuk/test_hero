import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddImgToHero from "./AddImgToHero";
import EditHeroForm from "./EditHeroForm";
import DeleteHero from "./DeleteHero";
import DeleteImg from "./DeleteImg";
import "./Hero.css";

const Hero = () => {
  const { id } = useParams();

  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState(false);
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
  }, [id, updateData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hero) return <div>No hero data</div>;

  return (
    <div className="heroContainer">
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
      <div className="mainDeletImg">
        {hero.images?.map((img, index) => (
          <div key={index} className="deletImg">
            <img
              src={`http://localhost:3001${img.image}`}
              alt={hero.nickname}
              width={200}
            />
            <div>
              <DeleteImg imageId={img.id} setUpdate={setUpdateData} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <AddImgToHero id={id} setUpdate={setUpdateData} />
      </div>
      <div>
        <EditHeroForm
          id={id}
          hero={hero}
          setUpdate={setUpdateData}
          update={updateData}
        />
      </div>
      <div>
        <DeleteHero id={id} />
      </div>
    </div>
  );
};

export default Hero;
