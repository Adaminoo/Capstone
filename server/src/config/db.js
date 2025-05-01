const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: `postgresql://admin:O2avpXMWGQUnKawlzyA1OKTJqSqtDX9f@dpg-d09bdp6uk2gs73d3a6j0-a:5432/mtech_pwid`,
  // postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}
  // host: process.env.DB_HOST, //dpg-cuvk7qt2ng1s738pu1cg-a
  // user: process.env.DB_USER, //appuser
  // password: process.env.DB_PASSWORD, //BnM7zZKnoGqeMjPg1QP0TlKKdTRdFATC
  // database: process.env.DB_DATABASE, // mtech_pwid
  // port: process.env.DB_PORT,
  //postgresql://appuser:BnM7zZKnoGqeMjPg1QP0TlKKdTRdFATC@dpg-cuvk7qt2ng1s738pu1cg-a:5432/mtech_pwid
  max: 10,
});
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
