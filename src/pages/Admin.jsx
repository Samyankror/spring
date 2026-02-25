import { useState } from "react";

function Admin() {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    time: "", // in minutes
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1]);
      newQuestions[index].options[optionIndex] = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quiz);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 text-white p-6 rounded-xl w-full max-w-3xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Create Quiz</h1>

        {/* Quiz Details */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            placeholder="Quiz Title"
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
          <input
            type="text"
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            placeholder="Quiz Description"
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
          <input
            type="number"
            name="time"
            value={quiz.time}
            onChange={handleQuizChange}
            placeholder="Time limit (minutes)"
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={index} className="bg-slate-700 p-4 rounded space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Question {index + 1}</h2>
                {quiz.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(index, "questionText", e.target.value)
                }
                placeholder="Question text"
                className="w-full p-2 rounded bg-slate-600 text-white"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        `option-${optIndex}`,
                        e.target.value
                      )
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    className="p-2 rounded bg-slate-600 text-white"
                    required
                  />
                ))}
              </div>
              <input
                type="text"
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
                placeholder="Correct answer"
                className="w-full p-2 rounded bg-slate-600 text-white"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-semibold"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded font-semibold"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
