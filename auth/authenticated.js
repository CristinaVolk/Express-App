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
                console.log(typeof(idToken) + " Token from the current user!!!!!!")
            }).catch(function(error) {
                console.log(error)
            });

            if (authToken.localeCompare(tokenCurrentUser)) {
                console.log("YES")
                return next();
            }
            /*const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();*/
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};

export async function loginUser(email, password) {
    let userId;
    await auth().signInWithEmailAndPassword(email, password).then((user) => {
        if (user) {
            userId = user.user.uid
            auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
                // Send token to your backend via HTTPS
                console.log(idToken + " Token!!!!!!")
            }).catch(function(error) {
                console.log(error)
            });
        } else console.log("Error during signing the user")
    });
    return userId;
}