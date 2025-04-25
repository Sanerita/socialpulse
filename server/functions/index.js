// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const { onUserCreate } = require('./auth-triggers/user-create');

// Automatic stats counter
exports.countUserPosts = functions.firestore
  .document('posts/{postId}')
  .onWrite(async (change, context) => {
    const userId = change.after.data().userId;
    const userRef = admin.firestore().doc(`users/${userId}`);
    
    const postsSnapshot = await admin.firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .count()
      .get();
      
    return userRef.update({
      'stats.posts': postsSnapshot.data().count
    });
  });

// Scheduled post publisher
exports.publishScheduledPosts = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const posts = await admin.firestore()
      .collection('posts')
      .where('status', '==', 'scheduled')
      .where('scheduledTime', '<=', now)
      .get();
      
    // Add actual platform API calls here
    posts.forEach(post => {
      console.log(`Publishing post ${post.id}`);
      // Update status to published
      post.ref.update({ status: 'published' });
    });
  });
  exports.processNewUser = functions.auth.user()
  .onCreate(async (user) => {
    // Auth Trigger - User Creation
exports.processNewUser = functions.auth.user()
.onCreate(async (user) => {
  try {
    await admin.firestore().doc(`users/${user.uid}`).set({
      name: user.displayName || '',
      email: user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      stats: { posts: 0, followers: 0, following: 0 },
      preferences: { 
        theme: 'light', 
        notifications: true 
      }
    });
    console.log(`Created user record for ${user.email}`);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw new functions.https.HttpsError(
      'internal', 
      'User record creation failed'
    );
  }
});
  });

  exports.api = require('./api'); 