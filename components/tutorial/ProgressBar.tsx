'use client'

import { useTutorialStore, TUTORIAL_STEPS } from '@/lib/tutorial-store'
import { CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'

interface ProgressBarProps {
  currentStep: number
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const { isStepCompleted, getProgress } = useTutorialStore()
  const progress = getProgress()

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        {/* Overall progress bar */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            進捗: {progress}%
          </span>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} / {TUTORIAL_STEPS.length}
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {TUTORIAL_STEPS.map((step, index) => {
            const isCompleted = isStepCompleted(step.id)
            const isCurrent = currentStep === step.id

            return (
              <Link
                key={step.id}
                href={`/tutorial/${step.slug}`}
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-md text-xs whitespace-nowrap
                  transition-colors
                  ${isCurrent
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                    : isCompleted
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
                <span>{step.shortTitle}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
