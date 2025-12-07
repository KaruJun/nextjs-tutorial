'use client'

import { CodeBlock, Alert, Quiz } from '@/components/tutorial'
import { CheckCircle, Code, Rocket, Trophy, BookOpen } from 'lucide-react'

export default function Step8Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>実践課題：Todoアプリを作成しよう</h2>
        <p>
          これまで学んだすべての概念を使って、実際にTodoアプリを作成してみましょう。
          Server Components、Client Components、Server Actions、そしてデータベースアクセスを
          組み合わせた実践的なアプリケーションです。
        </p>

        <div className="my-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold text-lg">学習のゴール</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Server Componentでデータを取得して表示</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Server Actionsでフォーム送信を処理</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Client Componentでインタラクティブな機能を実装</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>適切なコンポーネント分割を理解</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Project Structure */}
      <section>
        <h2>Step 1: プロジェクト構造</h2>

        <p>まず、Todoアプリのファイル構造を確認しましょう。</p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <pre>{`app/
├── todos/
│   ├── page.tsx          # メインページ（Server Component）
│   ├── actions.ts        # Server Actions
│   └── components/
│       ├── TodoList.tsx  # Todo一覧（Server Component）
│       ├── TodoItem.tsx  # 個別のTodo（Client Component）
│       ├── AddTodoForm.tsx # 追加フォーム（Client Component）
│       └── FilterButtons.tsx # フィルターボタン
└── lib/
    └── todos.ts          # データ操作関数`}</pre>
        </div>
      </section>

      {/* Data Layer */}
      <section>
        <h2>Step 2: データ層の実装</h2>

        <p>
          まずはTodoのデータを管理する関数を作成します。
          実際のプロジェクトではPrismaなどのORMを使いますが、
          ここではシンプルにメモリ上で管理します。
        </p>

        <CodeBlock
          code={`// lib/todos.ts
export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

// 実際のプロジェクトではDBを使用
// ここではシンプルにメモリ上で管理（デモ用）
let todos: Todo[] = [
  {
    id: '1',
    title: 'Next.jsを学ぶ',
    completed: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Server Componentsを理解する',
    completed: false,
    createdAt: new Date('2024-01-02')
  },
]

export async function getTodos(): Promise<Todo[]> {
  // 実際はDBからfetch
  await new Promise(resolve => setTimeout(resolve, 100))
  return [...todos].sort((a, b) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  )
}

export async function addTodo(title: string): Promise<Todo> {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date()
  }
  todos.push(newTodo)
  return newTodo
}

export async function toggleTodo(id: string): Promise<void> {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

export async function deleteTodo(id: string): Promise<void> {
  todos = todos.filter(t => t.id !== id)
}`}
          filename="lib/todos.ts"
        />
      </section>

      {/* Server Actions */}
      <section>
        <h2>Step 3: Server Actionsの実装</h2>

        <p>
          フォーム送信やTodoの操作を処理するServer Actionsを定義します。
        </p>

        <CodeBlock
          code={`// app/todos/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { addTodo, toggleTodo, deleteTodo } from '@/lib/todos'

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string

  if (!title || title.trim().length === 0) {
    return { error: 'タイトルを入力してください' }
  }

  await addTodo(title.trim())

  // パスを再検証してUIを更新
  revalidatePath('/todos')

  return { success: true }
}

export async function toggleTodoAction(id: string) {
  await toggleTodo(id)
  revalidatePath('/todos')
}

export async function deleteTodoAction(id: string) {
  await deleteTodo(id)
  revalidatePath('/todos')
}`}
          filename="app/todos/actions.ts"
        />
      </section>

      {/* Main Page */}
      <section>
        <h2>Step 4: メインページ（Server Component）</h2>

        <CodeBlock
          code={`// app/todos/page.tsx
import { getTodos } from '@/lib/todos'
import { TodoList } from './components/TodoList'
import { AddTodoForm } from './components/AddTodoForm'
import { FilterButtons } from './components/FilterButtons'

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  // Server Componentなので直接データ取得
  const todos = await getTodos()
  const { filter = 'all' } = await searchParams

  // フィルタリング
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Todoリスト</h1>

      {/* フォームはClient Component */}
      <AddTodoForm />

      {/* フィルターボタン */}
      <FilterButtons currentFilter={filter} />

      {/* Todo一覧 */}
      <TodoList todos={filteredTodos} />

      {/* 統計 */}
      <div className="mt-6 text-sm text-gray-500">
        全{todos.length}件 / 完了{todos.filter(t => t.completed).length}件
      </div>
    </div>
  )
}`}
          filename="app/todos/page.tsx"
          badge="server"
        />
      </section>

      {/* Client Components */}
      <section>
        <h2>Step 5: Client Components</h2>

        <h3 className="text-lg font-semibold mt-6 mb-3">AddTodoForm（フォーム）</h3>

        <CodeBlock
          code={`// app/todos/components/AddTodoForm.tsx
'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { createTodoAction } from '../actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg
                 hover:bg-blue-600 disabled:opacity-50"
    >
      {pending ? '追加中...' : '追加'}
    </button>
  )
}

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const result = await createTodoAction(formData)
    if (result.success) {
      formRef.current?.reset()
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <input
        type="text"
        name="title"
        placeholder="新しいタスクを入力..."
        className="flex-1 px-4 py-2 border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <SubmitButton />
    </form>
  )
}`}
          filename="app/todos/components/AddTodoForm.tsx"
          badge="client"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">TodoItem（個別のTodo）</h3>

        <CodeBlock
          code={`// app/todos/components/TodoItem.tsx
'use client'

import { useState } from 'react'
import type { Todo } from '@/lib/todos'
import { toggleTodoAction, deleteTodoAction } from '../actions'

interface Props {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleToggle() {
    await toggleTodoAction(todo.id)
  }

  async function handleDelete() {
    setIsDeleting(true)
    await deleteTodoAction(todo.id)
  }

  return (
    <div className={\`
      flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm
      border border-gray-200
      \${isDeleting ? 'opacity-50' : ''}
    \`}>
      {/* チェックボックス */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 rounded border-gray-300"
      />

      {/* タイトル */}
      <span className={\`
        flex-1
        \${todo.completed ? 'line-through text-gray-400' : ''}
      \`}>
        {todo.title}
      </span>

      {/* 削除ボタン */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700"
      >
        削除
      </button>
    </div>
  )
}`}
          filename="app/todos/components/TodoItem.tsx"
          badge="client"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">TodoList（一覧表示）</h3>

        <CodeBlock
          code={`// app/todos/components/TodoList.tsx
import type { Todo } from '@/lib/todos'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
}

// Server Componentでもクライアントコンポーネントを含められる
export function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        タスクがありません
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}`}
          filename="app/todos/components/TodoList.tsx"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">FilterButtons（フィルター）</h3>

        <CodeBlock
          code={`// app/todos/components/FilterButtons.tsx
'use client'

import Link from 'next/link'

interface Props {
  currentFilter: string
}

export function FilterButtons({ currentFilter }: Props) {
  const filters = [
    { key: 'all', label: 'すべて' },
    { key: 'active', label: '未完了' },
    { key: 'completed', label: '完了済み' },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(filter => (
        <Link
          key={filter.key}
          href={\`/todos?filter=\${filter.key}\`}
          className={\`
            px-3 py-1 rounded-lg text-sm
            \${currentFilter === filter.key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          \`}
        >
          {filter.label}
        </Link>
      ))}
    </div>
  )
}`}
          filename="app/todos/components/FilterButtons.tsx"
          badge="client"
        />
      </section>

      {/* Best Practices Summary */}
      <section>
        <h2>ベストプラクティスのまとめ</h2>

        <div className="space-y-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-blue-500" />
              Server Component
            </h4>
            <ul className="text-sm space-y-1">
              <li>• データのfetch（DB、API）</li>
              <li>• 静的なUI、レイアウト</li>
              <li>• 機密情報へのアクセス</li>
              <li>• デフォルトでこちらを使う</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-green-500" />
              Client Component
            </h4>
            <ul className="text-sm space-y-1">
              <li>• useState、useEffect</li>
              <li>• onClick、onChange</li>
              <li>• ブラウザAPI（localStorage等）</li>
              <li>• 必要最小限に抑える</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-purple-500" />
              Server Actions
            </h4>
            <ul className="text-sm space-y-1">
              <li>• フォームの送信処理</li>
              <li>• データの作成・更新・削除</li>
              <li>• revalidatePathでUI更新</li>
              <li>• バリデーションはサーバーで</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section>
        <h2>チャレンジ課題</h2>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-yellow-500" />
            <h4 className="font-semibold">さらに機能を追加してみよう</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">□</span>
              <span>Todoの編集機能を追加する</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">□</span>
              <span>期限日を設定できるようにする</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">□</span>
              <span>ドラッグ&ドロップで並び替え</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">□</span>
              <span>カテゴリ/タグ機能を追加</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">□</span>
              <span>Prisma + PostgreSQLでDB永続化</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={8}
        questions={[
          {
            question: 'TodoListコンポーネントはServer/Clientどちらで実装すべき？',
            options: [
              'Client Component（mapを使うから）',
              'Server Component（データを受け取って表示するだけ）',
              'どちらでも同じ',
              '実装不可能'
            ],
            correctIndex: 1,
            explanation: 'TodoListは受け取ったデータをmapで表示するだけなので、Server Componentで実装できます。子のTodoItemがClient Componentでも問題ありません。'
          },
          {
            question: 'Server Actionsで処理後にUIを更新する正しい方法は？',
            options: [
              'window.location.reload()',
              'useEffect(() => fetchData())',
              'revalidatePath("/todos")',
              'setState(newData)'
            ],
            correctIndex: 2,
            explanation: 'Server Actions内でrevalidatePath()を呼ぶことで、指定したパスのキャッシュを再検証し、UIが自動的に更新されます。'
          },
          {
            question: 'フォームのローディング状態を表示するフックは？',
            options: ['useState', 'useLoading', 'useFormStatus', 'usePending'],
            correctIndex: 2,
            explanation: 'useFormStatusはReactの公式フックで、フォームの送信状態（pending）を取得できます。フォームの子コンポーネント内で使用します。'
          }
        ]}
      />

      {/* Completion */}
      <section>
        <div className="my-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">おめでとうございます！</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Next.js完全入門チュートリアルを完了しました！
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              App Router
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
              Server Components
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              Server Actions
            </span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm">
              ハイドレーション
            </span>
          </div>
        </div>

        <h2>次のステップ</h2>

        <div className="space-y-4 my-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">公式ドキュメント</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Next.js公式ドキュメント
              </a>
              で、さらに深く学びましょう。
            </p>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">実践プロジェクト</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              実際のプロジェクトで使ってみましょう。Vercelにデプロイして公開するのもおすすめです。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
