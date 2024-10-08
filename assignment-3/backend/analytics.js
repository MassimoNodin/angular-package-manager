const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function incrementCRUD(CRUDMethod) {
    if (CRUDMethod==0) method = "insert";
    else if (CRUDMethod==1) method = "retrieve";
    else if (CRUDMethod==2) method = "update";
    else if (CRUDMethod==3) method = "delete";
    await db.collection('a2-analytics').doc("stats").update({ [method]: admin.firestore.FieldValue.increment(1)});
}

module.exports = { incrementCRUD, db };