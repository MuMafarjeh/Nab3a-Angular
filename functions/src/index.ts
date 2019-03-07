import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

//Init algolia
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('item_NAME');

exports.indexItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onCreate((snapshot, context) => 
    {
        const data = snapshot.data();
        const objectID = snapshot.id;

        //Add data to algolia index
        return index.addObject
        ({
            objectID,
            ...data
        })
    });

exports.unindexItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onDelete((snapshot, context) => 
    {
        const objectID = snapshot.id;
        return index.deleteObject(objectID);
    });
