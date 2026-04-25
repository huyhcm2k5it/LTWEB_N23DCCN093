const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML files from public folder
app.use(express.static('public'));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Middleware: Logger
const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.path}`);
    next();
};

// Middleware: checkAge
const checkAge = (req, res, next) => {
    // For GET request age is in query, for POST request age is in body
    const age = req.query.age || req.body.age;
    
    if (!age || parseInt(age) < 18) {
        return res.status(400).json({ error: "Bạn chưa đủ 18 tuổi" });
    }
    next();
};

// Apply logger middleware globally
app.use(logger);

// GET /api/info
app.get('/api/info', checkAge, (req, res) => {
    const { name, age } = req.query;
    res.json({
        name: name,
        age: parseInt(age),
        message: `Chào mừng ${name}!`
    });
});

let currentId = 1;

// POST /api/register
app.post('/api/register', (req, res) => {
    const { name, age, email } = req.body;

    if (!name || !age || !email) {
        return res.status(400).json({ error: "Vui lòng điền đầy đủ" });
    }

    const newUser = {
        id: currentId++,
        name,
        age: parseInt(age),
        email
    };

    res.json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
