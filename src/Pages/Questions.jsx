import React from 'react'
import { useParams } from 'react-router-dom'
import  HomeData  from '../JSON/HomeData.json';

const Questions = () => {
    const {id} = useParams();

    const selectCourse = HomeData.Courses.find(
        (course) => course.CourseId === Number(id)
    )
  return (
    <div>
      <h2>{selectCourse.CourseName} Questions </h2>
      {selectCourse.questions.map((q) => (
        <div key={q.id} style={{marginBottom: "20px"}}>
            <p> {q.question}</p>
            <ul> <li> {q.option1}</li>
            <li> {q.option2}</li>
            <li> {q.option3}</li>
            <li> {q.option4}</li></ul>
</div>
      ))}
    </div>
  )
}

export default Questions
