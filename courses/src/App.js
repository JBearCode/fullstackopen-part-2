const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      }, 
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ] 
  }
  
  return (
  <Course course={course}/>
  )
}

const Course = (props) => {
  console.log(props.course);
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
    <h1>{props.course.name}</h1>
  </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises}/>
    </>
    )
}

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
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises +
                              props.course.parts[1].exercises +
                              props.course.parts[2].exercises}
      </p>
    </>
    )
}

export default App;
