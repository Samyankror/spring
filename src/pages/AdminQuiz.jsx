import { useState, useEffect } from "react";

function AdminQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Mock API call for all user quizzes
    setQuizzes([
      {
        id: 1,
        title: "React Basics",
        description: "Test your React knowledge",
        time: 10, // in minutes
      },
      {
        id: 2,
        title: "Java Fundamentals",
        description: "Check Java basics",
        time: 15,
      },
      {
        id: 3,
        title: "HTML & CSS",
        description: "Front-end quiz",
        time: 5,
      },
    ]);
  }, []);

  const handleViewSubmissions = (quizId) => {
    // For now just log, later you can navigate to submissions page
    console.log("View submissions for quiz:", quizId);
    alert(`View submissions for quiz ID: ${quizId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        User Quizzes
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-300 mb-2">{quiz.description}</p>
              <p className="text-gray-400 mb-4">Time: {quiz.time} min</p>
            </div>

            <button
              onClick={() => handleViewSubmissions(quiz.id)}
              className="mt-auto bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
            >
              View Submissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQuiz;
