// socialpulse/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();

// Initialize Firebase
admin.initializeApp();

// Express routes
app.get('/', (req, res) => {
  res.send('SocialPulse API Running');
});

// Expose Express app as a single Cloud Function
exports.api = functions.https.onRequest(app);