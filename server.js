const express = require('express');
const path = require('path');
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
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'copy.html'));
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});