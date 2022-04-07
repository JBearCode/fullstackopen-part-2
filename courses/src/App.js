const App = () => {
  const courses = [
    {
      name: 'Half Stack Application Development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  let copiedArray = [...courses];

  return (
    <div>
    <h1>Web Development Curriculum</h1>
      {copiedArray.map((course) =>
        <div key={course.id}>
          <Course course={course}/>
        </div>
      )}
    </div>
  )
}

const Course = (props) => {
  return (
  <div>
  <Header course={props.course}/>
  <Content course={props.course}/>
  <Total course={props.course}/>
  </div>
  )
}

const Header = (props) => {
  return (
  <>
    <h2>{props.course.name}</h2>
  </>
  )
}

const Content = ({course}) => {
  let newArray = [...course.parts];
  console.log(newArray);
  return (
    <>
      <div>
        {newArray.map(part =>
          <div key={part.id}>
          <Part id={part.id} part={part.name} exercise={part.exercises} />
          </div>
        )}
      </div>
    </>
    )
}

/* Mapping directly without using Part Component
       <div>
        {newArray.map(part =>
           <p key={part.id}>{part.name} {part.exercises}</p>
        )}
      </div>
*/

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Total = (props) => {
  const sumOfArray = [...props.course.parts]
    .map(item => item.exercises)
    .reduce((a, b) => a + b, 0)

  return (
    <>
      <p>Total of {sumOfArray} Exercises</p>
    </>
    )
}

export default App;