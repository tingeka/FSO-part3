const express = require('express')
const app = express()
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid');

let persons = [
    { 
      "id": '87cf550b-d42d-450e-9539-e5ba05197d31',
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 'c10151d5-7427-4b66-9b41-f09e72a5b817',
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": '632ed2dd-3158-4a9e-9f28-42043e2e2531',
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": '4e032fd3-5bbe-4a86-ae9f-fc6f8ba64f6e',
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  }))
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid');

let persons = [
    { 
      "id": '87cf550b-d42d-450e-9539-e5ba05197d31',
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 'c10151d5-7427-4b66-9b41-f09e72a5b817',
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": '632ed2dd-3158-4a9e-9f28-42043e2e2531',
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": '4e032fd3-5bbe-4a86-ae9f-fc6f8ba64f6e',
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  }))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const totalPersons = persons.length
    const date = new Date();
    response.send(
        `
        <h1>
            Phonebook has info for ${totalPersons} persons
        </h1>
        <p>${date}</p>
        `
    )
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
    if (!request.body.name) { 
        return response.status(400).json(
            { error: 'name missing' }
    ) }

    if (!request.body.number) { 
        return response.status(400).json(
            { error: 'number missing' }
    ) }

    if ( persons.find(person => person.name === request.body.name)) { 
        return response.status(400).json(
            { error: 'name must be unique' }
    ) }
    const person = {
        "id": uuidv4(),
        "name": request.body.name,
        "number": request.body.number
    }

    if (person) {
        persons.push(person)
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})