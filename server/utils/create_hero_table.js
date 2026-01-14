const db = require("./database");

async function createHerosTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS heros (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nickname VARCHAR(100) NOT NULL,
      real_name VARCHAR(150) NOT NULL,
      origin_description TEXT NOT NULL,
      superpowers JSON NOT NULL,
      catch_phrase VARCHAR(255),
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(sql);
    console.log("✅ heros table created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating heros table:", error);
    process.exit(1);
  }
}

createHerosTable();
