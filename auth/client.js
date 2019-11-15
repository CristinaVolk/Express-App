import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDNktS7dAIvSDO3wumhOfQo-5k_0ndJ_0w",
    authDomain: "node-express-test-74841.firebaseapp.com",
    databaseURL: "https://node-express-test-74841.firebaseio.com",
    projectId: "node-express-test-74841",
    storageBucket: "node-express-test-74841.appspot.com",
    messagingSenderId: "133884851360",
    appId: "1:133884851360:web:ff44f5e69d62302e42c5c5",
    measurementId: "G-PQSY919FG4"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export default firebase;