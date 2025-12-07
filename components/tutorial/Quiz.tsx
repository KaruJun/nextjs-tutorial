'use client'

import { useState } from 'react'
import { useTutorialStore } from '@/lib/tutorial-store'
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface QuizProps {
  stepId: number
  questions: QuizQuestion[]
}

export function Quiz({ stepId, questions }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})
  const [expanded, setExpanded] = useState(true)
  const { saveQuizAnswer } = useTutorialStore()

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (showResults[questionIndex]) return

    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  const handleSubmit = (questionIndex: number) => {
    const isCorrect = selectedAnswers[questionIndex] === questions[questionIndex].correctIndex

    saveQuizAnswer({
      stepId,
      questionIndex,
      selectedAnswer: selectedAnswers[questionIndex],
      isCorrect
    })

    setShowResults(prev => ({
      ...prev,
      [questionIndex]: true
    }))
  }

  const allAnswered = Object.keys(showResults).length === questions.length

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <span className="font-medium">理解度チェック</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({questions.length}問)
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Questions */}
      {expanded && (
        <div className="p-4 space-y-6">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Q{qIndex + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex
                  const hasResult = showResults[qIndex]
                  const isCorrect = q.correctIndex === oIndex

                  let optionClass = 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'

                  if (hasResult) {
                    if (isCorrect) {
                      optionClass = 'quiz-correct border-green-500'
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'quiz-incorrect border-red-500'
                    }
                  } else if (isSelected) {
                    optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelectAnswer(qIndex, oIndex)}
                      disabled={hasResult}
                      className={`
                        quiz-option w-full text-left p-3 border-2 rounded-lg
                        flex items-center gap-3 transition-all
                        ${optionClass}
                        ${hasResult ? 'cursor-default' : 'cursor-pointer'}
                      `}
                    >
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {hasResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {hasResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Submit button */}
              {!showResults[qIndex] && selectedAnswers[qIndex] !== undefined && (
                <button
                  onClick={() => handleSubmit(qIndex)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  回答する
                </button>
              )}

              {/* Explanation */}
              {showResults[qIndex] && (
                <div className={`
                  p-4 rounded-lg mt-3
                  ${selectedAnswers[qIndex] === q.correctIndex
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }
                `}>
                  <div className="flex items-start gap-2">
                    {selectedAnswers[qIndex] === q.correctIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium mb-1">
                        {selectedAnswers[qIndex] === q.correctIndex ? '正解！' : '不正解'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Summary */}
          {allAnswered && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                全問回答しました！次のステップに進みましょう 🎉
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
