const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

app.get('/', (req, res) => {
  res.send('Standalone Express Server with Firebase');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});