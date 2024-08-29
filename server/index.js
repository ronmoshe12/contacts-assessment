import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:');

// Create Contacts Table
db.serialize(() => {
    db.run(`
    CREATE TABLE contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      cell TEXT,
      address TEXT,
      registrationDate TEXT,
      age INTEGER,
      image TEXT
    )
  `);
});

// Generate and Insert Random Contacts
app.post('/api/contacts/generate', async (req, res) => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();

        const contacts = data.results.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            phone: user.phone,
            cell: user.cell,
            address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
            registrationDate: user.registered.date,
            age: user.dob.age,
            image: user.picture.large
        }));

        const stmt = db.prepare('INSERT INTO contacts (name, email, phone, cell, address, registrationDate, age, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

        contacts.forEach(contact => {
            stmt.run(contact.name, contact.email, contact.phone, contact.cell, contact.address, contact.registrationDate, contact.age, contact.image);
        });

        stmt.finalize();

        res.status(201).json({ message: 'Random contacts generated and added to the database', contactsAdded: contacts.length });
    } catch (err) {
        console.error('Error generating random users:', err);
        res.status(500).json({ error: 'Failed to generate random contacts' });
    }
});

app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({contacts: rows});
    });
});

// Get Contact by ID
app.get('/api/contacts/:id', (req, res) => {
    const {id} = req.params;
    db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({contact: row});
    });
});

// Create a New Contact
app.post('/api/contacts', (req, res) => {
    const {name, email, phone, cell, address, registrationDate, age, image} = req.body;
    db.run(
        'INSERT INTO contacts (name, email, phone, cell, address, registrationDate, age, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, cell, address, registrationDate, age, image],
        function (err) {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({id: this.lastID});
        }
    );
});

// Update an Existing Contact
app.put('/api/contacts/:id', (req, res) => {
    const {id} = req.params;
    const {name, email, phone, cell, address, registrationDate, age, image} = req.body;
    db.run(
        'UPDATE contacts SET name = ?, email = ?, phone = ?, cell = ?, address = ?, registrationDate = ?, age = ?, image = ? WHERE id = ?',
        [name, email, phone, cell, address, registrationDate, age, image, id],
        function (err) {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({changes: this.changes});
        }
    );
});

// Delete a Contact
app.delete('/api/contacts/:id', (req, res) => {
    const {id} = req.params;
    db.run('DELETE FROM contacts WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({changes: this.changes});
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
