// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require('firebase-functions');
const {
  onDocumentCreated,
  onDocumentWritten,
} = require('firebase-functions/v2/firestore');

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, AggregateField } = require('firebase-admin/firestore');
const { event } = require('firebase-functions/v1/analytics');

initializeApp();
const db = getFirestore();

// Uppercase place's title and save it to titleUppercase field
// titleUppercase will be used for search queries
exports.makeUppercase = onDocumentCreated('/places/{placeId}', (event) => {
  const title = event.data.data().title;

  logger.info('Uppercasing', event.params.placeId, title);

  const titleUppercase = title.toUpperCase();

  return event.data.ref.set({ titleUppercase }, { merge: true });
});

// Update place's avgRating when a new rating is added or updated
exports.newRatingAdded = onDocumentWritten(
  '/places/{placeId}/ratings/{ratingId}',
  (event) => {
    logger.info('Updating place', event.params.placeId, 'avgRating');

    return event.data.after.ref.parent
      .aggregate({
        avgRating: AggregateField.average('rating'),
      })
      .get()
      .then((aggDoc) => {
        return event.data.after.ref.parent.parent?.set(
          { avgRating: aggDoc.data().avgRating },
          { merge: true },
        );
      });
  },
);

// Update place's unique visits when a new visit is added to views subcollection
exports.newViewAdded = onDocumentCreated(
  'places/{placeId}/views/{viewId}',
  (event) => {
    logger.info('Updating place', event.params.placeId, 'uniqueVisits');
    return event.data.ref.parent
      .count()
      .get()
      .then((aggDoc) => {
        return event.data.ref.parent.parent?.set(
          { uniqueVisits: aggDoc.data().count },
          { merge: true },
        );
      });
  },
);
