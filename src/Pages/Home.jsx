import React from "react";
import HomeData from "../JSON/HomeData.json";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h3 className="text-center my-3">All Courses</h3>

      <div className="row">
        {HomeData.Courses.map((course) => (
          <div className="col-md-4 mb-3" key={course.CourseId}>
            <div className="card text-center">
              
              <img
                src={course.image}
                className="card-img-top mx-auto mt-2"
                alt={course.CourseName}
                style={{ height: "100px", width: "100px" }}
              />

              <div className="card-body">
                <h5 className="card-title">{course.CourseName}</h5>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/questions/${course.CourseId}`)}
                >
                  View Questions
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;