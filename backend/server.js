import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());


app.get("/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: "Falta la ciudad" });
        }

        const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});