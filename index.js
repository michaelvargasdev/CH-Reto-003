const PORT = 3000

const express = require('express')
const cors = require('cors')

const routes = require('./routers')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', routes)

app.listen(PORT, _ => `Server run on port ${PORT}`)
