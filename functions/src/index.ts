import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ItemCart } from './item.cart';
import { UserBusiness } from './userbusiness';

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

const firestore = admin.firestore();

// exports.helloWorld = functions.https.onRequest((req, res) => {
//     admin.auth().createUser
// });

exports.notifyBusinessWhenOrder = functions.firestore.document('/order/{orderID}').onWrite(async (snapshot, context) => 
{
    if(!snapshot || !snapshot.after)
    {
        console.error("snapshot does not exist");
        return;
    }

    const orderData = snapshot.after.data()

    if(!orderData)
    {
        console.error("Order doesn't exist");
        return;
    }

    if(!orderData.type || orderData.type !== "order")
    {
        return;
    } 

    const notifDocuments = await firestore.collection('notification')
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

    await firestore.collection('notificationLog').add(notificationLog);
});

const getBusinessData = async function(businessIDs: FirebaseFirestore.DocumentReference[]): Promise<UserBusiness[]>
{
    const _businessData: UserBusiness[] = [] as UserBusiness[];
    if(!businessIDs || businessIDs.length == 0)
        return _businessData;

    const docs = await firestore.getAll(...businessIDs);

    if(!docs)
    {
        return _businessData;
    }
    
    docs.forEach((doc) => {
        const id = doc.id;
        const user = { id, ...doc.data() } as UserBusiness;
        _businessData.push(user);
    });
    
    return _businessData;
}

exports.getCartsForUser = functions.https.onCall(async (data, context) =>
{
    if(!context)
    {
        console.error("unverified token");
        return;
    }

    if(!data)
    {
        console.error("no userID provided");
        return {
            businessData: [],
            carts: []
        }
    }

    const userID: string = data;
    let firstTime: boolean = true;

    const _carts: ItemCart[][] = [[]] as ItemCart[][];
    const _businessIDs: FirebaseFirestore.DocumentReference[] = [] as FirebaseFirestore.DocumentReference[];
    let _businessData: UserBusiness[] = [] as UserBusiness[];

    const docs = firestore.collection('cart')
        .where('customerID', '==', userID).orderBy('businessID').get();

        await docs.then(async (result) => 
        {
            const itemDocs = result.docs;
            let i: number = 0;
            if(itemDocs.length > 0)
            {
                itemDocs.forEach(a => {

                    if(a.data().valid === null || a.data().valid === undefined || 
                        a.data().valid === true)
                    {
                        const itemData = a.data();
                        // delete itemData['id'];
                        const item = { cartID: a.id, ...itemData } as ItemCart;
    
                        if(firstTime)
                        {
                            _businessIDs.push(firestore.doc(`user/${item.businessID}`));
                            firstTime = false;
                        }
    
                        if(_carts[i][0] && _carts[i][0].businessID !== item.businessID)
                        {
                            i++;
                            _carts.push([] as ItemCart[]);
                            _businessIDs.push(firestore.doc(`user/${item.businessID}`));
                        }
    
                        _carts[i].push(item);
                    }
                    
                });
                // TODO - FIX 5ARA
                _businessData = await getBusinessData(_businessIDs);
            }
        }, 
        (e) => {
            console.error("cart error", e);
        });
    
    return {
        businessData: _businessData,
        carts: _carts
    }
});

exports.updateCartQuantity = functions.https.onCall(async (data, context) =>
{
    console.log(data)

    if(!context)
    {
        console.error("unverified token");
        return false;
    }

    if(!data)
    {
        console.error("no data provided");
        return false;
    }

    const item = data as ItemCart;

    // console.log(item.cartID);

    const itemInCart = (await firestore.doc(`cart/${item.cartID}`).get()).data() as ItemCart;
    const quantity = (itemInCart? itemInCart.quantity: 0) + item.quantity;

    if(!itemInCart || !itemInCart.stock || quantity > itemInCart.stock)
        return false;

    let result: boolean = true;

    await firestore.doc(`cart/${item.cartID}`).update({quantity: quantity})
        .then(() => result = true)
        .catch(() => result = false);

    return result;
});

