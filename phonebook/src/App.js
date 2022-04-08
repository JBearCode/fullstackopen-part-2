import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')

  const checkForDuplicate = (name) => persons.map(ob => ob.name).includes(name)

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      id: persons.length,
    }
    if (checkForDuplicate(numberObject.name)) {
      alert(`${numberObject.name} is already in the phonebook!`)
      setNewName('');
    } else {
      setPersons(persons.concat(numberObject))
      setNewName('');
    }
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName}
                       onChange={handleInputChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => 
        <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}


export default App