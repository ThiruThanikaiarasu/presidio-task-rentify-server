const express = require('express')
const app = express()

const { PORT } = require('./configuration/config')

app.get('/', (request, response) => {
    response.status(200).send({ message: "it's working ✌️"})
})

app.listen(PORT, console.log(`Server is listening at http://localhost:${PORT}`))