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
        id: '0', // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    } ,
    {
        id: '1', 
        name: "John Doe", 
        bio: "Not Schmoe, another Joe",
      } 
]   

const server = express();
server.use(express.json());

/*
*** ENDPOINTS ***
POST    /api/users	Creates a user using the information sent inside the request body.
GET     /api/users	Returns an array users.
GET	    /api/users/:id	Returns the user object with the specified id.
DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
PUT	    /api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
*/

//GET DEFAULT
server.get('/', (req, res) => {
    res.json({
        greeting: 'hello there!',
        names: ['jesvir', 'zabryna', 'gladymir']
    });
});

//GET ALL USERS
server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

//GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const selected = users.find(user => user.id === id)
    res.status(200).json(selected)
})

/* 
If the request body is missing the name or bio property:
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
 */

//POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: 'Please provide name AND bio for the user.'})
    } else {
        userInfo.id = shortid.generate();
        users = [...users, userInfo];
        res.status(201).json(userInfo);
    }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const deletedUser = users.find(user => user.id === id);
    if (deletedUser) {
        const newUserArr = users.filter(user => user.id !== id);
        users = [...newUserArr];
        res.status(200).json(`Succefully deleted ${deletedUser.name}!`) 
    } else {
        res.status(404).json({message: `Delete failed! User with ID#${id} not found.` })
    }
})

//PUT
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const editInfo = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    users[userIndex] = {...users[userIndex], ...editInfo}
    
    res.status(200).json(users[userIndex]);
})



 
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`*** server is running on port ${PORT} ***`)
})
