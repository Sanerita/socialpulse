const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));
app.use(express.json());

// Analytics endpoint
app.get('/analytics/:userId', async (req, res) => {
  const snapshot = await admin.firestore()
    .collection('posts')
    .where('userId', '==', req.params.userId)
    .get();
  
  const analytics = snapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    return {
      impressions: acc.impressions + (data.analytics?.impressions || 0),
      engagements: acc.engagements + (data.analytics?.engagements || 0)
    };
  }, { impressions: 0, engagements: 0 });
  
  res.json(analytics);
});

exports.api = functions.https.onRequest(app);