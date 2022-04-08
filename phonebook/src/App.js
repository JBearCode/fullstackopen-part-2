import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const checkForDuplicate = (name) => persons.map(ob => ob.name).includes(name)

  const addPerson = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber,
      id: persons.length,
    }
    if (checkForDuplicate(numberObject.name)) {
      alert(`${numberObject.name} is already in the phonebook!`)
      setNewName('');
      setNewNumber('');
    } else {
      setPersons(persons.concat(numberObject))
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input type="text" value={newName} onChange={handleNameChange}/></div>
        <div>number: <input type="number" value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}


export default App