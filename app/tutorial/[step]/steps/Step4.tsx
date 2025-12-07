'use client'

import { useState, useEffect, useId } from 'react'
import { CodeBlock, Alert, Quiz } from '@/components/tutorial'
import { AlertTriangle, CheckCircle, XCircle, Droplets, RefreshCw } from 'lucide-react'

// Demo: Date Mismatch
function DateMismatchDemo() {
  const [showError, setShowError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [clientDate, setClientDate] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    setClientDate(new Date().toLocaleString('ja-JP'))
  }, [])

  if (showError) {
    // This would cause hydration error in real scenario
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
          <XCircle className="w-5 h-5" />
          <span className="font-semibold">エラーを起こすコード</span>
        </div>
        <code className="text-sm">現在時刻: {new Date().toLocaleString('ja-JP')}</code>
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          サーバーとクライアントで値が異なるためエラーになります
        </p>
        <button
          onClick={() => setShowError(false)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          修正版を見る
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 rounded-lg">
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
        <CheckCircle className="w-5 h-5" />
        <span className="font-semibold">正しいコード（useEffect使用）</span>
      </div>
      <code className="text-sm">
        現在時刻: {mounted ? clientDate : 'Loading...'}
      </code>
      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
        useEffectでマウント後に日時を設定するため安全です
      </p>
      <button
        onClick={() => setShowError(true)}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        エラーを起こすコードを見る
      </button>
    </div>
  )
}

