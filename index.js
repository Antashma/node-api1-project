const express = require('express');
const shortid = require('shortid');


/* 
*** USER SCHEMA ***
{
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
} 
*/

let users = [
    {
        id: 0, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    } ,
    {
        id: 1, 
        name: "John Doe", 
        bio: "Not Schmoe, another Joe",
      } 
]   

/*
*** ENDPOINTS ***
POST    /api/users	Creates a user using the information sent inside the request body.
GET     /api/users	Returns an array users.
GET	    /api/users/:id	Returns the user object with the specified id.
DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
PUT	    /api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

*/

const server = express();
server.use(express.json());

// ENDPOINTS
//GET DEFAULT
server.get('/', (req, res) => {
    res.json({
        greeting: 'hello world!'
    })
})

//GET USERS
server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

//POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo)
})




/* 
If the request body is missing the name or bio property:
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
 */

 
const PORT = 5000;
server.listen(PORT, () => {
    console.log('*** server is running ***')
})
