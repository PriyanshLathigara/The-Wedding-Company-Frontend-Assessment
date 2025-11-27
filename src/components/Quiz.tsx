import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import bestOfLuck from "@/assets/best-of-luck.png";
import kittenPaw from "@/assets/kitten-paw.png";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: 1,
  },
];

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 md:p-12 text-center bg-gradient-to-b from-white to-quiz-lighter/30 shadow-[var(--shadow-soft)] border-0 animate-in fade-in-0 zoom-in-95 duration-500">
        <div className="mb-6">
          <span className="inline-block px-6 py-2 bg-quiz-lighter rounded-full text-sm font-medium text-quiz-text">
            Keep Learning!
          </span>
        </div>
        
        <h1
          className="text-[42px] leading-[1] md:text-[88px] font-normal mb-4"
          style={{ letterSpacing: '-4px' }}
        >
          Your Final score is
        </h1>
          
          <div className="text-8xl md:text-9xl font-bold text-quiz-primary my-8 animate-in zoom-in-50 duration-700 delay-200">
            {score}<span className="text-6xl">%</span>
          </div>
          
          <Button
            onClick={handleRestart}
            size="lg"
            className="mt-8 bg-quiz-light hover:bg-quiz-primary text-quiz-text hover:text-white transition-all duration-300 px-8 py-6 text-lg rounded-2xl font-medium shadow-md hover:shadow-lg hover:scale-105"
          >
            Start Again
          </Button>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-4xl">
        <Card className="p-8 md:p-12 bg-gradient-to-b from-white to-quiz-lighter/30 shadow-[var(--shadow-soft)] border-0 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <h1
            className="text-[34px] leading-[1] md:text-[80px] font-normal text-center mb-3"
            style={{ letterSpacing: '-4px' }}
          >
            Test Your Knowledge
          </h1>
          
          <p className="text-center text-quiz-text-light mb-8">
            Answer all questions to see your results
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-4 mb-8 max-w-2xl mx-auto">
            {questions.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-2 w-full rounded-full transition-all duration-500",
                  "bg-[#7AC4E6]",
                  index > currentQuestion && "opacity-30"
                )}
                style={{
                  maxWidth: "140px",
                }}
              />
            ))}
          </div>

          {/* Question Card */}
          <div className="mb-8 animate-in fade-in-0 slide-in-from-right-4 duration-300" key={currentQuestion}>
            <div className="rounded-2xl p-6 mb-6 border" style={{ 
              background: 'linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
              borderColor: '#96E5FF'
            }}>
              <h2 className="text-[22px] font-semibold text-quiz-text text-center not-italic" style={{ 
                lineHeight: '24px', 
                letterSpacing: '-0.31px',
                fontFamily: 'Inter'
              }}>
                {question.id}. {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={cn(
                    "w-full p-6 rounded-2xl text-lg font-medium transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-md",
                    selectedAnswers[currentQuestion] === index
                      ? "text-white shadow-md"
                      : "bg-white hover:bg-quiz-lighter text-quiz-text"
                  )}
                  style={selectedAnswers[currentQuestion] === index ? {
                    background: '#15313D'
                  } : undefined}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="fixed bottom-6 right-6 flex items-center gap-3 z-20">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={cn(
                "h-12 w-12 rounded-[18px] border border-[#B8DFF7] bg-[linear-gradient(180deg,#E9F7FF_0%,#CDE8F8_100%)]",
                "flex items-center justify-center text-[#15313D] shadow-[0px_14px_30px_rgba(21,49,61,0.2)] transition-transform duration-300",
                "hover:translate-y-[1px]",
                currentQuestion === 0 && "opacity-30 cursor-not-allowed hover:translate-y-0"
              )}
              aria-label="Previous question"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === -1}
              className={cn(
                "h-12 w-12 rounded-[18px] border border-[#B8DFF7] bg-[linear-gradient(180deg,#E9F7FF_0%,#CDE8F8_100%)]",
                "flex items-center justify-center text-[#15313D] shadow-[0px_14px_30px_rgba(21,49,61,0.2)] transition-all duration-300",
                "hover:translate-y-[1px]",
                selectedAnswers[currentQuestion] === -1 && "opacity-30 cursor-not-allowed hover:translate-y-0"
              )}
              aria-label={isLastQuestion ? "Submit quiz" : "Next question"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Card>

        {/* Mascot */}
        {currentQuestion === 0 && (
          <div className="fixed bottom-6 left-6 animate-in slide-in-from-left-8 duration-700 delay-300 hidden md:block z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-0 w-[160px]">
              <img
                src={bestOfLuck}
                alt="Best of Luck badge"
                className="w-full drop-shadow-[0px_18px_35px_rgba(21,49,61,0.25)]"
              />
              <img
                src={kittenPaw}
                alt="Kitten Paw"
                className="w-24 -mt-6 drop-shadow-[0px_14px_25px_rgba(21,49,61,0.25)] rotate-6"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
