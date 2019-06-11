const express = require('express')
const hbs = require('hbs') // handlebars
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// middleware. pass in function
app.use((req, res, next) => {
  // logs
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// comment out to render maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))
// =========================

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase()
})

// route for endpoint
// .get(url, function(request,response))
// response can be html or json
app.get('/', (req, res) => {
  // res.send('<h1>hello express</h1>')
  // res.send({
  //   name: 'Eugene',
  //   likes: ['Eating', 'Drinking', 'Sleeping']
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (req, res) => {
  // res.send('About Page')
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

// listen to port number
// listen(port number, function)
app.listen(port, () => {
  console.log(`Server is up in port ${port}`)
})
