const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
const myEnv = dotenv.config();
const PORT = process.env.PORT;
const router = require("./routes");

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
