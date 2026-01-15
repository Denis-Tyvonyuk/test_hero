import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteHero = ({ id, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hero?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:3001/heros/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete hero");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Hero"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteHero;
