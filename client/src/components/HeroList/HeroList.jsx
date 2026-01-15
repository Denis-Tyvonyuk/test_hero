import React, { useEffect, useState } from "react";
import "./HeroList.css";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const HeroList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Load saved page from sessionStorage on initial render
  useEffect(() => {
    const savedPage = sessionStorage.getItem("page");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  // Save current page to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("page", currentPage.toString());
  }, [currentPage]);

  // Fetch heroes data
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/heros`);

        if (!res.ok) {
          throw new Error("Heroes not found");
        }

        const result = await res.json();
        setHeroes(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(heroes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentHeroes = heroes.slice(startIndex, endIndex);

  if (loading) {
    return <div className="listMain">Loading heroes...</div>;
  }

  if (error) {
    return <div className="listMain">Error: {error}</div>;
  }

  return (
    <div className="listMain">
      <div className="hero_list">
        {/* HERO LIST */}
        {heroes.map((hero) => (
          <div
            className="hero"
            key={hero.nickname}
            onClick={() => navigate(`/hero/${hero.id}`)}
          >
            <div>
              <strong>{hero.nickname}</strong>
            </div>
            <div>
              <img
                key={hero.nickname}
                src={`http://localhost:3001${hero.images?.[0]}`}
                alt={hero.nickname}
                width={200}
              />
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {heroes.length > ITEMS_PER_PAGE && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroList;
