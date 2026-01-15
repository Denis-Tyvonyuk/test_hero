import React, { useState } from "react";

const CreateHeroForm = () => {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    catch_phrase: "",
    superpowers: "",
  });

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

      Object.entries(form).forEach(([key, value]) => {
        if (key === "superpowers") {
          formData.append(key, JSON.stringify(value.split(",")));
        } else {
          formData.append(key, value);
        }
      });

      Array.from(images).forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("http://localhost:3001/heros", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create hero");

      setMessage("✅ Hero created successfully");
      setForm({
        nickname: "",
        real_name: "",
        origin_description: "",
        catch_phrase: "",
        superpowers: "",
      });
      setImages([]);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <h2>Create Hero</h2>

      <input
        name="nickname"
        placeholder="Nickname"
        value={form.nickname}
        onChange={handleChange}
        required
      />

      <input
        name="real_name"
        placeholder="Real name"
        value={form.real_name}
        onChange={handleChange}
        required
      />

      <textarea
        name="origin_description"
        placeholder="Origin description"
        value={form.origin_description}
        onChange={handleChange}
        required
      />

      <input
        name="catch_phrase"
        placeholder="Catch phrase"
        value={form.catch_phrase}
        onChange={handleChange}
      />

      <input
        name="superpowers"
        placeholder="Superpowers (comma separated)"
        value={form.superpowers}
        onChange={handleChange}
        required
      />

      <input type="file" multiple accept="image/*" onChange={handleImages} />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Hero"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateHeroForm;
