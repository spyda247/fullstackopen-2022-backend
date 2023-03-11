const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

/* Utility Helpers */

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min )
}
const nameExists = (name, persons) => {
 /*  console.log(name, persons) */
  const temp = persons.filter(person => person.name === name)
  return temp.length !== 0 
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

/* Middleware */
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('body', (req, res) => {
  if(req.method === 'POST')
    return(JSON.stringify(req.body))
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);



/* Routes */
app.get('/', (request, response) => {
  response.send('<h1>The Phonebook App</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const entries = persons.length
  const date = new Date().toUTCString()
  response.send(`
    <p>Phonebook has info for ${entries} people<p>
    ${date}
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.end()
})

app.post('/api/persons/', (request, response) => {
  const data = request.body
  if ((!data?.name || data.name === " ") || (!data?.number || data.number === " ")) {
   return response
    .json({message: 'missing name or number'})
    .end()
  } else if(nameExists(data.name, persons)) {
    return response
    .json({message: 'name must be unique'})
    .end()
  }

  const newPerson = {
    id: generateId(5, 100),
    name: data.name,
    number: data.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson).end()
})

app.use(unknownEndpoint)

/* Server */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})