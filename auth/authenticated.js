import admin from './admin';
import { auth } from './client'


const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};


export const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async() => {
        try {
            const { authToken } = req;
            console.log(typeof(authToken) + " Token from the header");

            const tokenCurrentUser = auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
                console.log(idToken + " Token from the current user")
            }).catch(function(error) {
                console.log(error)
            });

            if (authToken.localeCompare(tokenCurrentUser)) {
                return next();
            }
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};

export async function loginUser(email, password) {
    let userToken;
    const user = await auth().signInWithEmailAndPassword(email, password);
    if (user) {
        let userID = user.user.uid
        const customToken = await admin.auth().createCustomToken(userID)
        if (customToken) {
            console.log(customToken)
            userToken = customToken
        } else console.log('Error creating custom token');
    } else console.log("Error during signing the user")
    return userToken;
}