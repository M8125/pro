// Express + Mongoose based server with static file serving and simple auth API
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB if connection string provided
const mongoUri = process.env.MONGODB_URI || '';
if (mongoUri) {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connect error:', err.message));
} else {
  console.warn('MONGODB_URI not set — auth APIs will fail until you set a MongoDB connection string in .env');
}

// Routes
app.use('/api/auth', require('./routes/auth'));

// Diagnostic route: attempt to read index.html from process.cwd()
app.get('/_local_index', (req, res) => {
  const p = path.resolve('index.html');
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ ok: false, err: err.message, path: p });
    res.set('Content-Type', 'text/html');
    res.send(data);
  });
});

// Redirect root to diagnostic index route to avoid sendFile issues on some Windows/OneDrive setups

// If request is for root or /index.html, redirect to diagnostic route BEFORE static middleware
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    return res.redirect('/_local_index');
  }
  next();
});

// Serve static files (the existing HTML/CSS/JS)
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for client-side routes (use process.cwd() resolved path)
app.get('*', (req, res) => {
  const indexPath = path.resolve('index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      console.error('Error sending index.html:', err && err.message);
      // fallback: try to stream it manually
      fs.readFile(indexPath, 'utf8', (readErr, data) => {
        if (readErr) return res.status(500).send('Could not load index');
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
