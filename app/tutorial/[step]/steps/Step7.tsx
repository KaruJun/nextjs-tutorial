'use client'

import { CodeBlock, Alert, Quiz } from '@/components/tutorial'
import { Server, Database, Send, RefreshCw } from 'lucide-react'

export default function Step7Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>データフェッチングの基本</h2>
        <p>
          Next.js App Routerでは、Server Componentsで直接データを取得できます。
          また、フォームの送信にはServer Actionsを使用できます。
        </p>

        <Alert type="tip" title="Laravelとの比較">
          LaravelではControllerでデータを取得してViewに渡しますが、
          Next.jsではServer Component内で直接データを取得してJSXを返します。
          Server ActionsはLaravelのFormRequestに近い概念です。
        </Alert>
      </section>

      {/* Server Components Data Fetching */}
      <section>
        <h2>Server Componentsでのデータ取得</h2>

        <p>
          Server Componentsでは、<code>async/await</code>を使って
          コンポーネント内で直接データを取得できます。
        </p>

        <CodeBlock
          code={`// app/users/page.tsx
// Server Componentでのデータ取得

async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 } // 60秒でキャッシュ更新
  })

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  return res.json()
}

export default async function UsersPage() {
  // Server Componentなのでawaitが使える！
  const users = await getUsers()

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
          filename="app/users/page.tsx"
          badge="server"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">データベースへの直接アクセス</h3>

        <CodeBlock
          code={`// app/products/page.tsx
// DBに直接アクセスする例（Prismaを使用）

import { prisma } from '@/lib/prisma'

export default async function ProductsPage() {
  // Server Componentなので直接DBアクセス可能
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return (
    <div>
      <h1>商品一覧</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>¥{product.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}`}
          filename="app/products/page.tsx"
          badge="server"
        />
      </section>

      {/* Server Actions */}
      <section>
        <h2>Server Actions</h2>

        <p>
          Server Actionsは、フォームの送信をサーバーサイドで処理する機能です。
          APIエンドポイントを作成せずに、直接データベースを更新できます。
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Send className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold">Server Actionsの特徴</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• <code>&quot;use server&quot;</code>で関数をサーバーアクションに</li>
            <li>• フォームのaction属性に直接渡せる</li>
            <li>• JavaScriptなしでも動作（プログレッシブエンハンスメント）</li>
            <li>• 自動的に再検証（revalidate）できる</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">基本的なServer Action</h3>

        <CodeBlock
          code={`// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string

  // バリデーション
  if (!title || title.length < 1) {
    return { error: 'タイトルを入力してください' }
  }

  // データベースに保存
  await prisma.todo.create({
    data: { title, completed: false }
  })

  // キャッシュを再検証してUIを更新
  revalidatePath('/todos')

  return { success: true }
}`}
          filename="app/actions.ts"
        />

        <CodeBlock
          code={`// app/todos/page.tsx
import { createTodo } from '@/app/actions'

export default async function TodosPage() {
  return (
    <div>
      <h1>TODOリスト</h1>

      {/* Server Actionをformのactionに渡す */}
      <form action={createTodo}>
        <input
          type="text"
          name="title"
          placeholder="新しいタスク..."
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </form>
    </div>
  )
}`}
          filename="app/todos/page.tsx"
          badge="server"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">useFormStatusでローディング状態を表示</h3>

        <CodeBlock
          code={`// components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {pending ? '送信中...' : '送信'}
    </button>
  )
}`}
          filename="components/SubmitButton.tsx"
          badge="client"
        />

        <Alert type="warning" title="注意">
          <code>useFormStatus</code>は<strong>フォームの子コンポーネント</strong>内でのみ動作します。
          form要素と同じコンポーネント内では使用できません。
        </Alert>

        <h3 className="text-lg font-semibold mt-6 mb-3">useActionStateでフォーム状態を管理</h3>

        <CodeBlock
          code={`// app/contact/ContactForm.tsx
'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions'

const initialState = {
  message: '',
  error: ''
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  )

  return (
    <form action={formAction}>
      <input type="email" name="email" required />
      <textarea name="message" required />

      <button type="submit" disabled={isPending}>
        {isPending ? '送信中...' : '送信'}
      </button>

      {state.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      {state.message && (
        <p className="text-green-500">{state.message}</p>
      )}
    </form>
  )
}`}
          filename="app/contact/ContactForm.tsx"
          badge="client"
        />
      </section>

      {/* API Routes */}
      <section>
        <h2>API Routes (Route Handlers)</h2>

        <p>
          外部からのAPIリクエストを処理する場合は、Route Handlersを使用します。
          <code>app/api/</code>ディレクトリに<code>route.ts</code>を作成します。
        </p>

        <CodeBlock
          code={`// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json()

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    }
  })

  return NextResponse.json(user, { status: 201 })
}`}
          filename="app/api/users/route.ts"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">動的パラメータを使用</h3>

        <CodeBlock
          code={`// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users/123
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  })

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

// DELETE /api/users/123
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.user.delete({
    where: { id: parseInt(id) }
  })

  return new NextResponse(null, { status: 204 })
}`}
          filename="app/api/users/[id]/route.ts"
        />
      </section>

      {/* When to use what */}
      <section>
        <h2>使い分けガイド</h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">ユースケース</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">推奨方法</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ページにデータを表示</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Server Componentでfetch/DB直接アクセス</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">フォーム送信でデータ作成/更新</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Server Actions</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">外部サービスからのWebhook</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Route Handlers (API Routes)</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">モバイルアプリ向けAPI</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Route Handlers (API Routes)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">クライアントからのデータ更新</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Server Actions または Route Handlers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={7}
        questions={[
          {
            question: 'Server Actionsを定義するディレクティブは？',
            options: ['"use client"', '"use server"', '"server action"', 'export server'],
            correctIndex: 1,
            explanation: '"use server"をファイルの先頭または関数内に記述することで、Server Actionsを定義できます。'
          },
          {
            question: 'Server Actionsで処理後にUIを更新するには？',
            options: ['router.refresh()', 'revalidatePath()', 'window.reload()', 'useState()'],
            correctIndex: 1,
            explanation: 'revalidatePath()を使うと、指定したパスのキャッシュを再検証し、UIを自動的に更新できます。'
          },
          {
            question: 'Route Handlersを作成するファイル名は？',
            options: ['api.ts', 'handler.ts', 'route.ts', 'endpoint.ts'],
            correctIndex: 2,
            explanation: 'Route Handlersはroute.tsという名前で作成します。app/api/xxx/route.tsの形式でAPIエンドポイントを定義します。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          データフェッチングパターンを理解したら、最後の<strong>実践課題</strong>に挑戦しましょう。
          学んだすべての概念を使って、Todoアプリを作成します。
        </p>
      </section>
    </div>
  )
}
