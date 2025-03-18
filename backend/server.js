const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather/:city", async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: "City not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
