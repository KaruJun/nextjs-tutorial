'use client'

interface FlowChartProps {
  title?: string
  children: React.ReactNode
}

export function FlowChart({ title, children }: FlowChartProps) {
  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {title && (
        <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>
      )}
      <div className="font-mono text-sm whitespace-pre overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

// Decision Flow Component
interface DecisionFlowProps {
  question: string
  options: {
    condition: string
    result: string
    resultType: 'server' | 'client'
  }[]
}

export function DecisionFlow({ question, options }: DecisionFlowProps) {
  return (
    <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <p className="font-medium">{question}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Vertical line */}
        <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />

        {/* Options */}
        <div className="grid gap-3 w-full max-w-lg">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1 flex items-center">
                <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600" />
                <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-sm">
                  {option.condition}
                </div>
                <div className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600" />
                <span className="text-gray-400">→</span>
                <div className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600" />
              </div>
              <div
                className={`
                  px-3 py-1 rounded font-medium text-sm
                  ${option.resultType === 'server'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                    : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                  }
                `}
              >
                {option.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
