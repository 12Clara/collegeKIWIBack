const express = require('express');
const path = require('path');
const fs = require('fs'); // Required to interact with the file system
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// const contactSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     message: String
// });

// const Contact = mongoose.model('Contact', contactSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main', 'copy.html'));
});
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    newContact.save((err) => {
        if (err) {
            res.send('Error saving contact information.');
        } else {
            res.send('Form submitted successfully!');
        }
    });
});
app.get('/api/json-files', (req, res) => {
    const jsonFolderPath = path.join(__dirname, 'public', 'extracurriculars', 'json'); // Adjust path if necessary
    fs.readdir(jsonFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err); // Log the error
            return res.status(500).send('Error reading directory');
        }
        // Filter JSON files and send them as JSON response
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        res.json(jsonFiles.map(file => `json/${file}`));
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
