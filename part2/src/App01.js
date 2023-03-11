import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const checkIfNameExists = (name) =>
    persons.some((person) => person.name === name);

  const addName = (event) => {
    event.preventDefault()
    const newPersonObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    checkIfNameExists(newName) 
      ? alert(`${newName} is already in the phonebook`)
      : setPersons(persons.concat(newPersonObject))    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
      
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <div key={person.name}>{person.name} {person.number}</div>
        ))}
      </div>

    </div>
  )
}

export default App;
