import { useNavigate } from "react-router-dom";
import HomeData from "../JSON/HomeData.json";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4> Hello world </h4>
{HomeData.Courses.map((course) => (
  <div key={course.CourseId}
  onClick={() => navigate(`/questions/${course.CourseId}`)}
  style={{
    border: "2px solid black", 
    padding: '15px', 
    margin: '15px',
    cursor: 'pointer'
  }}
  >
    <h3> {course.CourseName}</h3>

    </div>
    ))}
    </div>
  );
}

export default Home
