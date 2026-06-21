import express from "express"
import dotenv from "dotenv"
import { fetchPaperMetadata } from "./services/arxiv.service.js"
dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})


fetchPaperMetadata("1706.03762")