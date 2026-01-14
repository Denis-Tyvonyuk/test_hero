const db = require("./database");

async function createHeroImgTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS hero_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hero_id INT  UNSIGNED NOT NULL ,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hero_id) REFERENCES heros(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(sql);
    console.log("✅ hero images table created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating hero images table:", error);
    process.exit(1);
  }
}

createHeroImgTable();
