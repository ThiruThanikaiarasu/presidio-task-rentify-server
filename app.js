const express = require('express')
const app = express()

const { PORT } = require('./configuration/config')
const connect = require('./database/connection')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoute = require('./routers/userRouter')

app.get('/', (request, response) => {
    response.status(200).send({ message: "it's working ✌️"})
})

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1/user', userRoute)

connect() 
    .then( () => {
        try{
            app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })