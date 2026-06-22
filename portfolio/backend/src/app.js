const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const projectRoutes = require('./routes/project.routes')
const experienceRoutes = require('./routes/experience.routes')
const achievementRoutes = require('./routes/achievement.routes')

const app = express()

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Helllooooo")
})

app.use('/auth', authRoutes)
app.use('/project', projectRoutes)
app.use('/achievements', achievementRoutes)
app.use('/experience', experienceRoutes)

module.exports = app