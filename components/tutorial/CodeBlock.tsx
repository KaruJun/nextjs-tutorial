'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlight?: number[]
  badge?: 'server' | 'client' | 'error' | 'good'
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  highlight = [],
  badge
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  const badgeStyles = {
    server: 'bg-blue-500 text-white',
    client: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    good: 'bg-emerald-500 text-white'
  }

  const badgeLabels = {
    server: 'Server',
    client: 'Client',
    error: '❌ NG',
    good: '✅ OK'
  }

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#1e1e1e] my-4">
      {/* Header */}
      {(filename || badge) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            {filename && (
              <span className="text-sm text-gray-300 font-mono">{filename}</span>
            )}
          </div>
          {badge && (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badgeStyles[badge]}`}>
              {badgeLabels[badge]}
            </span>
          )}
        </div>
      )}

      {/* Code */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm !bg-transparent !m-0">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div
                  key={index}
                  className={`flex ${highlight.includes(index + 1) ? 'bg-yellow-500/20' : ''}`}
                >
                  <span className="select-none text-gray-500 w-8 mr-4 text-right shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-100">{line}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-100">{code}</span>
            )}
          </code>
        </pre>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
          title="コードをコピー"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}

// Simple inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-pink-600 dark:text-pink-400">
      {children}
    </code>
  )
}
