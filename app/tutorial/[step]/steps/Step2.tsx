'use client'

import { CodeBlock, Alert, Quiz, DecisionFlow } from '@/components/tutorial'
import { Server, Database, Shield, Zap, Eye, Terminal } from 'lucide-react'

export default function Step2Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>React Server Componentsとは？</h2>
        <p>
          React Server Components（RSC）は、<strong>サーバーでのみ実行される</strong>Reactコンポーネントです。
          Next.js App Routerでは、デフォルトで全てのコンポーネントがServer Componentになります。
        </p>

        <Alert type="info" title="重要な事実">
          <code>app/</code>ディレクトリ内のコンポーネントは、
          <code>&quot;use client&quot;</code>を書かない限り、すべてServer Componentです。
        </Alert>
      </section>

      {/* Why Server Components */}
      <section>
        <h2>なぜサーバーで実行するのか？</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">データへの直接アクセス</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              APIを経由せず、データベースに直接アクセスできます。
              LaravelのControllerでDBを操作するイメージです。
            </p>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">機密情報の安全な使用</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              APIキーやDBの認証情報をクライアントに露出させずに使えます。
            </p>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold">バンドルサイズの削減</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              サーバーでのみ使うライブラリはクライアントに送信されません。
              ページの読み込みが高速になります。
            </p>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold">SEOの向上</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              サーバーで完全なHTMLを生成するため、
              検索エンジンがコンテンツを認識できます。
            </p>
          </div>
        </div>
      </section>

      {/* Server Component Example */}
      <section>
        <h2>Server Componentの書き方</h2>

        <p>
          Server Componentは特別な記述は不要です。
          普通にコンポーネントを書けば、それがServer Componentになります。
        </p>

        <CodeBlock
          code={`// app/users/page.tsx
// これはServer Component（デフォルト）

// サーバーサイドのライブラリを直接import
import { db } from '@/lib/database'

export default async function UsersPage() {
  // サーバーで実行される！
  // データベースに直接アクセス可能
  const users = await db.query('SELECT * FROM users')

  // console.logはサーバーのターミナルに出力される
  console.log('ユーザー数:', users.length)

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
          filename="app/users/page.tsx"
          badge="server"
        />

        <Alert type="warning" title="console.logの出力先に注意！">
          Server Componentの<code>console.log</code>は、
          <strong>ブラウザのコンソールではなく、サーバーのターミナル</strong>に出力されます。
          開発中は<code>npm run dev</code>を実行しているターミナルを確認してください。
        </Alert>
      </section>

      {/* async/await in Components */}
      <section>
        <h2>async/awaitが使える！</h2>

        <p>
          Server Componentでは、コンポーネント自体を<code>async</code>にして
          <code>await</code>でデータを取得できます。これはReact単体ではできない機能です。
        </p>

        <CodeBlock
          code={`// Server Componentではasyncコンポーネントが使える
export default async function ProductPage() {
  // awaitで非同期処理を待てる
  const product = await fetch('https://api.example.com/products/1')
    .then(res => res.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>価格: ¥{product.price}</p>
    </div>
  )
}`}
          filename="app/products/[id]/page.tsx"
          badge="server"
        />

        <Alert type="tip" title="Laravelとの比較">
          これは、LaravelのControllerでDB操作してからBladeに渡すのと同じ流れです。
          ただし、「テンプレート」と「ロジック」が同じファイルに書けます。
        </Alert>
      </section>

      {/* What you CAN'T do */}
      <section>
        <h2>Server Componentでできないこと</h2>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">
            Server Componentでは以下は使えません
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500">❌</span>
              <code>useState</code>, <code>useEffect</code>などのReact Hooks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">❌</span>
              <code>onClick</code>, <code>onChange</code>などのイベントハンドラ
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">❌</span>
              <code>window</code>, <code>document</code>, <code>localStorage</code>などのブラウザAPI
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">❌</span>
              クライアント専用のライブラリ（例: framer-motion）
            </li>
          </ul>
        </div>

        <p>
          これらの機能が必要な場合は、<strong>Client Component</strong>を使います。
          （次のステップで学びます）
        </p>
      </section>

      {/* Practical Example */}
      <section>
        <h2>実践例：ブログ記事一覧</h2>

        <p>
          実際のアプリケーションでよくある、データベースから記事を取得して表示する例を見てみましょう。
        </p>

        <CodeBlock
          code={`// lib/db.ts
// データベース接続（例）
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
}`}
          filename="lib/db.ts"
        />

        <CodeBlock
          code={`// app/blog/page.tsx
