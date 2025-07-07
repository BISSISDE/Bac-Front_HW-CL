const pool = require("./main");
const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Running");
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Kate");
  }
});

app.get("/product/expensive", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * from products where price > 10000"
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("error");
  }
});

app.post("/", async (req, res) => {
  const { name, description, quality, price } = req.body;
  if (!name,!description,!quality,!price) {
    res.status(404).send('empty')
  }
  try {
    const result = await pool.query(
      "INSERT INTO products(name,description,quality,price) Values($1,$2,$3,$4)",
      [name, description, quality, price]
    );
    res.json("Added");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
app.put("/product/update/:id", async (req, res) => {
  const { name, description, quality, price } = req.body;
  const { id } = req.params;
  if (!name,!description,!quality,!price) {
    res.status(404).json('name,descr.. empty')
  }
  try {
    const result = await pool.query(
      "UPDATE products SET name=$1,description=$2,quality=$3,price=$4 Where id = $5",
      [name, description, quality, price, id]
    );
    res.json("Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});
app.delete("/product/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE from products where id = $1", [id]);
    res.json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
