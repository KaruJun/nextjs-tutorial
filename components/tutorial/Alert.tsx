import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb } from 'lucide-react'

interface AlertProps {
  type: 'info' | 'warning' | 'success' | 'error' | 'tip'
  title?: string
  children: React.ReactNode
}

export function Alert({ type, title, children }: AlertProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      defaultTitle: '情報'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      defaultTitle: '注意'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      defaultTitle: '成功'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      defaultTitle: 'エラー'
    },
    tip: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: <Lightbulb className="w-5 h-5 text-purple-500" />,
      defaultTitle: 'ヒント'
    }
  }

  const { bg, border, icon, defaultTitle } = styles[type]

  return (
    <div className={`${bg} ${border} border rounded-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1">
          {(title || defaultTitle) && (
            <p className="font-medium mb-1">{title || defaultTitle}</p>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
