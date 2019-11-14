import admin from 'firebase-admin';

const serviceAccount = require('C:/Users/volkk/Desktop/Proektiki/Express-App/serviceKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-express-test-74841.firebaseio.com"
});

export default admin;