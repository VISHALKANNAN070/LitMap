import express from "express";
import dotenv from "dotenv";
import paperRouter from "./routes/paper.route.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/papers", paperRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server started");
});
