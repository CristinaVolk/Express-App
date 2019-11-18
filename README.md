# Express-App
## How to run the poject:

1. Create a new project in the Firebase console
2. Genereate ServiceKey and download the JSON file

```
To generate a private key file for your service account:
 - In the Firebase console, open Settings > Service Accounts.
 - Click Generate New Private Key, then confirm by clicking Generate Key.
 - Securely store the JSON file containing the key.
 
```
3. Add it to a path in your environment by typing the following in your Terminal
```
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
```
4. Open the admin.js file and Initialize the SDK as shown:
```
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
```
5. Type npm install
6. Type node -r esm index.js


## Usage of endpoints:
###  signup

* type: POST 

* params:  localhost:8081/signup
```
example content in a body: 
{
      "email":"volk44@gmail.com",
      "password":"111111",
      "firstName":"Cris",
      "lastName":"Blondie"
}
```
* note: registering twice with the same email is forbidden, when testing registration we should change an email each time. Every field is required during the registering process.
* valid response: object with the newly registered user

### Edit info about the user
* type: PATCH
* params: localhost:8081/signup/:id
* note: on the backend we check the missing fields. 
```
example content in a body: 
{
     "displayName": "Jane Doe",
     "password": "newPassword",
     "email": "my@example.com",
     "emailVerified": true,
     "role": "admin"
}
```
* valid response:  updated User object

### Login
* type: POST
* params: localhost:8081/login
```
example content in a body: 
{
     "email":"volk44@gmail.com",
     "password":"111111"
}
```
* valid response:  custom Token is created and later is supposed to be sent into headers to enable another requests


### Delete the user
* type: DELETE
* params: localhost:8081/users/:id
* note: valid response : an empty object


### Get the list of all users stored in database
* type: GET
* params: localhost:8081/users
* note: proceeded without authentification

### Get the particular user stored in database  
* type: GET
* params: localhost:8081/users/:id
* note: proceeded with authentification

### Get the json file with some random data about the colors  
* type: GET
* params: localhost:8081/colors
* note: testing how json file could be sent to the client side


