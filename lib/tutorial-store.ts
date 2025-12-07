import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Step {
  id: number
  slug: string
  title: string
  shortTitle: string
  duration: string
  description: string
  completed: boolean
}

export const TUTORIAL_STEPS: Omit<Step, 'completed'>[] = [
  {
    id: 0,
    slug: '0',
    title: 'Next.jsとは何か？',
    shortTitle: '概念理解',
    duration: '10分',
    description: 'Reactとの違い、App Routerの歴史を学ぶ'
  },
  {
    id: 1,
    slug: '1',
    title: 'プロジェクト構造を理解する',
    shortTitle: 'プロジェクト構造',
    duration: '8分',
    description: 'app/ディレクトリとファイルベースルーティング'
  },
  {
    id: 2,
    slug: '2',
    title: 'サーバーコンポーネント (RSC)',
    shortTitle: 'RSC',
    duration: '12分',
    description: 'React Server Componentsを深く理解する'
  },
  {
    id: 3,
    slug: '3',
    title: 'クライアントコンポーネント',
    shortTitle: 'Client',
    duration: '10分',
    description: '"use client"の使い方とユースケース'
  },
  {
    id: 4,
    slug: '4',
    title: 'ハイドレーションを理解する',
    shortTitle: 'Hydration',
    duration: '15分',
    description: 'ハイドレーションエラーの原因と解決法'
  },
  {
    id: 5,
    slug: '5',
    title: 'SSR / SSG / ISRを理解する',
    shortTitle: 'Rendering',
    duration: '12分',
    description: 'レンダリング戦略とキャッシュ'
  },
  {
    id: 6,
    slug: '6',
    title: 'ルーティングを深掘りする',
    shortTitle: 'Routing',
    duration: '15分',
    description: '動的ルーティングと高度なパターン'
  },
  {
    id: 7,
    slug: '7',
    title: 'データフェッチングパターン',
    shortTitle: 'Data Fetching',
    duration: '12分',
    description: 'Server ActionsとAPI Routes'
  },
  {
    id: 8,
    slug: '8',
    title: '実践課題: Todoアプリ',
    shortTitle: '実践',
    duration: '30分',
    description: '学んだ概念を使ってTodoアプリを作成'
  }
]

interface QuizAnswer {
  stepId: number
  questionIndex: number
  selectedAnswer: number
  isCorrect: boolean
}

interface TutorialState {
  currentStep: number
  completedSteps: number[]
  quizAnswers: QuizAnswer[]

  // Actions
  setCurrentStep: (step: number) => void
  completeStep: (stepId: number) => void
  markStepIncomplete: (stepId: number) => void
  saveQuizAnswer: (answer: QuizAnswer) => void
  resetProgress: () => void

  // Getters
  getProgress: () => number
  isStepCompleted: (stepId: number) => boolean
  getStepWithCompletion: () => Step[]
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      completedSteps: [],
      quizAnswers: [],

      setCurrentStep: (step) => set({ currentStep: step }),

      completeStep: (stepId) => set((state) => ({
        completedSteps: state.completedSteps.includes(stepId)
          ? state.completedSteps
          : [...state.completedSteps, stepId]
      })),

      markStepIncomplete: (stepId) => set((state) => ({
        completedSteps: state.completedSteps.filter(id => id !== stepId)
      })),

      saveQuizAnswer: (answer) => set((state) => {
        const existingIndex = state.quizAnswers.findIndex(
          a => a.stepId === answer.stepId && a.questionIndex === answer.questionIndex
        )

        if (existingIndex >= 0) {
          const newAnswers = [...state.quizAnswers]
          newAnswers[existingIndex] = answer
          return { quizAnswers: newAnswers }
        }

        return { quizAnswers: [...state.quizAnswers, answer] }
      }),

      resetProgress: () => set({
        currentStep: 0,
        completedSteps: [],
        quizAnswers: []
      }),

      getProgress: () => {
        const { completedSteps } = get()
        return Math.round((completedSteps.length / TUTORIAL_STEPS.length) * 100)
      },

      isStepCompleted: (stepId) => get().completedSteps.includes(stepId),

      getStepWithCompletion: () => {
        const { completedSteps } = get()
        return TUTORIAL_STEPS.map(step => ({
          ...step,
          completed: completedSteps.includes(step.id)
        }))
      }
    }),
    {
      name: 'nextjs-tutorial-progress'
    }
  )
)
