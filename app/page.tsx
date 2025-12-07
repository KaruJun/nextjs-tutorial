'use client'

import Link from 'next/link'
import { useTutorialStore, TUTORIAL_STEPS } from '@/lib/tutorial-store'
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Rocket,
  RotateCcw,
  Server,
  Smartphone,
  Zap
} from 'lucide-react'

export default function HomePage() {
  const { getProgress, isStepCompleted, resetProgress } = useTutorialStore()
  const progress = getProgress()

  const features = [
    {
      icon: <Server className="w-6 h-6" />,
      title: 'React Server Components',
      description: 'サーバーで実行されるコンポーネントを理解する'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'ハイドレーション',
      description: 'なぜエラーが起きるのか、どう解決するのか'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'App Router',
      description: 'Next.js 14+の新しいルーティングシステム'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: '実践的なコード',
      description: '実際に動くコードで学ぶ'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <header className="px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-black dark:bg-white rounded-2xl">
              <BookOpen className="w-12 h-12 text-white dark:text-black" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Next.js 完全入門
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            React経験者のための App Router 完全ガイド
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              Next.js 14+
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              App Router
            </span>
          </div>

          {/* Progress indicator */}
          {progress > 0 && (
            <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">学習進捗</span>
                <span className="text-sm text-gray-500">{progress}% 完了</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/tutorial/0"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              {progress > 0 ? '学習を続ける' : 'チュートリアルを始める'}
            </Link>

            {progress > 0 && (
              <button
                onClick={() => {
                  if (confirm('進捗をリセットしますか？')) {
                    resetProgress()
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                リセット
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="px-4 py-12 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            このチュートリアルで学べること
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Overview */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            学習ステップ
          </h2>

          <div className="space-y-4">
            {TUTORIAL_STEPS.map((step) => {
              const completed = isStepCompleted(step.id)

              return (
                <Link
                  key={step.id}
                  href={`/tutorial/${step.slug}`}
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${completed
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }
                    `}>
                      {completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-mono font-medium">{step.id}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">対象者</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                こんな人におすすめ
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                  React、TypeScriptの経験がある
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                  Laravel等のバックエンド経験がある
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                  Next.jsを初めて学ぶ
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                  App RouterやRSCを理解したい
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                前提知識
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                  Reactの基本（useState, useEffect等）
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                  TypeScriptの基本
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                  HTML/CSSの基本
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                  npmの基本的な使い方
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>このチュートリアル自体が Next.js で作られています</p>
        <p className="mt-2">
          App Router / React Server Components / TypeScript
        </p>
      </footer>
    </div>
  )
}
