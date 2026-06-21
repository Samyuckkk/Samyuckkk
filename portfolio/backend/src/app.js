const express = require('express')
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Helllooooo")
})

app.use('/auth', authRoutes)

module.exports = app