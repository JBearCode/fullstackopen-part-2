import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  useEffect(() => {
    console.log('effect begins')
    personsService
        .getAll()
        .then(response => {
          setPersons(response.data)
          setPersonsToDisplay(response.data)
      })
  }, [])

  const checkForDuplicate = (name) => persons.map(ob => ob.name).includes(name)

  const addPerson = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber,
    }
    if (checkForDuplicate(numberObject.name)) {
      if (window.confirm(`${numberObject.name} is already in the phonebook! Would you like to update their number?`)) {
        const originalPerson = persons.find(p => p.name === numberObject.name)
        personsService
          .update(originalPerson.id, numberObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== originalPerson.id ? p : response.data ))
            setPersonsToDisplay(personsToDisplay.map(p => p.id !== originalPerson.id ? p : response.data ))
          })
      }
      setNewName('');
      setNewNumber('');
    } else {
      personsService
        .create(numberObject)
        .then(response => {
          console.log(response)
          setPersonsToDisplay(persons.concat(response.data))
          setPersons(persons.concat(response.data))        
      })    
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (value) => {
    setFilterBy(value);
    console.log(value);
    if (!value) {
      setPersonsToDisplay(persons)
    } else {
      setPersonsToDisplay(persons.filter(person =>
      person.name.toLowerCase().includes(filterBy.toLowerCase()) === true
    ));}
  }

  const handleDeleteClick = (person) => {
    console.log(`ID ${person.id} must be deleted`)
    if (window.confirm(`Do you want to delete your contact ${person.name}?`))
    personsService
      .deleteResource(person.id)
      .then(response => {
          personsService.getAll() 
          .then(response => {
            setPersons(response.data)
            setPersonsToDisplay(response.data)
          })
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterBy={filterBy} onChange={handleFilterChange}/>
      <h2>Add Contact</h2>
      <Form newName={newName} 
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
            addPerson={addPerson}
      />
      <Numbers personsToDisplay={personsToDisplay}
               handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

const Numbers = ({personsToDisplay, handleDeleteClick}) => {
  return (
    <div>
    <h2>Numbers</h2>
    {personsToDisplay.map((person) => 
    <div key={person.id}>
      <span>{person.name} {person.number}</span>
      <button onClick={() => handleDeleteClick(person)}>Delete Contact</button>
    </div>
    )}
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>Name: <input type="text" value={props.newName} onChange={props.handleNameChange}/></div>
        <div>Number: <input type="number" value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
        <button type="submit">Add</button>
        </div>
    </form>
  )
}

const Filter = ({filterBy, onChange}) => {
  return (
    <div>Filter Contacts: <input 
      type="text" 
      value={filterBy} 
      onChange={(e) => onChange(e.target.value)}
    /></div>
  )
}


export default App