// Demo: Random ID
function RandomIdDemo() {
  const stableId = useId()
  const [showError, setShowError] = useState(false)

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg border ${showError ? 'bg-red-50 dark:bg-red-900/20 border-red-300' : 'bg-green-50 dark:bg-green-900/20 border-green-300'}`}>
        <div className={`flex items-center gap-2 mb-2 ${showError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {showError ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span className="font-semibold">
            {showError ? 'エラーを起こすコード（Math.random）' : '正しいコード（useId使用）'}
          </span>
        </div>
        <code className="text-sm">
          ID: {showError ? Math.random().toString(36).slice(2) : stableId}
        </code>
        <p className={`text-xs mt-2 ${showError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {showError
            ? 'Math.random()はサーバーとクライアントで異なる値を返します'
            : 'useId()は安定したIDを生成します'
          }
        </p>
      </div>
      <button
        onClick={() => setShowError(!showError)}
        className="text-sm text-blue-600 hover:underline"
      >
        {showError ? '正しいコードを見る' : 'エラーを起こすコードを見る'}
      </button>
    </div>
  )
}

// Demo: Window Access
function WindowAccessDemo() {
  const [theme, setTheme] = useState<string>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }, [])

  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 rounded-lg">
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
        <CheckCircle className="w-5 h-5" />
        <span className="font-semibold">正しいコード（useEffect使用）</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>現在のテーマ:</span>
        <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border'}`}>
          {mounted ? theme : 'loading...'}
        </span>
      </div>
      <button
        onClick={() => {
          const newTheme = theme === 'light' ? 'dark' : 'light'
          setTheme(newTheme)
          localStorage.setItem('theme', newTheme)
        }}
        className="mt-2 text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!mounted}
      >
        テーマを切り替え
      </button>
    </div>
  )
}

export default function Step4Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>ハイドレーションとは？</h2>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-lg">ハイドレーション（Hydration）</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            サーバーで生成した<strong>静的なHTML</strong>に、
            クライアントで<strong>インタラクティブ性（JavaScriptの機能）</strong>を
            「注入」するプロセスのことです。
          </p>
        </div>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-4">ハイドレーションの流れ</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <p className="font-medium">サーバーでHTMLを生成</p>
                <p className="text-sm text-gray-500">ReactコンポーネントをHTMLに変換</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <p className="font-medium">ブラウザにHTMLを送信</p>
                <p className="text-sm text-gray-500">ユーザーはすぐにコンテンツを見れる</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <p className="font-medium">JavaScriptをロード</p>
                <p className="text-sm text-gray-500">Reactと必要なJSをダウンロード</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <p className="font-medium">ハイドレーション実行</p>
                <p className="text-sm text-gray-500">HTMLにイベントハンドラ等を紐付け</p>
              </div>
            </div>
          </div>
        </div>

        <Alert type="info" title="なぜ「水分補給」という名前？">
          乾燥した（静的な）HTMLに、水（JavaScript）を注いで
          生き生きとした（インタラクティブな）状態にする、というイメージです。
        </Alert>
      </section>

      {/* Why Hydration Errors Happen */}
      <section>
        <h2>なぜハイドレーションエラーが起きるのか？</h2>

        <p>
          ハイドレーション時、Reactは<strong>サーバーで生成したHTMLと、
          クライアントで再レンダリングした結果が一致するか</strong>を確認します。
          もし<strong>不一致があるとエラー</strong>になります。
        </p>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-red-700 dark:text-red-400">
              ハイドレーションエラーの原因
            </h4>
          </div>
          <p className="text-sm mb-3">
            サーバーとクライアントで<strong>異なる値</strong>をレンダリングすると発生します。
          </p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono">
            <p className="text-blue-600 dark:text-blue-400">サーバー: &lt;p&gt;2024/01/01 10:00:00&lt;/p&gt;</p>
            <p className="text-green-600 dark:text-green-400">クライアント: &lt;p&gt;2024/01/01 10:00:05&lt;/p&gt;</p>
            <p className="text-red-600 dark:text-red-400 mt-2">→ 不一致！エラー発生</p>
          </div>
        </div>
      </section>

      {/* Common Hydration Errors */}
      <section>
        <h2>よくあるハイドレーションエラーと解決法</h2>

        {/* Error 1: Date */}
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-red-500">1.</span> Date/時刻の不一致
          </h3>

          <CodeBlock
            code={`// ❌ エラー例: new Date()を直接レンダリング
function BadComponent() {
  return <p>{new Date().toLocaleString()}</p>
}
// サーバーとクライアントで実行タイミングが違うため不一致`}
            badge="error"
          />

          <CodeBlock
            code={`// ✅ 解決法: useEffectで遅延レンダリング
'use client'
import { useState, useEffect } from 'react'

function GoodComponent() {
  const [dateStr, setDateStr] = useState<string>('')

  useEffect(() => {
    // クライアントでのみ実行される
    setDateStr(new Date().toLocaleString())
  }, [])

  // 初期表示は空文字列（サーバーと一致）
  return <p>{dateStr || 'Loading...'}</p>
}`}
            badge="good"
          />

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">デモ：</h4>
            <DateMismatchDemo />
          </div>
        </div>

        {/* Error 2: Math.random */}
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-red-500">2.</span> Math.random()の使用
          </h3>

          <CodeBlock
            code={`// ❌ エラー例: Math.random()を直接レンダリング
function BadComponent() {
  return <p>ID: {Math.random()}</p>
}
// サーバーとクライアントで異なる値が生成される`}
            badge="error"
          />

          <CodeBlock
            code={`// ✅ 解決法: useIdフックを使う
'use client'
import { useId } from 'react'

function GoodComponent() {
  // useIdはサーバー/クライアントで同じIDを生成
  const id = useId()
  return <p>ID: {id}</p>
}`}
            badge="good"
          />

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">デモ：</h4>
            <RandomIdDemo />
          </div>
        </div>

        {/* Error 3: Window/localStorage */}
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-red-500">3.</span> window/localStorageへの直接アクセス
          </h3>

          <CodeBlock
            code={`// ❌ エラー例: localStorageに直接アクセス
function BadComponent() {
  // サーバーにlocalStorageは存在しない！
  const theme = localStorage.getItem('theme')
  return <div className={theme}>...</div>
}`}
            badge="error"
          />

          <CodeBlock
            code={`// ✅ 解決法: useEffectでマウント後にアクセス
'use client'
import { useState, useEffect } from 'react'

function GoodComponent() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // クライアントでのみ実行
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])

  return <div className={theme}>...</div>
}`}
            badge="good"
          />

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">デモ：</h4>
            <WindowAccessDemo />
          </div>
        </div>

        {/* Error 4: HTML Nesting */}
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-red-500">4.</span> 不正なHTMLネスト
          </h3>

          <CodeBlock
            code={`// ❌ エラー例: pの中にdiv
function BadComponent() {
  return (
    <p>
      <div>これはNG</div>  {/* pの中にdivは置けない */}
    </p>
  )
}`}
            badge="error"
          />

          <CodeBlock
            code={`// ✅ 解決法: 正しいHTMLネスト
function GoodComponent() {
  return (
    <div>
      <div>これはOK</div>
    </div>
  )
}

// または
function GoodComponent2() {
  return (
    <p>
      <span>これもOK</span>  {/* pの中にspanはOK */}
    </p>
  )
}`}
            badge="good"
          />

          <Alert type="warning" title="よくある不正なネスト">
            <ul className="text-sm space-y-1 mt-2">
              <li>• <code>&lt;p&gt;</code>の中に<code>&lt;div&gt;</code></li>
              <li>• <code>&lt;a&gt;</code>の中に<code>&lt;a&gt;</code></li>
              <li>• <code>&lt;button&gt;</code>の中に<code>&lt;button&gt;</code></li>
              <li>• <code>&lt;table&gt;</code>直下に<code>&lt;tr&gt;</code>（tbodyなしで）</li>
            </ul>
          </Alert>
        </div>

        {/* Error 5: Conditional Rendering */}
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-red-500">5.</span> 環境による条件分岐
          </h3>

          <CodeBlock
            code={`// ❌ エラー例: typeof windowで分岐
function BadComponent() {
  // サーバー: false, クライアント: true で不一致
  if (typeof window !== 'undefined') {
    return <p>Client</p>
  }
  return <p>Server</p>
}`}
            badge="error"
          />

          <CodeBlock
            code={`// ✅ 解決法A: useEffectで状態管理
'use client'
import { useState, useEffect } from 'react'

function GoodComponent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <p>{isClient ? 'Client' : 'Loading...'}</p>
}`}
            badge="good"
          />

          <CodeBlock
            code={`// ✅ 解決法B: dynamic importでSSR無効化
import dynamic from 'next/dynamic'

// SSRを無効化してクライアントのみでレンダリング
const ClientOnlyComponent = dynamic(
  () => import('./ClientOnlyComponent'),
  { ssr: false }
)`}
            badge="good"
          />
        </div>
      </section>

      {/* Debugging Tips */}
      <section>
        <h2>ハイドレーションエラーのデバッグ方法</h2>

        <div className="space-y-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">1. エラーメッセージを読む</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Next.jsは親切なエラーメッセージを出します。
              「Expected server HTML to contain...」などのメッセージから
              どの要素で不一致が起きているか確認できます。
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">2. 問題箇所を二分探索</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              コンポーネントの半分をコメントアウトしてエラーが消えるか確認。
              エラーが出る方をさらに半分に...を繰り返して特定します。
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">3. React DevToolsを使う</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              React DevToolsのComponentsタブで、
              サーバーとクライアントの状態の違いを確認できます。
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">4. シークレットモードで確認</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ブラウザ拡張機能がDOMを変更してエラーを引き起こすことがあります。
              シークレットモードで試して、拡張機能の影響を除外してください。
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section>
        <h2>ハイドレーションエラー回避チェックリスト</h2>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            コードレビュー時のチェックポイント
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span><code>new Date()</code>を直接レンダリングしていないか</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span><code>Math.random()</code>を直接レンダリングしていないか</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span><code>window</code>/<code>document</code>/<code>localStorage</code>に直接アクセスしていないか</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>HTMLのネストは正しいか（p内にdiv等）</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>サーバー/クライアントで異なる値を返す条件分岐がないか</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>外部ライブラリがSSR対応しているか</span>
            </li>
          </ul>
        </div>
      </section>

      {/* suppressHydrationWarning */}
      <section>
        <h2>最終手段: suppressHydrationWarning</h2>

        <p>
          どうしても不一致を避けられない場合、
          <code>suppressHydrationWarning</code>属性で警告を抑制できます。
          ただし、<strong>本当に必要な場合のみ</strong>使用してください。
        </p>

        <CodeBlock
          code={`// suppressHydrationWarningの使用例
// 本当に意図的な不一致の場合のみ使用

function TimeDisplay() {
  return (
    <time
      suppressHydrationWarning
      dateTime={new Date().toISOString()}
    >
      {new Date().toLocaleTimeString()}
    </time>
  )
}`}
        />

        <Alert type="warning" title="注意">
          <code>suppressHydrationWarning</code>は警告を<strong>隠すだけ</strong>で、
          問題を解決するわけではありません。
          可能な限り、根本的な解決法を使ってください。
        </Alert>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={4}
        questions={[
          {
            question: 'ハイドレーションとは何ですか？',
            options: [
              'データベースからデータを取得すること',
              'サーバーで生成したHTMLにJSの機能を紐付けること',
              'CSSを適用すること',
              'キャッシュをクリアすること'
            ],
            correctIndex: 1,
            explanation: 'ハイドレーションは、サーバーで生成した静的なHTMLに、クライアントでJavaScriptの機能（イベントハンドラなど）を紐付けるプロセスです。'
          },
          {
            question: 'new Date()をClient Componentで安全に表示するには？',
            options: [
              'そのままレンダリングする',
              'useEffectで状態を更新してから表示',
              'Server Componentで使う',
              'suppressHydrationWarningを使う'
            ],
            correctIndex: 1,
            explanation: 'useEffectはクライアントでのみ実行されるため、useEffect内でsetStateを使って日時を設定すると、サーバーとクライアントで初期値が一致し、エラーを回避できます。'
          },
          {
            question: '以下のうち、ハイドレーションエラーの原因にならないものは？',
            options: [
              'new Date().toLocaleString()を直接表示',
              'Math.random()を直接表示',
              'useStateの初期値を文字列にする',
              'localStorageの値を直接表示'
            ],
            correctIndex: 2,
            explanation: 'useStateの初期値が固定の文字列であれば、サーバーとクライアントで同じ値になるため、ハイドレーションエラーは発生しません。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          ハイドレーションを理解したら、次は<strong>SSR/SSG/ISR</strong>について学びましょう。
          サーバーでのレンダリング戦略を理解することで、
          パフォーマンスを最適化できるようになります。
        </p>
      </section>
    </div>
  )
}
