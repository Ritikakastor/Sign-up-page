const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle signup POST request
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Create user data string
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

    // Append data to a file
    fs.appendFile('user_data.txt', userData, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            res.status(500).send('Server error, please try again later.');
        } else {
            res.status(200).send('Signup successful!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
