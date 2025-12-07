'use client'

import { CodeBlock, Alert, Quiz, ComparisonTable } from '@/components/tutorial'
import { Server, Database, RefreshCw, Clock, Zap } from 'lucide-react'

export default function Step5Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>レンダリング戦略とは？</h2>
        <p>
          Next.jsでは、ページをいつ、どこでHTMLに変換するか（レンダリングするか）を
          制御できます。適切な戦略を選ぶことで、パフォーマンスとユーザー体験を最適化できます。
        </p>

        <Alert type="tip" title="Laravelとの比較">
          Laravelでは基本的にリクエストごとにBladeテンプレートを処理しますが、
          Next.jsではビルド時に事前生成したり、キャッシュを活用したりできます。
        </Alert>
      </section>

      {/* Three Strategies */}
      <section>
        <h2>3つのレンダリング戦略</h2>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">SSG</h3>
            </div>
            <p className="text-sm font-medium mb-2">Static Site Generation</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              ビルド時にHTMLを生成。最速だが更新には再ビルドが必要。
            </p>
          </div>

          <div className="p-4 border-2 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">SSR</h3>
            </div>
            <p className="text-sm font-medium mb-2">Server Side Rendering</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              リクエストごとにHTMLを生成。常に最新だがサーバー負荷あり。
            </p>
          </div>

          <div className="p-4 border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold">ISR</h3>
            </div>
            <p className="text-sm font-medium mb-2">Incremental Static Regeneration</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              静的生成+定期更新。SSGとSSRのいいとこ取り。
            </p>
          </div>
        </div>
      </section>

      {/* SSG - Static Site Generation */}
      <section>
        <h2>SSG（静的サイト生成）</h2>

        <p>
          <strong>ビルド時</strong>にHTMLを生成し、CDNにキャッシュします。
          リクエストごとの処理が不要なため、最も高速です。
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold mb-3">適したユースケース</h4>
          <ul className="space-y-2 text-sm">
            <li>• ブログ記事</li>
            <li>• ドキュメントサイト</li>
            <li>• マーケティングページ</li>
            <li>• 製品カタログ（頻繁に更新しない）</li>
          </ul>
        </div>

        <CodeBlock
          code={`// app/blog/[slug]/page.tsx
// SSGの例：ビルド時に全記事を事前生成

// ビルド時に生成するパスを指定
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}`}
          filename="app/blog/[slug]/page.tsx"
          badge="server"
        />

        <Alert type="info">
          <code>generateStaticParams</code>を使うと、動的ルートでもビルド時に
          全てのパスのHTMLを事前生成できます。
        </Alert>
      </section>

      {/* SSR - Server Side Rendering */}
      <section>
        <h2>SSR（サーバーサイドレンダリング）</h2>

        <p>
          <strong>リクエストごと</strong>にサーバーでHTMLを生成します。
          常に最新のデータを表示できますが、サーバーの処理時間がかかります。
        </p>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-semibold mb-3">適したユースケース</h4>
          <ul className="space-y-2 text-sm">
            <li>• ユーザーごとにカスタマイズされたページ</li>
            <li>• リアルタイムデータが必要なダッシュボード</li>
            <li>• 検索結果ページ</li>
            <li>• 認証が必要なページ</li>
          </ul>
        </div>

        <CodeBlock
          code={`// app/dashboard/page.tsx
// SSRの例：リクエストごとにデータを取得

// キャッシュを無効化してSSRを強制
export const dynamic = 'force-dynamic'
// または fetchに { cache: 'no-store' } を指定

export default async function Dashboard() {
  // リクエストごとに実行される
  const user = await getCurrentUser()
  const stats = await getUserStats(user.id)

  return (
    <div>
      <h1>{user.name}さんのダッシュボード</h1>
      <p>今日のアクセス数: {stats.todayViews}</p>
      <p>総売上: ¥{stats.totalSales}</p>
    </div>
  )
}`}
          filename="app/dashboard/page.tsx"
          badge="server"
        />
      </section>

      {/* ISR - Incremental Static Regeneration */}
      <section>
        <h2>ISR（増分静的再生成）</h2>

        <p>
          SSGのように静的生成しつつ、<strong>指定した間隔で再生成</strong>します。
          パフォーマンスとデータの鮮度のバランスが取れます。
        </p>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="font-semibold mb-3">適したユースケース</h4>
          <ul className="space-y-2 text-sm">
            <li>• ECサイトの商品ページ</li>
            <li>• ニュースサイト</li>
            <li>• SNSのプロフィールページ</li>
            <li>• 数分〜数時間の遅延が許容されるデータ</li>
          </ul>
        </div>

        <CodeBlock
          code={`// app/products/[id]/page.tsx
// ISRの例：60秒ごとに再生成

// 60秒間キャッシュを保持し、その後再生成
export const revalidate = 60

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // この結果は60秒間キャッシュされる
  const product = await getProduct(id)

  return (
    <div>
      <h1>{product.name}</h1>
      <p>価格: ¥{product.price}</p>
      <p>在庫: {product.stock}個</p>
    </div>
  )
}`}
          filename="app/products/[id]/page.tsx"
          badge="server"
        />

        <Alert type="info" title="revalidateの動作">
          <ol className="list-decimal ml-4 text-sm space-y-1 mt-2">
            <li>最初のリクエスト: サーバーでHTMLを生成してキャッシュ</li>
            <li>60秒以内のリクエスト: キャッシュされたHTMLを返す</li>
            <li>60秒経過後のリクエスト: キャッシュを返しつつ、バックグラウンドで再生成</li>
            <li>次のリクエスト: 新しいHTMLを返す</li>
          </ol>
        </Alert>
      </section>

      {/* fetch with cache */}
      <section>
        <h2>fetchのキャッシュオプション</h2>

        <p>
          Next.jsはfetch APIを拡張しており、リクエスト単位でキャッシュを制御できます。
        </p>

        <CodeBlock
          code={`// キャッシュの制御オプション

// デフォルト: キャッシュを使用（SSG的な動作）
const data1 = await fetch('https://api.example.com/data')

// キャッシュを無効化（SSR的な動作）
const data2 = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// 特定の秒数でrevalidate（ISR的な動作）
const data3 = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})

// タグを指定してオンデマンドで再検証
const data4 = await fetch('https://api.example.com/data', {
  next: { tags: ['products'] }
})`}
        />

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">オプション</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">動作</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">相当する戦略</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-xs">（デフォルト）</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ビルド時にキャッシュ</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">SSG</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-xs">{`{ cache: 'no-store' }`}</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">毎回サーバーで取得</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">SSR</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-xs">{`{ next: { revalidate: 60 } }`}</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">60秒ごとに再取得</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ISR</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* On-demand Revalidation */}
      <section>
        <h2>オンデマンド再検証</h2>

        <p>
          時間ベースではなく、特定のイベント（データ更新など）をトリガーに
          キャッシュを再検証することもできます。
        </p>

        <CodeBlock
          code={`// app/api/revalidate/route.ts
// Webhookなどから呼び出してキャッシュを再検証

import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { tag, path, secret } = await request.json()

  // シークレットで認証
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // タグで再検証
  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }

  // パスで再検証
  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  }

  return NextResponse.json({ error: 'No tag or path provided' }, { status: 400 })
}`}
          filename="app/api/revalidate/route.ts"
        />

        <Alert type="tip" title="使用例">
          CMSで記事を更新したときにWebhookを発火し、
          該当ページのキャッシュを即座に更新できます。
        </Alert>
      </section>

      {/* Comparison Table */}
      <section>
        <h2>戦略の比較</h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">特徴</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">SSG</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">SSR</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">ISR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">生成タイミング</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ビルド時</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">リクエスト時</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ビルド時+定期更新</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">パフォーマンス</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">最速</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-yellow-600">普通</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">高速</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">データの鮮度</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-600">ビルド時点</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">常に最新</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-yellow-600">数秒〜遅延</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">サーバー負荷</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">なし</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-600">高い</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">低い</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">パーソナライズ</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-600">不可</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-green-600">可能</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-red-600">不可</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={5}
        questions={[
          {
            question: 'ビルド時にHTMLを生成し、CDNにキャッシュする戦略は？',
            options: ['SSR', 'SSG', 'ISR', 'CSR'],
            correctIndex: 1,
            explanation: 'SSG（Static Site Generation）は、ビルド時にHTMLを生成し、CDNにキャッシュします。最も高速ですが、データの更新には再ビルドが必要です。'
          },
          {
            question: 'revalidate: 60 を設定すると、どのような動作になりますか？',
            options: [
              '60秒後に自動的にページが削除される',
              '60秒間キャッシュを保持し、その後バックグラウンドで再生成',
              '60秒ごとにクライアントがリロードする',
              '60回アクセスされたら再生成'
            ],
            correctIndex: 1,
            explanation: 'revalidate: 60 は ISR の設定で、60秒間キャッシュを保持し、期限切れ後のリクエストでバックグラウンドで再生成します。'
          },
          {
            question: '常に最新のデータを表示する必要がある場合、どの設定を使いますか？',
            options: [
              'revalidate: 0',
              "cache: 'force-cache'",
              "cache: 'no-store'",
              'dynamic: false'
            ],
            correctIndex: 2,
            explanation: "cache: 'no-store' を設定すると、キャッシュを無効化し、毎回サーバーでデータを取得します（SSR的な動作）。"
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          レンダリング戦略を理解したら、次は<strong>ルーティングの高度な機能</strong>を学びましょう。
          動的ルーティング、ルートグループ、並列ルートなどを使いこなせるようになります。
        </p>
      </section>
    </div>
  )
}
