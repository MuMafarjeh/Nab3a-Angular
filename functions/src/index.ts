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

// exports.helloWorld = functions.https.onRequest((req, res) => {
//     admin.auth().createUser
// });

const userCollection = '/user/';

exports.register = functions.https.onCall(async (data, context) => {

    const authInfo = {
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.name,
        emailVerified: false
    };

    console.log("before createUser")
    const userRecord = await admin.auth().createUser(authInfo);

    console.log("before add doc")
    delete data.emailVerified;
    delete data.password;
    await admin.firestore().doc(userCollection + '' + userRecord.uid).create(data);
    console.log(`New registeration: ${data.name}`);

    const emailLink = await admin.auth().generateEmailVerificationLink(data.email);
    console.log(`email verification link sent to ${data.email}, ${emailLink}`);
    return emailLink;
});

// exports.insertUser = functions.https.user().onCreate((user) => {
//     admin.firestore().collection('/test').where()
//     })
// });

import * as algoliasearch from 'algoliasearch';

//Init algolia
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('item_NAME');

exports.indexItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onCreate((snapshot, context) => 
    {
        const data = snapshot.data();
        console.log(data);
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
