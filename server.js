const express = require('express')
const app = express()
const http = require('http')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const authRoutes = require('./routes/auth')

const httpServer = http.createServer(app)

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use('/api/v1', authRoutes)

httpServer.listen(4000, () => {
    console.log('Server started on 4000!')
})

app.get('/api/v1', (req, res) => {
    res.send('Auths working')
})

module.exports = app