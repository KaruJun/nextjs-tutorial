'use client'

import { CodeBlock, Alert, Quiz, DecisionFlow } from '@/components/tutorial'
import { useState } from 'react'
import { MousePointer, RefreshCw, Smartphone, ToggleLeft, ToggleRight } from 'lucide-react'

// Interactive Demo Component
function ClientComponentDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
          Client Component
        </span>
        <span className="text-sm text-gray-500">インタラクティブなデモ</span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm mb-2">カウンター（useState）:</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(c => c - 1)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="text-2xl font-bold w-12 text-center">{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm mb-2">入力フォーム（onChange）:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力..."
            className="px-3 py-2 border rounded w-full dark:bg-gray-800 dark:border-gray-600"
          />
          {name && <p className="text-sm mt-2">こんにちは、{name}さん！</p>}
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        ↑ これらの機能はClient Componentでのみ動作します
      </p>
    </div>
  )
}

export default function Step3Content() {
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>&quot;use client&quot;ディレクティブ</h2>
        <p>
          <code>&quot;use client&quot;</code>をファイルの先頭に書くと、
          そのコンポーネントは<strong>Client Component</strong>になります。
          Client Componentはブラウザで実行され、インタラクティブな機能を使えます。
        </p>

        <CodeBlock
          code={`'use client' // ← この行を追加するとClient Componentになる

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      クリック回数: {count}
    </button>
  )
}`}
          filename="components/Counter.tsx"
          badge="client"
        />

        <Alert type="warning" title="&quot;use client&quot;の位置">
          <code>&quot;use client&quot;</code>は必ずファイルの<strong>一番上</strong>に書いてください。
          importより前に書く必要があります。
        </Alert>
      </section>

      {/* When to use Client Component */}
      <section>
        <h2>Client Componentが必要な場面</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">状態管理が必要</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• <code>useState</code></li>
              <li>• <code>useReducer</code></li>
              <li>• <code>useContext</code></li>
            </ul>
          </div>

          <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <MousePointer className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">イベントハンドラ</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• <code>onClick</code></li>
              <li>• <code>onChange</code></li>
              <li>• <code>onSubmit</code></li>
            </ul>
          </div>

          <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">ブラウザAPI</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• <code>window</code></li>
              <li>• <code>localStorage</code></li>
              <li>• <code>navigator</code></li>
            </ul>
          </div>

          <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">副作用</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• <code>useEffect</code></li>
              <li>• <code>useLayoutEffect</code></li>
              <li>• カスタムフック</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section>
        <h2>実際に触ってみよう</h2>
        <p>
          以下のデモはClient Componentで実装されています。
          ボタンをクリックしたり、入力したりしてみてください。
        </p>

        <div className="my-6">
          <ClientComponentDemo />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          これらの機能（状態の更新、イベントの処理）はブラウザで実行する必要があるため、
          Client Componentが必要です。
        </p>
      </section>

      {/* Server vs Client Comparison */}
      <section>
        <h2>Server ComponentとClient Componentの使い分け</h2>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mb-4"
        >
          {showComparison ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          比較表を{showComparison ? '隠す' : '表示'}
        </button>

        {showComparison && (
          <div className="overflow-x-auto my-6 animate-fade-in">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">機能</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Server
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Client
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">async/await コンポーネント</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">✅</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-500">❌</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">DB/APIキーへの直接アクセス</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">✅</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-500">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">useState / useEffect</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-500">❌</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">✅</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">onClick等のイベント</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-500">❌</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">window/localStorage</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-500">❌</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">✅</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">バンドルサイズへの影響</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-500">なし</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-yellow-500">あり</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <DecisionFlow
          question="そのコンポーネントは..."
          options={[
            { condition: 'useStateを使う', result: 'Client', resultType: 'client' },
            { condition: 'useEffectを使う', result: 'Client', resultType: 'client' },
            { condition: 'onClickを使う', result: 'Client', resultType: 'client' },
            { condition: 'ブラウザAPIを使う', result: 'Client', resultType: 'client' },
            { condition: '上記どれでもない', result: 'Server', resultType: 'server' },
          ]}
        />
      </section>

      {/* Composition Pattern */}
      <section>
        <h2>コンポーネントの組み合わせパターン</h2>

        <p>
          Server ComponentとClient Componentは組み合わせて使えます。
          <strong>できるだけServer Componentを使い、必要な部分だけClient Componentにする</strong>
          のがベストプラクティスです。
        </p>

        <CodeBlock
          code={`// app/blog/[id]/page.tsx (Server Component)
import { db } from '@/lib/db'
import LikeButton from './LikeButton' // Client Component

export default async function BlogPost({ params }) {
  // サーバーでデータ取得
  const post = await db.query('SELECT * FROM posts WHERE id = $1', [params.id])

  return (
    <article>
      {/* 静的な部分はServer Component */}
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* インタラクティブな部分だけClient Component */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  )
}`}
          filename="app/blog/[id]/page.tsx"
          badge="server"
        />

        <CodeBlock
          code={`// app/blog/[id]/LikeButton.tsx (Client Component)
'use client'

import { useState } from 'react'

export default function LikeButton({
  postId,
  initialLikes
}: {
  postId: number
  initialLikes: number
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    // APIを呼んでいいね数を更新
    await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' })
    setLikes(likes + 1)
    setIsLiked(true)
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}
      className="flex items-center gap-2"
    >
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  )
}`}
          filename="app/blog/[id]/LikeButton.tsx"
          badge="client"
        />

        <Alert type="tip" title="ベストプラクティス">
          <ul className="space-y-1 text-sm">
            <li>• データ取得はServer Componentで行う</li>
            <li>• インタラクティブな部分だけClient Componentに分離</li>
            <li>• Client Componentはできるだけ小さく保つ</li>
          </ul>
        </Alert>
      </section>

      {/* Props passing */}
      <section>
        <h2>Server → Client へのデータの渡し方</h2>

        <p>
          Server ComponentからClient Componentへは、<code>props</code>でデータを渡せます。
          ただし、渡せるのは<strong>シリアライズ可能な値</strong>のみです。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3">渡せる値</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">✅ OK</p>
              <ul className="space-y-1">
                <li>• 文字列、数値、真偽値</li>
                <li>• 配列、オブジェクト</li>
                <li>• Date（文字列に変換される）</li>
                <li>• null、undefined</li>
              </ul>
            </div>
            <div>
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">❌ NG</p>
              <ul className="space-y-1">
                <li>• 関数</li>
                <li>• クラスのインスタンス</li>
                <li>• Symbol</li>
                <li>• JSX要素（children以外）</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Server Component
import ClientComponent from './ClientComponent'

export default async function Page() {
  const data = await fetchData()

  return (
    <ClientComponent
      // ✅ OK: プリミティブ値
      title={data.title}
      count={data.count}
      isActive={true}

      // ✅ OK: オブジェクト・配列
      items={data.items}
      config={{ theme: 'dark' }}

      // ❌ NG: 関数は渡せない
      // onClick={() => console.log('click')}
    />
  )
}`}
          filename="Server Component"
        />
      </section>

      {/* Common Mistakes */}
      <section>
        <h2>よくある間違い</h2>

        <div className="space-y-4 my-6">
          <div className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
              ❌ Server Componentでイベントハンドラを使おうとする
            </h4>
            <CodeBlock
              code={`// app/page.tsx (Server Component)
// これはエラーになる！

export default function Page() {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <button onClick={handleClick}>  {/* Error! */}
      クリック
    </button>
  )
}`}
              badge="error"
            />
          </div>

          <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
              ✅ インタラクティブな部分をClient Componentに分離
            </h4>
            <CodeBlock
              code={`// components/ClickButton.tsx
'use client'

export default function ClickButton() {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <button onClick={handleClick}>
      クリック
    </button>
  )
}

// app/page.tsx (Server Component)
import ClickButton from '@/components/ClickButton'

export default function Page() {
  return <ClickButton />
}`}
              badge="good"
            />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={3}
        questions={[
          {
            question: 'Client Componentを宣言するディレクティブは？',
            options: ['"use strict"', '"use client"', '"client component"', 'export client'],
            correctIndex: 1,
            explanation: 'ファイルの先頭に"use client"と書くことで、そのファイルのコンポーネントがClient Componentになります。'
          },
          {
            question: '以下のうち、Client Componentが必要なのはどれ？',
            options: [
              'データベースからデータを取得',
              'ボタンクリックでカウントを増やす',
              '静的なテキストを表示',
              'APIキーを使って外部APIを呼ぶ'
            ],
            correctIndex: 1,
            explanation: 'ボタンクリック（onClick）でカウントを増やす（useState）には、Client Componentが必要です。'
          },
          {
            question: 'Server ComponentからClient Componentに渡せないものは？',
            options: ['文字列', '配列', '関数', 'オブジェクト'],
            correctIndex: 2,
            explanation: '関数はシリアライズできないため、Server ComponentからClient Componentにpropsとして渡すことはできません。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          Server ComponentとClient Componentの違いを理解したら、
          次は<strong>ハイドレーション</strong>について学びましょう。
          なぜハイドレーションエラーが起きるのか、どう解決するのかを詳しく見ていきます。
        </p>
      </section>
    </div>
  )
}
