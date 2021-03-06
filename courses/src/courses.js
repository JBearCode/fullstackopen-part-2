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

  export default Course