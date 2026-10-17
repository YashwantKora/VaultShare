const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("VaultShare API is running!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        project: "VaultShare"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});