import { db } from '@/lib/db'
import Link from 'next/link'

// 型定義
interface Post {
  id: number
  title: string
  excerpt: string
  created_at: Date
}

export default async function BlogPage() {
  // サーバーでDBからデータ取得
  const result = await db.query(\`
    SELECT id, title, excerpt, created_at
    FROM posts
    ORDER BY created_at DESC
    LIMIT 10
  \`)
  const posts: Post[] = result.rows

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">ブログ</h1>

      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="border-b pb-6">
            <Link href={\`/blog/\${post.id}\`}>
              <h2 className="text-xl font-semibold hover:text-blue-500">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
            <time className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleDateString('ja-JP')}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}`}
          filename="app/blog/page.tsx"
          badge="server"
        />

        <Alert type="info">
          <strong>注目ポイント：</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• DBの認証情報（DATABASE_URL）はクライアントに露出しない</li>
            <li>• SQLクエリはサーバーでのみ実行される</li>
            <li>• pgライブラリはクライアントにバンドルされない</li>
          </ul>
        </Alert>
      </section>

      {/* Console.log Demo */}
      <section>
        <h2>やってみよう：console.logの出力先を確認</h2>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-green-500" />
            <h4 className="font-semibold">実験してみよう</h4>
          </div>

          <ol className="space-y-4 text-sm">
            <li>
              <strong>1. Server Componentにconsole.logを追加</strong>
              <CodeBlock
                code={`// app/test/page.tsx
export default function TestPage() {
  console.log('🖥️ これはサーバーで実行されています！')

  return <div>テストページ</div>
}`}
                filename="app/test/page.tsx"
              />
            </li>
            <li>
              <strong>2. ブラウザで /test にアクセス</strong>
            </li>
            <li>
              <strong>3. 出力先を確認</strong>
              <ul className="mt-2 ml-4 space-y-1">
                <li>✅ <code>npm run dev</code>を実行しているターミナルに表示される</li>
                <li>❌ ブラウザのコンソールには表示されない</li>
              </ul>
            </li>
          </ol>
        </div>

        <Alert type="tip">
          これが「サーバーで実行される」ということの証拠です。
          ブラウザには実行結果（HTML）だけが送られます。
        </Alert>
      </section>

      {/* Decision Flow */}
      <section>
        <h2>Server Componentを使う判断基準</h2>

        <DecisionFlow
          question="そのコンポーネントは..."
          options={[
            { condition: 'DBにアクセスする', result: 'Server', resultType: 'server' },
            { condition: 'APIキーを使う', result: 'Server', resultType: 'server' },
            { condition: '重いライブラリを使う', result: 'Server', resultType: 'server' },
            { condition: 'SEOが重要', result: 'Server', resultType: 'server' },
            { condition: 'インタラクションがない', result: 'Server', resultType: 'server' },
          ]}
        />
      </section>

      {/* Quiz */}
      <Quiz
        stepId={2}
        questions={[
          {
            question: 'Server Componentのconsole.logはどこに出力されますか？',
            options: ['ブラウザのコンソール', 'サーバーのターミナル', '両方', 'どこにも出力されない'],
            correctIndex: 1,
            explanation: 'Server Componentはサーバーで実行されるため、console.logはサーバー側（npm run devを実行しているターミナル）に出力されます。'
          },
          {
            question: 'Server Componentで使えないものはどれですか？',
            options: ['async/await', 'データベースへの直接アクセス', 'useState', 'fetch()'],
            correctIndex: 2,
            explanation: 'useStateなどのReact Hooksはクライアントサイドの機能です。Server Componentでは使用できません。'
          },
          {
            question: 'App Routerでデフォルトのコンポーネントは？',
            options: ['Client Component', 'Server Component', 'Shared Component', '設定による'],
            correctIndex: 1,
            explanation: 'App Routerでは、"use client"を指定しない限り、すべてのコンポーネントがデフォルトでServer Componentになります。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          Server Componentを理解したら、次は<strong>Client Component</strong>について学びましょう。
          <code>useState</code>やイベントハンドラを使いたい時に必要になります。
        </p>
      </section>
    </div>
  )
}
