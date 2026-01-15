import React, { useEffect, useState } from "react";

const EditHeroForm = ({ id, hero }) => {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    catch_phrase: "",
    superpowers: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fill form when hero loads
  useEffect(() => {
    if (hero) {
      setForm({
        nickname: hero.nickname || "",
        real_name: hero.real_name || "",
        origin_description: hero.origin_description || "",
        catch_phrase: hero.catch_phrase || "",
        superpowers: Array.isArray(hero.superpowers)
          ? hero.superpowers.join(", ")
          : hero.superpowers || "",
      });
    }
  }, [hero]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        superpowers: JSON.stringify(
          form.superpowers.split(",").map((p) => p.trim())
        ),
      };

      const res = await fetch(`http://localhost:3001/heros/${Number(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to edit hero");

      setMessage("✅ Hero edited successfully");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!hero) return <div>Loading hero...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <h2>Edit Hero</h2>

      <input
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        placeholder="Nickname"
        required
      />

      <input
        name="real_name"
        value={form.real_name}
        onChange={handleChange}
        placeholder="Real name"
        required
      />

      <textarea
        name="origin_description"
        value={form.origin_description}
        onChange={handleChange}
        placeholder="Origin description"
        required
      />

      <input
        name="catch_phrase"
        value={form.catch_phrase}
        onChange={handleChange}
        placeholder="Catch phrase"
      />

      <input
        name="superpowers"
        value={form.superpowers}
        onChange={handleChange}
        placeholder="Superpowers (comma separated)"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Edit Hero"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default EditHeroForm;
