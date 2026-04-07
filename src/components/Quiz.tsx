import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore'

const Quiz: React.FC = () => {
  // Core logic
  const [quizCore] = useState(new QuizCore())

  // UI state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [, setUpdate] = useState(0) // force re-render

  const currentQuestion = quizCore.getCurrentQuestion()

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option)
  }

  const handleButtonClick = (): void => {
    if (!selectedAnswer) return

    // answer хадгалах
    quizCore.answerQuestion(selectedAnswer)

    // дараагийн асуулт байгаа эсэх
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion()
      setSelectedAnswer(null)

      // UI refresh хийх
      setUpdate(prev => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  // Quiz дууссан үед
  if (isFinished || !currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  )
}

export default Quiz
