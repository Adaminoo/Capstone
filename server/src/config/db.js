const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
});

  // host: process.env.DB_HOST, //dpg-cuvk7qt2ng1s738pu1cg-a
  // user: process.env.DB_USER, //appuser
  // password: process.env.DB_PASSWORD, //BnM7zZKnoGqeMjPg1QP0TlKKdTRdFATC
  // database: process.env.DB_DATABASE, // mtech_pwid
  // port: process.env.DB_PORT,
  //postgresql://appuser:BnM7zZKnoGqeMjPg1QP0TlKKdTRdFATC@dpg-cuvk7qt2ng1s738pu1cg-a:5432/mtech_pwid

// postgresql://:@/
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
  release();
});

//Goes to authController.js
module.exports = pool;
