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
  /*
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToDisplay(response.data)
  */
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
      alert(`${numberObject.name} is already in the phonebook!`)
      setNewName('');
      setNewNumber('');
    } else {
      /*
      axios
      .post('http://localhost:3001/persons', numberObject)
      .then(response => {
        console.log(response)
        setPersonsToDisplay(persons.concat(response.data))
        setPersons(persons.concat(response.data))
      }) */
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
      <Numbers personsToDisplay={personsToDisplay}/>
    </div>
  )
}

const Numbers = ({personsToDisplay}) => {
  return (
    <div>
    <h2>Numbers</h2>
    {personsToDisplay.map((person) => 
      <p key={person.id}>{person.name} {person.number}</p>
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