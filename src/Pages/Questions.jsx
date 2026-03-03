import { useParams } from "react-router-dom";
import { useState } from "react";
import HomeData from "../JSON/HomeData.json";

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { id } = useParams();

    
    const selectedCourse = HomeData.Courses.find(
        (course) => course.CourseId === Number(id)
    );

    const currentQuestion =
  selectedCourse.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < selectedCourse.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz Finished");
    }
  };
  return (
    <div>
      <h2>{selectedCourse.CourseName} Questions</h2>
  
      <h3>
        Question {currentQuestionIndex + 1} /
        {selectedCourse.questions.length}
      </h3>
  
      <p>{currentQuestion.question}</p>
  
      <ul>
        <li>{currentQuestion.option1}</li>
        <li>{currentQuestion.option2}</li>
        <li>{currentQuestion.option3}</li>
        <li>{currentQuestion.option4}</li>
      </ul>
  
      <button onClick={handleNext}>
        Submit Answer
      </button>
  
      <button onClick={handleNext} style={{marginLeft:"10px"}}>
        Skip
      </button>
    </div>
  );
}

export default Questions
