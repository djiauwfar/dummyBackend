const express = require('express')
const cors = require('cors')

const { authentication, authorization } = require('./helpers/middlewares')
const SuperController = require('./controllers/controller')
const errorHandler = require('./helpers/errorHandler')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', express.urlencoded({
  extended: false
}))

app.get('/', SuperController.welcome)
app.post('/login', SuperController.login)
app.get('/content/data/:username', SuperController.getContent)

app.use(authentication)

app.post('/content/create', SuperController.createContent)
app.put('/content/update/:id', authorization, SuperController.putContent)
app.delete('/content/delete/:id', authorization, SuperController.deleteContent)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
})