import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) =>
  res.json({
    message: "Hello from Express Server 👋🏻",
  })
);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
