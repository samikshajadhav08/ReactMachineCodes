import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [activeId, setActiveId] = useState(null);
  const faqs = [
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What is useState?",
      answer:
        "useState is a React Hook used to manage state inside functional components.",
    },
    {
      id: 3,
      question: "What is useEffect?",
      answer:
        "useEffect is a React Hook used to perform side effects such as API calls.",
    },
    {
      id: 4,
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension that allows us to write HTML-like code inside JavaScript.",
    },
  ];

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="container">
        <h1>Accordion</h1>
        <div className="accordion">
          {faqs.map((item) => (
            <div className="accordion-item" key={item.id}>
              <button
                className="question"
                onClick={() => handleToggle(item.id)}
              >
                <span>{item.question}</span>

                <span>{activeId === item.id ? "-" : "+"}</span>
              </button>

              {activeId === item.id && (
                <div className="answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
