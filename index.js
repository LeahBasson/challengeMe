import express from 'express'
import path from 'path'
import { connection as db} from './config/index.js'

//Create an express app 
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

//Middleware
app.use(router , express.static('./static'),
 express.json(), 
 express.urlencoded({
    extended:true
})
)

//Endpoint
router.get('^/$|/challenge', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})


router.get('/users', (req, res) => {
    try {
        const strQry = `SELECT userId, userName, userSurname, userAge, userEmail, userPwd
        FROM Users;`

        db.query(strQry, (err, results) => {
            if (err) throw new Error(err)
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
     catch(e){
        res.json({
            status: 404,
            msg: e.message
        })
    }
})

//THIS DISPLAYS DATA ACCORDING TO ITS ID
router.get('/users/:id', (req, res) => {
    try{
        const stryQry = `
        SELECT userId, userName, userSurname, userAge, userEmail, userPwd
        FROM Users WHERE userID = ${req.params.id};`
        db.query(stryQry, (err, result) => {
            if(err) throw new Error('Issue when retrieving a user.')
                res.json({
               status: res.statusCode,
               result: result[0]
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg:e.message
        })
    }
})

// POST: /register to add a user to the database
router.post('/register', (req, res) => {
    try{
        const stryQry = `
        INSERT INTO Users
        VALUES(DEFAULT, 'Tarryn', 'Arendse', 22, 'tarryn@gmail.com', 'tarryn')`
        db.query(stryQry, (err, result) => {
            if(err) throw new Error('Issue when retrieving a user.')
                res.json({
               status: res.statusCode,
               result: result[0]
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg:e.message
        })
    }
})

router.patch('/user/:id', (req, res) => {
    try{
        const stryQry = `
        UPDATE Users
        SET userAge = 21
        WHERE userID = 3`
        db.query(stryQry, (err) => {
            if(err) throw new Error('Issue when retrieving a user.')
                res.json({
               status: res.statusCode,
               msg: 'You have successfully updated'
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg:e.message
        })
    }
})

router.delete('/user/:id', (req, res) => {
    try {
 const strQry = `
            DELETE FROM Users
            WHERE userID = ${req.params.id}`;
        db.query(strQry, (err) => {
            if (err) throw new Error('Issue when deleting the user.');
            res.json({
                status: res.statusCode,
                message: 'User deleted successfully',
            });
        });
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message,
        });
    }
});


router.get('/products', (req, res) => {
    try {
        const strQry = `SELECT prodID, prodName, prodQuantity, prodPrice, prodURL, userID
        FROM Products;`

        db.query(strQry, (err, results) => {
            if (err) throw new Error(err)
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
     catch(e){
        res.json({
            status: 404,
            msg: e.message
        })
    }
})

router.get('/products/:id', (req, res) => {
    try{
        const stryQry = `
        SELECT * FROM Products WHERE prodID = ${req.params.id};`
        db.query(stryQry, (err, result) => {
            if(err) throw new Error('Issue when retrieving a user.')
                res.json({
               status: res.statusCode,
               result: result[0]
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg:e.message
        })
    }
})

router.post('/addProduct', (req, res) => {
    try{
        const stryQry = `
        INSERT INTO Products
        VALUES(103, 'Chain Necklace', 2, 600, 'https://leahbasson.github.io/MyImages/jsProject/circle3.jpg', 1)`
        db.query(stryQry, (err, result) => {
            if(err) throw new Error(err)
                res.json({
               status: res.statusCode,
               result: result[0]
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg:e.message
        })
    }
})


//If you looking for something that doesnt exist
router.get ('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'Resource Not Found'
    })
})

//listen assigns a port number to a server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
