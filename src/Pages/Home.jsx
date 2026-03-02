import HomeData from "../JSON/HomeData.json";
import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
  <h3> ALL Courses </h3>    
  {HomeData.Courses.map((course) => (
    <div key={course.CourseId}
    onClick = {() => navigate(`/questions/${course.CourseId}`)}
    style={{ border: "2px solid black", padding: "20px", margin: "20px", Course: "pointer"}}>
<img src={course.image} />

  <h3>{course.CourseName} </h3>
    </div>
      ))}
      </div>
  )
}

export default Home
