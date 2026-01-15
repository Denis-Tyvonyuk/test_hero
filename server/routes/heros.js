const { Router, json } = require("express");
const db = require("../utils/database");
const upload = require("../middleware/uploadHeroImages");

const router = Router();

/* =====================
   CREATE hero
   POST /heros
===================== */
router.post("/", upload.array("images", 5), async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;

  try {
    // 1️⃣ Insert hero
    const [result] = await db.query(
      `
      INSERT INTO heros
      (nickname, real_name, origin_description, superpowers, catch_phrase)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        nickname,
        real_name,
        origin_description,
        superpowers, // already JSON string from frontend
        catch_phrase,
      ]
    );

    const heroId = result.insertId;

    // 2️⃣ Insert images (if any)
    if (req.files && req.files.length > 0) {
      const values = req.files.map((file) => [
        heroId,
        `/uploads/heros/${file.filename}`,
      ]);

      await db.query("INSERT INTO hero_images (hero_id, image) VALUES ?", [
        values,
      ]);
    }

    res.status(201).json({
      message: "Hero created successfully",
      heroId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create hero" });
  }
});

/* =====================
   READ all heroes (pagination)
   GET /heros?page=1&limit=5
===================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        h.*,
        hi.image
      FROM heros h
      LEFT JOIN hero_images hi ON hi.hero_id = h.id
    `);

    // Group heroes + images
    const heroesMap = {};

    rows.forEach((row) => {
      if (!heroesMap[row.id]) {
        heroesMap[row.id] = {
          id: row.id,
          nickname: row.nickname,
          real_name: row.real_name,
          origin_description: row.origin_description,
          catch_phrase: row.catch_phrase,
          superpowers:
            typeof row.superpowers === "string"
              ? JSON.parse(row.superpowers)
              : row.superpowers,
          images: [],
        };
      }

      if (row.image) {
        heroesMap[row.id].images.push(row.image);
      }
    });

    res.json({
      data: Object.values(heroesMap),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch heroes" });
  }
});

/* =====================
   READ one hero
   GET /heros/:id
===================== */
router.get("/:id", async (req, res) => {
  const heroId = req.params.id;

  const [[hero]] = await db.query("SELECT * FROM heros WHERE id = ?", [heroId]);

  if (!hero) {
    return res.status(404).json({ message: "Hero not found" });
  }

  const [images] = await db.query(
    "SELECT image FROM hero_images WHERE hero_id = ?",
    [heroId]
  );

  try {
    hero.superpowers = JSON.parse(hero.superpowers);
  } catch {}

  hero.images = images.map((img) => img.image);

  res.json(hero);
});

/* =====================
   UPDATE hero
   PUT /heros/:id
===================== */
router.put("/:id", async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;

  try {
    const [result] = await db.query(
      `UPDATE heros SET
        nickname = ?,
        real_name = ?,
        origin_description = ?,
        superpowers = ?,
        catch_phrase = ?
      
       WHERE id = ?`,
      [
        nickname,
        real_name,
        origin_description,
        JSON.stringify(superpowers),
        catch_phrase,

        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json({ message: "Hero updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update hero" });
  }
});

/* =====================
   DELETE hero
   DELETE /heros/:id
===================== */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM hero_images WHERE hero_id = ?", [
      req.params.id,
    ]);

    const [result] = await db.query("DELETE FROM heros WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json({ message: "Hero deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete hero" });
  }
});

/**
 * POST /heros/:id/images
 */
router.post("/:id/images", upload.array("images", 5), async (req, res) => {
  try {
    const heroId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const values = req.files.map((file) => [
      heroId,
      `/uploads/heros/${file.filename}`,
    ]);

    await db.query("INSERT INTO hero_images (hero_id, image) VALUES ?", [
      values,
    ]);

    res.json({
      message: "Images uploaded successfully",
      images: values.map((v) => v[1]),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
