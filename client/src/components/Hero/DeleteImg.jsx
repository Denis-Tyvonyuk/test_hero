import React, { useState } from "react";

const DeleteImg = ({ imageId, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this imeg?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:3001/heros/images/${imageId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete img");
      }
      setUpdate((prev) => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="deletImgbtn" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Img"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteImg;
