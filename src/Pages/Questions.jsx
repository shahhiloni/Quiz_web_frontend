import { useParams } from "react-router-dom";
import { useState } from "react";
import HomeData from "../JSON/HomeData.json";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { id } = useParams();

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const selectedCourse = HomeData.Courses.find(
    (course) => course.CourseId === Number(id)
  );

  const currentQuestion = selectedCourse.questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer("");

    if (currentQuestionIndex < selectedCourse.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div>
        <h2>Quiz Result</h2>
        <h3>Total Questions: {selectedCourse.questions.length}</h3>
        <h3>Correct Answers: {score}</h3>
        <h3>Wrong Answers: {selectedCourse.questions.length - score}</h3>
      </div>
    );
  }

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
        Question {currentQuestionIndex + 1} /{selectedCourse.questions.length}
      </h3>

      <p>{currentQuestion.question}</p>

      <ul>
        <li>
          <input
            type="radio"
            name="answer"
            onChange={() => handleOptionSelect("option1")}
            checked={selectedAnswer === "option1"}
          />
          {currentQuestion.option1}
        </li>

        <li>
          <input
            type="radio"
            name="answer"
            onChange={() => handleOptionSelect("option2")}
            checked={selectedAnswer === "option2"}
          />
          {currentQuestion.option2}
        </li>

        <li>
          <input
            type="radio"
            name="answer"
            onChange={() => handleOptionSelect("option3")}
            checked={selectedAnswer === "option3"}
          />
          {currentQuestion.option3}
        </li>

        <li>
          <input
            type="radio"
            name="answer"
            onChange={() => handleOptionSelect("option4")}
            checked={selectedAnswer === "option4"}
          />
          {currentQuestion.option4}
        </li>
      </ul>

      <button onClick={handleSubmit}>Submit Answer</button>

      <button onClick={handleNext} style={{ marginLeft: "10px" }}>
        Skip
      </button>
    </div>
  );
};

export default Questions;
