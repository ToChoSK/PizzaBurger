import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const app = express();
const PORT = 3001;

// Získanie aktuálneho adresára (náhrada za __dirname v ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cesta k súboru s používateľmi
const usersFile = path.join(__dirname, "../public/data/users.json");

// Načítanie používateľov zo súboru
const getUsersFromFile = async () => {
    const data = await fs.readFile(usersFile, "utf8");
    return JSON.parse(data);
};

// Uloženie používateľov do súboru
const writeUsersToFile = async (users: any[]) => {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

// Endpoint na prihlásenie
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const users = await getUsersFromFile();

    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
        res.json({ id: user.id, name: user.name, email: user.email, address: user.address });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Endpoint na aktualizáciu používateľa
app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    const users = await getUsersFromFile();

    const index = users.findIndex((u: any) => u.id === parseInt(id, 10));
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        await writeUsersToFile(users);
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Spustenie servera
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
