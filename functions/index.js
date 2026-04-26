const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * processFeedback - Trust Engine
 * Triggered when a new feedback document is created after a game.
 * Updates the target user's reliability and Elo score.
 */
exports.processFeedback = onDocumentCreated("feedback/{feedbackId}", async (event) => {
  const feedbackData = event.data.data();
  if (!feedbackData) return;

  const { targetUserId, rating, type } = feedbackData;
  logger.info(`Processing feedback for user: ${targetUserId}`);

  const userRef = db.doc(`users/${targetUserId}`);
  
  try {
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) return;

      const userData = userDoc.data();
      let currentReliability = userData.reliability || 100;
      let currentElo = userData.elo || 1200;

      // Simple Trust Engine Logic
      if (type === 'no-show') {
        currentReliability -= 10;
        logger.info(`User ${targetUserId} penalized for no-show.`);
      } else if (type === 'good-sport') {
        currentReliability = Math.min(100, currentReliability + 2);
        currentElo += 5; // Slight boost
      }

      transaction.update(userRef, {
        reliability: currentReliability,
        elo: currentElo,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    logger.info(`Successfully updated Trust metrics for ${targetUserId}`);
  } catch (error) {
    logger.error("Transaction failed: ", error);
  }
});

/**
 * onPlayerCancel - Reserve Promotion
 * Triggered when a game document is updated. Checks if slots opened up
 * and automatically notifies/promotes reserves if they exist.
 */
exports.onPlayerCancel = onDocumentUpdated("games/{gameId}", async (event) => {
  const beforeData = event.data.before.data();
  const afterData = event.data.after.data();

  if (!beforeData || !afterData) return;

  // Did slots open up?
  if (afterData.slotsLeft > beforeData.slotsLeft && afterData.reserves > 0) {
    logger.info(`Slots opened for game ${event.params.gameId}. Promoting reserves...`);

    // In a real implementation, we would query the reserve subcollection
    // and send a notification/invite to the first person in the queue.
    // E.g., await db.collection(`games/${event.params.gameId}/reserves`).orderBy('joinedAt').limit(1).get()
    
    // Stub implementation:
    logger.info('Notifying next reserve in queue (Logic pending actual reserve UI implementation)');
  }
});
