import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./db";
import patientRoutes from "./routes/patientRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", patientRoutes);

sequelize.sync()
  .then(() => console.log("Data base sincronized"))
  .catch((err) => console.error("Error trying to connect to data base", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running http://localhost:${PORT}`);
});

