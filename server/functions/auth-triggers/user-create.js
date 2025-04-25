const admin = require('firebase-admin');

module.exports = async (user) => {
  const userData = {
    name: user.displayName || user.email.split('@')[0],
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    stats: { posts: 0, followers: 0, following: 0 },
    socialConnections: {}
  };

  await admin.firestore().doc(`users/${user.uid}`).set(userData);
  return { status: 'success', userId: user.uid };
};