const express = require("express"); // Express moduli
const fs = require("fs"); // Fayl tizimi moduli
const cors = require("cors"); // CORS moduli

const app = express();
const PORT = 5000; // Server porti

app.use(cors()); // CORSni yoqish
app.use(express.json()); // JSON ma'lumotlarini o'qish uchun middleware

// POST: Geolokatsiya ma'lumotlarini qabul qilish va saqlash
app.post("/save-location", (req, res) => {
    const locationData = req.body;

    // JSON fayldagi mavjud ma'lumotlarni o'qish
    fs.readFile("locations.json", "utf8", (err, data) => {
        let locations = [];
        if (!err && data) {
            locations = JSON.parse(data); // Mavjud ma'lumotlarni JSON formatda o'qish
        }

        // Yangi ma'lumotni qo'shish
        locations.push(locationData);

        // Yangilangan ma'lumotlarni JSON faylga yozish
        fs.writeFile("locations.json", JSON.stringify(locations, null, 4), (err) => {
            if (err) {
                console.error("Error writing to file:", err); // Xatolikni ko'rsatish
                return res.status(500).send("Error saving location data.");
            }
            res.status(200).send("Location data saved."); // Javob qaytarish
        });
    });
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});