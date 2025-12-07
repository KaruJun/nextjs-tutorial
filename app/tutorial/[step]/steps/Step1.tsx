'use client'

import { CodeBlock, Alert, Quiz } from '@/components/tutorial'
import { Folder, File, FileCode, Layout, AlertCircle, Loader2, Settings } from 'lucide-react'

export default function Step1Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>app/ディレクトリの役割</h2>
        <p>
          Next.js App Routerでは、<code>app/</code>ディレクトリがアプリケーションの中心です。
          ファイルやフォルダの配置が、そのままURLのルーティングになります。
        </p>

        <Alert type="tip" title="Laravelとの比較">
          Laravelでは<code>routes/web.php</code>にルートを記述しますが、
          Next.jsではファイルの配置場所がそのままルートになります。
          より直感的で、設定ファイルを書く必要がありません。
        </Alert>
      </section>

      {/* Directory Structure */}
      <section>
        <h2>基本的なディレクトリ構造</h2>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 font-semibold">app/</span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>layout.tsx</span>
                <span className="text-gray-400 text-xs">← ルートレイアウト（必須）</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>page.tsx</span>
                <span className="text-gray-400 text-xs">← / にアクセスした時の画面</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-yellow-500" />
                <span>loading.tsx</span>
                <span className="text-gray-400 text-xs">← ローディング画面（任意）</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-red-500" />
                <span>error.tsx</span>
                <span className="text-gray-400 text-xs">← エラー画面（任意）</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-gray-500" />
                <span>not-found.tsx</span>
                <span className="text-gray-400 text-xs">← 404画面（任意）</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500">about/</span>
              </div>
              <div className="ml-6 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>page.tsx</span>
                <span className="text-gray-400 text-xs">← /about にアクセスした時の画面</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500">blog/</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                  <span className="text-gray-400 text-xs">← /blog</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-purple-500" />
                  <span className="text-purple-500">[slug]/</span>
                  <span className="text-gray-400 text-xs">← 動的ルート</span>
                </div>
                <div className="ml-6 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                  <span className="text-gray-400 text-xs">← /blog/hello-world 等</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Files */}
      <section>
        <h2>特殊なファイル名</h2>

        <p>
          Next.jsでは、特定のファイル名が特別な意味を持ちます。
          これらのファイル名は予約されており、自動的に特定の役割を果たします。
        </p>

        <div className="space-y-4 my-6">
          {/* page.tsx */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <File className="w-5 h-5 text-green-500" />
              <code className="font-semibold">page.tsx</code>
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">必須</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              そのルートにアクセスした時に表示されるUIを定義します。
              このファイルがないフォルダはルートとして認識されません。
            </p>
            <CodeBlock
              code={`// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>私たちについてのページです</p>
    </div>
  )
}`}
              filename="app/about/page.tsx"
              badge="server"
            />
          </div>

          {/* layout.tsx */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Layout className="w-5 h-5 text-blue-500" />
              <code className="font-semibold">layout.tsx</code>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">ルートでは必須</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              複数のページで共有されるUIを定義します。
              ナビゲーションバーやフッターなどを配置します。
              ページ遷移時にレイアウトは再レンダリングされません。
            </p>
            <CodeBlock
              code={`// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <nav>ナビゲーション</nav>
        <main>{children}</main>
        <footer>フッター</footer>
      </body>
    </html>
  )
}`}
              filename="app/layout.tsx"
              badge="server"
            />
            <Alert type="info">
              <code>children</code>には、そのルートの<code>page.tsx</code>、
              または子ルートの<code>layout.tsx</code>が入ります。
            </Alert>
          </div>

          {/* loading.tsx */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-5 h-5 text-yellow-500" />
              <code className="font-semibold">loading.tsx</code>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">任意</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              ページのコンテンツがロード中に表示されるUIを定義します。
              React Suspenseを自動的にラップします。
            </p>
            <CodeBlock
              code={`// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      <span className="ml-2">読み込み中...</span>
    </div>
  )
}`}
              filename="app/blog/loading.tsx"
            />
          </div>

          {/* error.tsx */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <code className="font-semibold">error.tsx</code>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">任意</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              エラーが発生した時に表示されるUIを定義します。
              React Error Boundaryを自動的にラップします。
              <strong className="text-red-500">「use client」が必須</strong>です。
            </p>
            <CodeBlock
              code={`// app/blog/error.tsx
'use client' // Error componentsは必ずClient Component

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        もう一度試す
      </button>
    </div>
  )
}`}
              filename="app/blog/error.tsx"
              badge="client"
            />
          </div>
        </div>
      </section>

      {/* File-based Routing */}
      <section>
        <h2>ファイルベースルーティング</h2>

        <p>
          フォルダ構造がそのままURLになります。とてもシンプルです。
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">ファイルパス</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">URL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/page.tsx</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">/</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/about/page.tsx</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">/about</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/blog/page.tsx</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">/blog</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/blog/[slug]/page.tsx</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">/blog/hello-world</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/shop/[...slug]/page.tsx</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">/shop/clothes/tops/t-shirts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert type="warning" title="注意">
          <code>page.tsx</code>がないフォルダはルートとして認識されません。
          <code>components/</code>や<code>utils/</code>など、
          ルートに関係ないファイルを<code>app/</code>内に置いても大丈夫です。
        </Alert>
      </section>

      {/* Dynamic Routes */}
      <section>
        <h2>動的ルーティング</h2>

        <p>
          <code>[param]</code>の形式でフォルダを作ると、動的なルートになります。
          LaravelでいうRoute Parameterに相当します。
        </p>

        <CodeBlock
          code={`// app/blog/[slug]/page.tsx
// URL: /blog/hello-world → params.slug = "hello-world"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  return (
    <article>
      <h1>記事: {slug}</h1>
    </article>
  )
}`}
          filename="app/blog/[slug]/page.tsx"
          badge="server"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold mb-2">動的ルートのパターン</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[slug]</code>
              - 1つのセグメント（例: /blog/hello）
            </li>
            <li>
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[...slug]</code>
              - 複数のセグメント（例: /shop/a/b/c）
            </li>
            <li>
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[[...slug]]</code>
              - オプショナルな複数セグメント（例: /shop または /shop/a/b）
            </li>
          </ul>
        </div>
      </section>

      {/* Colocation */}
      <section>
        <h2>コロケーション（ファイルの配置）</h2>

        <p>
          <code>app/</code>ディレクトリ内に、コンポーネントやユーティリティを配置しても問題ありません。
          <code>page.tsx</code>がなければルートにはなりません。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500">app/</span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500">blog/</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                  <span className="text-gray-400 text-xs">← ルート</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-gray-500" />
                  <span>BlogCard.tsx</span>
                  <span className="text-gray-400 text-xs">← ルートにならない</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-gray-500" />
                  <span>utils.ts</span>
                  <span className="text-gray-400 text-xs">← ルートにならない</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alert type="tip">
          関連するコンポーネントをページの近くに配置できるので、
          コードの見通しが良くなります。
        </Alert>
      </section>

      {/* Route Groups */}
      <section>
        <h2>ルートグループ</h2>

        <p>
          <code>(group)</code>の形式でフォルダを作ると、URLに影響を与えずにファイルを整理できます。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500">app/</span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500">(marketing)/</span>
                <span className="text-gray-400 text-xs">← URLに含まれない</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>layout.tsx</span>
                  <span className="text-gray-400 text-xs">← マーケティング用レイアウト</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-500">about/</span>
                </div>
                <div className="ml-6 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                  <span className="text-gray-400 text-xs">← /about</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500">(shop)/</span>
                <span className="text-gray-400 text-xs">← URLに含まれない</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>layout.tsx</span>
                  <span className="text-gray-400 text-xs">← ショップ用レイアウト</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-500">products/</span>
                </div>
                <div className="ml-6 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                  <span className="text-gray-400 text-xs">← /products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alert type="info">
          ルートグループを使うと、異なるレイアウトを持つページを
          URLの構造を変えずに整理できます。
        </Alert>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={1}
        questions={[
          {
            question: 'app/products/[id]/page.tsx にアクセスするURLは？',
            options: ['/products/[id]', '/products/123', '/app/products/123', '/page/products/123'],
            correctIndex: 1,
            explanation: '[id]は動的パラメータです。/products/123のようなURLでアクセスすると、idに123が入ります。'
          },
          {
            question: 'ローディング中の表示を定義するファイルはどれですか？',
            options: ['loading.tsx', 'spinner.tsx', 'wait.tsx', 'pending.tsx'],
            correctIndex: 0,
            explanation: 'loading.tsxはNext.jsの特殊ファイルで、コンテンツ読み込み中に自動的に表示されます。'
          },
          {
            question: 'app/(admin)/dashboard/page.tsx のURLは？',
            options: ['/(admin)/dashboard', '/admin/dashboard', '/dashboard', '/app/dashboard'],
            correctIndex: 2,
            explanation: '(admin)はルートグループです。括弧で囲まれたフォルダ名はURLに含まれません。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          プロジェクト構造を理解したら、次はNext.jsの最も重要な概念である
          「React Server Components」について学びましょう。
          サーバーとクライアントの違いを理解することが、Next.js開発の鍵です。
        </p>
      </section>
    </div>
  )
}
