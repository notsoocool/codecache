"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

// Quiz Question Interface
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Quiz Subtopic Interface
interface QuizSubtopic {
  name: string;
  questions: QuizQuestion[];
}

// Quiz Topic Interface
interface QuizTopic {
  name: string;
  subtopics: QuizSubtopic[];
}

// Sample HTML quiz for demonstration
const htmlQuiz: QuizSubtopic = {
  name: "HTML Quiz",
  questions: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Markup Language",
        "Hyperlinks and Text Markup Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["<h1>", "<h6>", "<head>"],
      correctAnswer: "<h1>",
    },
    {
      question: "What does the <a> tag define?",
      options: ["Anchor", "Audio", "Array"],
      correctAnswer: "Anchor",
    },
    {
      question: "What is the correct HTML tag for inserting a line break?",
      options: ["<br>", "<break>", "<lb>"],
      correctAnswer: "<br>",
    },
    {
      question:
        "What is the correct HTML element for inserting a background image?",
      options: [
        "<body style='background-image:url()'>",
        "<background>",
        "<image>",
      ],
      correctAnswer: "<body style='background-image:url()'>",
    },
    {
      question: "Which character is used to indicate an end tag?",
      options: ["<", "/", "*"],
      correctAnswer: "/",
    },
    {
      question: "How can you make a numbered list?",
      options: ["<ul>", "<list>", "<ol>"],
      correctAnswer: "<ol>",
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["style", "class", "font"],
      correctAnswer: "style",
    },
    {
      question:
        "Which is the correct HTML element for the title of a document?",
      options: ["<title>", "<head>", "<meta>"],
      correctAnswer: "<title>",
    },
    {
      question: "Which HTML element is used to define important text?",
      options: ["<strong>", "<important>", "<b>"],
      correctAnswer: "<strong>",
    },
  ],
};

const quizTopics: QuizTopic[] = [
  {
    name: "Web Development",
    subtopics: [
      { name: "HTML Quiz", questions: htmlQuiz.questions },
      { name: "CSS Quiz", questions: [] },
      { name: "JavaScript Quiz", questions: [] },
    ],
  },
  {
    name: "App Development",
    subtopics: [
      { name: "Easy", questions: [] },
      { name: "Medium", questions: [] },
      { name: "Difficult", questions: [] },
    ],
  },
  {
    name: "Programming",
    subtopics: [
      { name: "C", questions: [] },
      { name: "C++", questions: [] },
      { name: "Java", questions: [] },
      { name: "Python", questions: [] },
      { name: "Data Structures", questions: [] },
    ],
  },
];

export default function Quiz() {
  const [activeQuiz, setActiveQuiz] = useState<QuizSubtopic | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);

  const handleSelectTopic = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setActiveQuiz(null); // Reset active quiz
  };

  const handleStartQuiz = (subtopic: QuizSubtopic) => {
    setActiveQuiz(subtopic);
    setUserAnswers(new Array(subtopic.questions.length).fill(""));
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuiz!.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    if (!activeQuiz) return 0;
    return userAnswers.reduce((score, answer, index) => {
      return (
        score + (answer === activeQuiz.questions[index].correctAnswer ? 1 : 0)
      );
    }, 0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-center text-4xl font-semibold pb-10">Quizzes</h2>

      {/* Topic Cards */}
      {!selectedTopic && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizTopics.map((topic) => (
            <div key={topic.name} className="border rounded-lg overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">{topic.name}</h3>
                <button
                  onClick={() => handleSelectTopic(topic)}
                  className="bg-primary text-black px-4 py-2 rounded"
                >
                  Select Topic
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtopic Cards */}
      {selectedTopic && !activeQuiz && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Select a quiz from {selectedTopic.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedTopic.subtopics.map((subtopic) => (
              <div
                key={subtopic.name}
                className="border rounded-lg overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-4">
                    {subtopic.name}
                  </h3>
                  <button
                    onClick={() => handleStartQuiz(subtopic)}
                    className="bg-primary text-black px-4 py-2 rounded"
                  >
                    Start {subtopic.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back to Topics
            </button>
          </div>
        </div>
      )}

      {/* Quiz Questions */}
      {activeQuiz && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Quiz: {activeQuiz.name}
          </h3>
          {showResults ? (
            <div className="text-center">
              <h4 className="text-lg">
                Your Score: {calculateResults()} / {activeQuiz.questions.length}
              </h4>
              <button
                onClick={() => setActiveQuiz(null)}
                className="bg-primary text-black px-4 py-2 rounded mt-4"
              >
                Back to Quizzes
              </button>
            </div>
          ) : (
            <div>
              <h4 className="mb-4">
                {activeQuiz.questions[currentQuestionIndex].question}
              </h4>
              <div className="flex flex-col">
                {activeQuiz.questions[currentQuestionIndex].options.map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      className={`border p-2 mb-2 rounded ${
                        userAnswers[currentQuestionIndex] === option
                          ? "bg-gray-500 text-white"
                          : ""
                      }`}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleNextQuestion}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  {currentQuestionIndex < activeQuiz.questions.length - 1
                    ? "Next"
                    : "Finish"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Section */}
      <div className="mt-16 pt-8 border-t border-border/5 text-center">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Still have questions? We're here to help.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            <Mail className="w-4 h-4" />
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
