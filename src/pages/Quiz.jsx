import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    // For testing without backend
    setQuestions([
      {
        id: 1,
        questionText: "What is the capital of France?",
        options: ["Berlin", "Paris", "Rome", "Madrid"],
        Ans: "Paris",
      },
      {
        id: 2,
        questionText: "What is 2 + 2?",
        options: ["3", "4", "5", "22"],
        Ans: "4",
      },
      {
        id: 3,
        questionText: "Which language is used for React?",
        options: ["Python", "JavaScript", "C#", "Java"],
        Ans: "JavaScript",
      },
    ]);
  }, [quizId]);

// Calculate result
  const calculateResult = () => {
    let tempScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.Ans) {
        tempScore++;
      }
    });
    setScore(tempScore);
    setShowResult(true);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
     calculateResult();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  

  if (questions.length === 0) {
    return <p className="text-center mt-10 text-white">Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

  // Handle selecting an answer
  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  
  
  // Reset quiz
  const resetQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center p-4">
        <div className="bg-slate-800 text-white p-6 rounded-xl max-w-125 w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Result</h1>
          <p className="text-xl mb-4">
            You scored {score} / {questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
          >
            Retry Quiz
          </button>
        </div>
      </div>
    );
  }
  const formatTime = (seconds) => {
    if (seconds > 60) {
      const m = Math.ceil(seconds / 60);
      return `${m} min`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-4">
      <div className="bg-slate-800 text-white p-6 rounded-xl max-w-125 w-full">
        <div className='flex justify-between'>
        <h2 className="text-lg mb-4 flex justify-between">
          Question {currentIndex + 1} / {questions.length}
        </h2>
        <h2 className='text-lg mb-4'>Time Left: {formatTime(timeLeft)}</h2>
        </div>

        <h1 className="text-2xl font-semibold mb-4">{currentQuestion.questionText}</h1>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`border border-gray-400 rounded-lg py-2 cursor-pointer transition
                ${
                  answers[currentQuestion.id] === option
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg cursor-pointer"
            >
              Prev
            </button>
          )}

          {currentIndex < questions.length - 1 && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg cursor-pointer"
            >
              Next
            </button>
          )}

          {currentIndex === questions.length - 1 && (
            <button
              onClick={calculateResult}
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg cursor-pointer"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
