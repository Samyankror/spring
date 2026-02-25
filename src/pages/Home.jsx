import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user);
  console.log(currUser);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
     // const response = await axios.get("http://localhost:8080/api/quizzes");
      setQuizzes([
  {
    "id": 1,
    "title": "Java Basics",
    "description": "Test your Java fundamentals",
    "totalQuestions": 10
  },
  {
    "id": 2,
    "title": "React Quiz",
    "description": "React concepts & hooks",
    "totalQuestions": 8
  }
]
);
    } catch (err) {
      setError("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Available Quizzes
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-slate-800 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {quiz.title}
            </h2>

            <p className="text-gray-300 mb-4">
              {quiz.description}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              Questions: {quiz.totalQuestions}
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold cursor-pointer">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
