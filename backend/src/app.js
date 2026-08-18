import express from "express";
import cors from "cors";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);

app.get("/health", (req, res) => {
  res.json({ message: "Server running" });
});

export default app;