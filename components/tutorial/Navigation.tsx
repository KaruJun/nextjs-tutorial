'use client'

import { useTutorialStore, TUTORIAL_STEPS } from '@/lib/tutorial-store'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface NavigationProps {
  currentStep: number
}

export function Navigation({ currentStep }: NavigationProps) {
  const { completeStep, isStepCompleted } = useTutorialStore()

  const prevStep = currentStep > 0 ? TUTORIAL_STEPS[currentStep - 1] : null
  const nextStep = currentStep < TUTORIAL_STEPS.length - 1 ? TUTORIAL_STEPS[currentStep + 1] : null
  const currentStepData = TUTORIAL_STEPS[currentStep]
  const isCurrentCompleted = isStepCompleted(currentStep)

  const handleComplete = () => {
    completeStep(currentStep)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Previous button */}
        <div className="w-40">
          {prevStep ? (
            <Link
              href={`/tutorial/${prevStep.slug}`}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">前へ: {prevStep.shortTitle}</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">トップへ</span>
            </Link>
          )}
        </div>

        {/* Complete button */}
        <button
          onClick={handleComplete}
          disabled={isCurrentCompleted}
          className={`
            flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
            ${isCurrentCompleted
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isCurrentCompleted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>完了済み</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>このステップを完了</span>
            </>
          )}
        </button>

        {/* Next button */}
        <div className="w-40 text-right">
          {nextStep ? (
            <Link
              href={`/tutorial/${nextStep.slug}`}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm">次へ: {nextStep.shortTitle}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <span className="text-sm">完了！</span>
              <CheckCircle className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
