import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''})

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  if (!persons) {
    return null;
  }

  const handleNewName = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value });
  };

  const handleNewNumber = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value });
  };

  const addName = (event) => {
    event.preventDefault();

    personService.create({name: newPerson.name, number: newPerson.number}).then((response) => {
      console.log(response)
       const newPersonObject = {
         id: response.id,
         name: response.name,
         number: response.number,
       };

       setPersons(persons.concat(newPersonObject));

    }).catch((err) => {
      console.log(err.response.data)
      alert(`${newPerson.name} is already in the phonebook`)
    })   

  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newPerson.name} onChange={handleNewName} />
        </div>

        <div>
          number:
          <input value={newPerson.number} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
