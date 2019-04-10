import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const adminPinCode: string = 'Q25UWl5DuKWPW4RLBYUZ1C67qSHIE9Ly';

admin.initializeApp();
const env = functions.config();
const userCollection = '/user/';

// exports.helloWorld = functions.https.onRequest((req, res) => {
//     admin.auth().createUser
// });

exports.notifyBusinessWhenOrder = functions.firestore.document('/order/{orderID}').onCreate(async (snapshot, context) => 
{
    const orderData = snapshot.data();

    if(!orderData)
    {
        console.error("Order doesn't exist");
        return;
    }

    const notifDocuments = await admin.firestore().collection('notification')
        .where('type', '==', 'customerToBusiness').where('subtype', '==', 'order').get();

    if(!notifDocuments)
    {
        console.error("Notification doesn't exist");
        return;
    }

    const notifDocument = notifDocuments.docs.pop();

    if(!notifDocument)
    {
        console.error("Notification doesn't exist");
        return;
    }

    const notificationLog = {
        textContent: notifDocument.data().textContent,
        dateSent: admin.firestore.FieldValue.serverTimestamp(),
        fromID: orderData.customerID,
        toID: orderData.businessID,
        notificationID: notifDocument.id,
        fromName: orderData.customerName,
        toName: orderData.businessName
    }

    await admin.firestore().collection('notificationLog').add(notificationLog);
});

exports.register = functions.https.onCall(async (data, context) => {

    console.log("context");
    console.log(context)

    if(!context)
    {
        console.log("unverified token");
        return;
    }
    
    const authInfo = {
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.name,
        emailVerified: true
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





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////                                   ALGOLIA
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


import * as algoliasearch from 'algoliasearch';

//Init algolia
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);

//Init indexes
const all_index = client.initIndex('ALL_INDEX');
const items_index = client.initIndex('ITEMS_INDEX');
// const inventory_items_index = client.initIndex('INVENTORY_ITEMS_INDEX');
// const stores_index = client.initIndex('STORES_INDEX');

//Init collections
const inventoryItemCollectionRef = admin.firestore().collection("inventory_item");
const itemCollectionRef = admin.firestore().collection("item");
const usersCollectionRef = admin.firestore().collection("user");

function inventoryItemObject(data: any): any
{
    
}

/////////////////////
///Inventory item iin ALL_INDEX
/////////////////////
exports.ALL_INDEX_addInventoryItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onCreate((snapshot, context) => 
    {
        const data = inventoryItemObject(snapshot.data());
        const objectID = snapshot.id;

        //Add data to algolia index
        return all_index.addObject
        ({
            objectID,
            ...data
        })
    });

exports.ALL_INDEX_removeInventoryItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onDelete((snapshot, context) => 
    {
        const objectID = snapshot.id;
        return all_index.deleteObject(objectID);
    });

exports.ALL_INDEX_admin_duplicateInventoryItems = functions.https.onRequest(async (req, resp) => {
    if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
    {
        console.log(req.query);
        console.log('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const itemsDocs = await inventoryItemCollectionRef.get();
        
        if(!itemsDocs)
        {
            console.log('no results');
            resp.status(404).send('no results');  
        }

        const itemsObjects: {}[] = [];

        itemsDocs.forEach((result) => 
        {
            const objectID = result.id;
            const data = result.data();
            itemsObjects.push({ objectID, ...data });
        })

        /* const task = */ await all_index.addObjects(itemsObjects);

        resp.status(200).send({status: 'done'});
    }
});


/////////////////////
///Business in ALL_INDEX
/////////////////////
exports.ALL_INDEX_addBusiness = functions.firestore
    .document('user/{userID}')
    .onCreate((snapshot, context) => 
    {
        const data = snapshot.data();
        if(!data || data.type != 'business')
        {
            return;
        }
        const objectID = snapshot.id;

        //Add data to algolia index
        return all_index.addObject
        ({
            objectID,
            ...data
        })
    });

exports.ALL_INDEX_removeBusiness = functions.firestore
    .document('user/{userID}')
    .onDelete((snapshot, context) => 
    {
        const objectID = snapshot.id;
        return all_index.deleteObject(objectID);
    });

exports.ALL_INDEX_admin_duplicateBusiness = functions.https.onRequest(async (req, resp) => {
    if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
    {
        console.log(req.query);
        console.log('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const usersDocs = await usersCollectionRef.get();
        
        if(!usersDocs)
        {
            console.log('no results');
            resp.status(404).send('no results');  
        }

        const usersObjects: {}[] = [];

        usersDocs.forEach((result) => 
        {
            const data = result.data();
            if(data && data.type == 'business')
            {
                const objectID = result.id;
                usersObjects.push({ objectID, ...data });
            }
        })

        /* const task = */ await all_index.addObjects(usersObjects);

        resp.status(200).send({status: 'done'});
    }
});


/////////////////////
///Global Items
/////////////////////
exports.ITEM_INDEX_admin_duplicateItems = functions.https.onRequest(async (req, resp) => {
    if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
    {
        console.log(req.query);
        console.log('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const itemsDocs = await itemCollectionRef.get();
        
        if(!itemsDocs)
        {
            console.log('no results');
            resp.status(404).send('no results');  
        }

        const itemsObjects: {}[] = [];

        itemsDocs.forEach((result) => 
        {
            const objectID = result.id;
            const data = result.data();
            itemsObjects.push({ objectID, ...data });
        })

        /* const task = */ await items_index.addObjects(itemsObjects);

        resp.status(200).send({status: 'done'});
    }
})


/////////////////////////////////////////////////////////////////////////////////////

/////////////////////
///Inventory item in INVENTORY_ITEMS_INDEX
/////////////////////  
// exports.INVENTORY_ITEMS_INDEX_addInventoryItem = functions.firestore
//     .document('inventory_item/{itemID}')
//     .onCreate((snapshot, context) => 
//     {
//         const data = snapshot.data();
//         const objectID = snapshot.id;

//         //Add data to algolia index
//         return inventory_items_index.addObject
//         ({
//             objectID,
//             ...data
//         })
//     });

// exports.INVENTORY_ITEMS_INDEX_removeInventoryItem = functions.firestore
//     .document('inventory_item/{itemID}')
//     .onDelete((snapshot, context) => 
//     {
//         const objectID = snapshot.id;
//         return inventory_items_index.deleteObject(objectID);
//     });

// exports.INVENTORY_ITEMS_INDEX_admin_duplicateInventoryItems = functions.https.onRequest(async (req, resp) => {
//     if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
//     {
//         console.log(req.query);
//         console.log('unauthorized');
//         resp.status(401).send('unauthorized');
//     }
//     else
//     {
//         const itemsDocs = await inventoryItemCollectionRef.get();
        
//         if(!itemsDocs)
//         {
//             console.log('no results');
//             resp.status(404).send('no results');  
//         }

//         const itemsObjects: {}[] = [];

//         itemsDocs.forEach((result) => 
//         {
//             const objectID = result.id;
//             const data = result.data();
//             itemsObjects.push({ objectID, ...data });
//         })

//         /* const task = */ await inventory_items_index.addObjects(itemsObjects);

//         resp.status(200).send({status: 'done'});
//     }
// });

