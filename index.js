const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost:27017/minhas-series'

const bodyParser = require('body-parser')

const pages = require('./routes/pages')
const series = require('./routes/series')

mongoose.Promise = global.Promise

app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/', pages)
app.use('/series', series)

app.use(express.static('public'))

mongoose
    .connect(mongo,  { useNewUrlParser: true,  useUnifiedTopology: true  },)
    .then(()=> {
        app.listen(port, () =>{
            console.log('Listening on: ' + port)
        })
    })
    .catch(e => {
        console.log(e)
    })