exports.register = functions.https.onCall(async (data, context) => {

    // console.error("context");
    // console.error(context)

    if(!context)
    {
        console.error("unverified token");
        return;
    }
    
    const authInfo = {
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.name,
        emailVerified: true
    };

    // console.error("before createUser")
    const userRecord = await admin.auth().createUser(authInfo);

    // console.error("before add doc")
    delete data.emailVerified;
    delete data.password;
    await firestore.doc(userCollection + '' + userRecord.uid).create(data);
    // console.error(`New registeration: ${data.name}`);

    const emailLink = await admin.auth().generateEmailVerificationLink(data.email);
    // console.error(`email verification link sent to ${data.email}, ${emailLink}`);
    return emailLink;
});

// exports.insertUser = functions.https.user().onCreate((user) => {
//     firestore.collection('/test').where()
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
const inventoryItemCollectionRef = firestore.collection("inventory_item");
const itemCollectionRef = firestore.collection("item");
const usersCollectionRef = firestore.collection("user");

function inventoryItemObject(data: any): any
{
    return data; 
}

/////////////////////
///Inventory item in ALL_INDEX
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

exports.ALL_INDEX_updateInventoryItem = functions.firestore
    .document('inventory_item/{itemID}')
    .onUpdate((change, context) => 
    {
        if(change.after)
        {
            const objectID = change.after.id;
            const data = change.after.data();

            return all_index.saveObject
            ({
                objectID,
                ...data
            })
        }
        else
            return null;
    })  

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
        console.error(req.query);
        console.error('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const itemsDocs = await inventoryItemCollectionRef.get();
        
        if(!itemsDocs)
        {
            console.error('no results');
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
        if(!data || data.type !== 'business')
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

exports.ALL_INDEX_updateBusiness = functions.firestore
    .document('user/{userID}')
    .onUpdate((change, context) => 
    {
        if(change.after)
        {
            const objectID = change.after.id;
            const data = change.after.data();

            return all_index.saveObject
            ({
                objectID,
                ...data
            })
        }
        else
            return null;
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
        console.error(req.query);
        console.error('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const usersDocs = await usersCollectionRef.get();
        
        if(!usersDocs)
        {
            console.error('no results');
            resp.status(404).send('no results');  
        }

        const usersObjects: {}[] = [];

        usersDocs.forEach((result) => 
        {
            const data = result.data();
            if(data && data.type === 'business')
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
exports.ITEM_INDEX_addItem = functions.firestore
    .document('item/{itemID}')
    .onCreate((snapshot, context) => 
    {
        const data = snapshot.data();
        const objectID = snapshot.id;

        //Add data to algolia index
        return items_index.addObject
        ({
            objectID,
            ...data
        })
    });

exports.ITEM_INDEX_removeItem = functions.firestore
    .document('item/{itemID}')
    .onDelete((snapshot, context) => 
    {
        const objectID = snapshot.id;
        return items_index.deleteObject(objectID);
    });

exports.ITEM_INDEX_updateItem = functions.firestore
    .document('item/{itemID}')
    .onUpdate((change, context) => 
    {
        if(change.after)
        {
            const objectID = change.after.id;
            const data = change.after.data();

            return all_index.saveObject
            ({
                objectID,
                ...data
            })
        }
        else
            return null;
    });

exports.ITEM_INDEX_admin_duplicateItems = functions.https.onRequest(async (req, resp) => {
    if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
    {
        console.error(req.query);
        console.error('unauthorized');
        resp.status(401).send('unauthorized');
    }
    else
    {
        const itemsDocs = await itemCollectionRef.get();
        
        if(!itemsDocs)
        {
            console.error('no results');
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
//         console.error(req.query);
//         console.error('unauthorized');
//         resp.status(401).send('unauthorized');
//     }
//     else
//     {
//         const itemsDocs = await inventoryItemCollectionRef.get();
        
//         if(!itemsDocs)
//         {
//             console.error('no results');
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





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////                                   Other admin things
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// exports.admin_addProfilePhoto = functions.https.onRequest(async (req, resp) => {
//     if(!req.query || !req.query.pincode || req.query.pincode !== adminPinCode)
//     {
//         console.error(req.query);
//         console.error('unauthorized');
//         resp.status(401).send('unauthorized');
//     }
//     else
//     {
//         if(!req.query.photourl || !req.query.uid)
//         {
//             console.error('missing parameters');
//             resp.status(401).send('missing parameters');
//         }
//         else
//         {
//             await admin.auth().updateUser(req.query.uid, 
//                 {
//                     photoURL: req.query.photourl
//                 });

//             resp.status(200).send({status: 'done'});
//         }
//     }
// })