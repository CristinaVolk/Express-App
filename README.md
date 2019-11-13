# Express-App

Usage of endpoints: 
signup
type: POST
params:  localhost:8081/signup
example content in a body: 
{
    "displayName":"Kristina",
    "email":"KV@gmail.com",
    "password":"pss"   
}
note: registering twice with the same email is forbidden, when testing 
registration we should change an email each time. Every field is required during the registering process.
valid response: object with the newly registered user

Edit info about the user
	type: PATCH
	params: localhost:8081/signup/:id
	note: on the backend we check the missing fields. 

Login
	type: POST
	params: localhost:8081/login
	example content in a body: 
	{
                   "email":"KV@gmail.com",
                   "password":"pss"
	}
            valid response:  custom Token is created and later is supposed to be sent into headers to enable another requests


Delete the user
	type: DELETE
	params: localhost:8081/users/:id
	note: valid response : an empty object


Get the list of all users stored in database
	type: GET
	params: localhost:8081/users
    note: proceeded without authentification

Get the particular user stored in database  
	type: GET
	params: localhost:8081/users/:id
    note: proceeded with authentification

Get the json file with some random data about the colors  
	type: GET
	params: localhost:8081/colors
    note: testing how json file could be sent to the client-side


