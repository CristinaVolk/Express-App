import admin from '../auth/admin';
import { auth } from '../auth/client';
import { loginUser } from '../auth/authenticated'


export async function all(req, res) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(user => {
            const customClaims = (user.customClaims || { role: '' });
            const role = customClaims.role ? customClaims.role : ''
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role,
                lastSignInTime: user.metadata.lastSignInTime,
                creationTime: user.metadata.creationTime
            }
        })

        return res.status(200).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function get(req, res) {
    try {
        const { id } = req.params
        const user = await admin.auth().getUser(id);
        const token = user.refreshToken;
        console.log(token);
        return res.status(200).send({ user })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function patch(req, res) {
    try {
        const { id } = req.params
        const { displayName, password, email, role } = req.body

        if (!id || !displayName || !password || !email || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const user = await admin.auth().updateUser(id, { displayName, password, email })
        await admin.auth().setCustomUserClaims(id, { role })
        return res.status(204).send({ user })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params

        await admin.auth().deleteUser(id)
        return res.status(204).send({})
    } catch (err) {
        return handleError(res, err)
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;

        let userToken = await loginUser(email, password)
        console.log(userToken)
        if (userToken) {
            res.status(200).json(userToken);
        } else console.log('Error creating custom token');
    } catch (err) {
        return handleError(res, err)
    }
}


export const createNewUser = async(req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
        } = req.body;

        const user = await admin.auth().createUser({
            email,
            password,
            displayName: `${firstName} ${lastName}`,
        });

        return res.status(200).send(user);

    } catch (err) {
        return handleError(res, err)
    }
}


export function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}