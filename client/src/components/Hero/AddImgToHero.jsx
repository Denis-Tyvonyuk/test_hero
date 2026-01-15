import React, { useEffect, useState } from "react";

const AddImgToHero = ({ id }) => {
  const [form, setForm] = useState({});

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      Array.from(images).forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`http://localhost:3001/heros/${id}/images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add img");

      setMessage("✅ img added successfully");
      setForm({});
      setImages([]);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <h2>Add Imag</h2>

        <input type="file" multiple accept="image/*" onChange={handleImages} />

        <button type="submit" disabled={loading}>
          {loading ? "adding..." : "add img"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddImgToHero;
