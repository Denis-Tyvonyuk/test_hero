const { Router } = require("express");
const db = require("../utils/database");

const router = Router();

/* =====================
   CREATE hero
   POST /heros
===================== */
router.post("/", async (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    image_url,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO heros 
       (nickname, real_name, origin_description, superpowers, catch_phrase, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nickname,
        real_name,
        origin_description,
        JSON.stringify(superpowers),
        catch_phrase,
        image_url,
      ]
    );
    console.log(result);

    res.status(201).json({ id: result.insertId });
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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM heros");

    const [rows] = await db.query("SELECT * FROM heros LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);

    res.json({
      data: rows.map((hero) => ({
        ...hero,
        superpowers: JSON.parse(hero.superpowers),
      })),
      page,
      totalPages: Math.ceil(total / limit),
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
  try {
    const [rows] = await db.query("SELECT * FROM heros WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return res.status(404).json({ message: "Hero not found" });
    }

    const hero = rows[0];

    res.json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch hero" });
  }
});

/* =====================
   UPDATE hero
   PUT /heros/:id
===================== */
router.put("/:id", async (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    image_url,
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE heros SET
        nickname = ?,
        real_name = ?,
        origin_description = ?,
        superpowers = ?,
        catch_phrase = ?,
        image_url = ?
       WHERE id = ?`,
      [
        nickname,
        real_name,
        origin_description,
        JSON.stringify(superpowers),
        catch_phrase,
        image_url,
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

module.exports = router;
