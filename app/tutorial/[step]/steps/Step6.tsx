'use client'

import { CodeBlock, Alert, Quiz } from '@/components/tutorial'
import { Folder, FileCode, ArrowRight, Layers, Split } from 'lucide-react'

export default function Step6Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>高度なルーティング機能</h2>
        <p>
          Next.js App Routerには、基本的なファイルベースルーティング以外にも
          強力なルーティング機能があります。
          このステップでは、実践で使う高度なパターンを学びます。
        </p>
      </section>

      {/* Dynamic Routes */}
      <section>
        <h2>動的ルーティング詳細</h2>

        <h3 className="text-lg font-semibold mt-6 mb-3">単一パラメータ [param]</h3>
        <p>
          <code>[param]</code>は1つのセグメントをキャプチャします。
        </p>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/blog/<span className="text-purple-500">[slug]</span>/page.tsx</span>
            </div>
          </div>
          <div className="mt-3 text-gray-500">
            <p>/blog/hello → params.slug = &quot;hello&quot;</p>
            <p>/blog/my-post → params.slug = &quot;my-post&quot;</p>
          </div>
        </div>

        <CodeBlock
          code={`// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  return <h1>記事: {slug}</h1>
}`}
          filename="app/blog/[slug]/page.tsx"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">Catch-all [...param]</h3>
        <p>
          <code>[...param]</code>は複数のセグメントを配列としてキャプチャします。
        </p>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/shop/<span className="text-purple-500">[...slug]</span>/page.tsx</span>
            </div>
          </div>
          <div className="mt-3 text-gray-500">
            <p>/shop/a → params.slug = [&quot;a&quot;]</p>
            <p>/shop/a/b → params.slug = [&quot;a&quot;, &quot;b&quot;]</p>
            <p>/shop/a/b/c → params.slug = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</p>
          </div>
        </div>

        <CodeBlock
          code={`// app/shop/[...slug]/page.tsx
interface Props {
  params: Promise<{ slug: string[] }>
}

export default async function ShopPage({ params }: Props) {
  const { slug } = await params
  // slug = ["clothes", "tops", "t-shirts"]
  const category = slug.join(' > ')
  return <h1>カテゴリ: {category}</h1>
}`}
          filename="app/shop/[...slug]/page.tsx"
        />

        <h3 className="text-lg font-semibold mt-6 mb-3">Optional Catch-all [[...param]]</h3>
        <p>
          <code>[[...param]]</code>はオプショナルで、ルートパス自体にもマッチします。
        </p>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/docs/<span className="text-purple-500">[[...slug]]</span>/page.tsx</span>
            </div>
          </div>
          <div className="mt-3 text-gray-500">
            <p>/docs → params.slug = undefined</p>
            <p>/docs/intro → params.slug = [&quot;intro&quot;]</p>
            <p>/docs/intro/setup → params.slug = [&quot;intro&quot;, &quot;setup&quot;]</p>
          </div>
        </div>
      </section>

      {/* Route Groups */}
      <section>
        <h2>ルートグループ (group)</h2>

        <p>
          <code>(group)</code>でフォルダを括ると、URLに影響を与えずにファイルを整理できます。
          異なるレイアウトを持つセクションを分ける際に便利です。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500">(marketing)/</span>
                <span className="text-gray-400 text-xs">URLに含まれない</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>layout.tsx</span>
                  <span className="text-gray-400 text-xs">マーケ用レイアウト</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span>about/page.tsx</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">/about</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span>contact/page.tsx</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">/contact</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500">(app)/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>layout.tsx</span>
                  <span className="text-gray-400 text-xs">アプリ用レイアウト</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span>dashboard/page.tsx</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">/dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// app/(marketing)/layout.tsx
// マーケティングページ用のシンプルなレイアウト
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>シンプルなナビ</nav>
      <main>{children}</main>
      <footer>フッター</footer>
    </div>
  )
}

// app/(app)/layout.tsx
// アプリケーション用のダッシュボードレイアウト
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside>サイドバー</aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}`}
        />

        <Alert type="tip">
          ルートグループを使うと、同じルートレベルで異なるレイアウトを
          適用できます。マーケティングページとダッシュボードで
          完全に異なるUIを実現できます。
        </Alert>
      </section>

      {/* Parallel Routes */}
      <section>
        <h2>並列ルート @folder</h2>

        <p>
          <code>@folder</code>でスロットを定義し、同じURLで複数のコンポーネントを
          並行してレンダリングできます。ダッシュボードの複数パネルなどに便利です。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/dashboard/</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>layout.tsx</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>page.tsx</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-purple-500" />
                <span className="text-purple-500">@analytics/</span>
                <span className="text-gray-400 text-xs">スロット</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-purple-500" />
                <span className="text-purple-500">@team/</span>
                <span className="text-gray-400 text-xs">スロット</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-green-500" />
                  <span>page.tsx</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics, // @analytics スロット
  team,      // @team スロット
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  )
}

// app/dashboard/@analytics/page.tsx
export default function Analytics() {
  return <div>アナリティクスパネル</div>
}

// app/dashboard/@team/page.tsx
export default function Team() {
  return <div>チームパネル</div>
}`}
        />
      </section>

      {/* Intercepting Routes */}
      <section>
        <h2>インターセプトルート (..)</h2>

        <p>
          <code>(.)</code>や<code>(..)</code>で現在のルートをインターセプトし、
          モーダルなどで表示できます。Instagramの写真詳細のような体験を実現できます。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-500" />
                <span>photos/</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span>[id]/page.tsx</span>
                  <span className="text-gray-400 text-xs">通常の写真詳細ページ</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-red-500" />
                <span className="text-red-500">@modal/</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">(..)photos/[id]/page.tsx</span>
                  <span className="text-gray-400 text-xs">モーダル版</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alert type="info" title="インターセプトルートの記法">
          <ul className="text-sm space-y-1 mt-2">
            <li>• <code>(.)</code> - 同じレベル</li>
            <li>• <code>(..)</code> - 1つ上のレベル</li>
            <li>• <code>(..)(..)</code> - 2つ上のレベル</li>
            <li>• <code>(...)</code> - ルートから</li>
          </ul>
        </Alert>
      </section>

      {/* Private Folders */}
      <section>
        <h2>プライベートフォルダ _folder</h2>

        <p>
          <code>_folder</code>でフォルダを作ると、ルーティングから完全に除外されます。
          コンポーネントやユーティリティを整理するのに便利です。
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>app/</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">_components/</span>
                <span className="text-gray-400 text-xs">ルートにならない</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-gray-500" />
                  <span>Button.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-gray-500" />
                  <span>Card.tsx</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-green-500" />
                <span>page.tsx</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500">/</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={6}
        questions={[
          {
            question: '/blog/a/b/c にマッチする動的ルートは？',
            options: ['[slug]', '[...slug]', '[[slug]]', '(slug)'],
            correctIndex: 1,
            explanation: '[...slug]（Catch-all）は複数のセグメントを配列としてキャプチャします。params.slug = ["a", "b", "c"] となります。'
          },
          {
            question: 'URLに影響を与えずにレイアウトを分けるには？',
            options: ['[group]', '(group)', '@group', '_group'],
            correctIndex: 1,
            explanation: '(group)はルートグループで、URLに含まれません。異なるレイアウトを持つセクションを整理できます。'
          },
          {
            question: '並列ルートのスロットを定義する記法は？',
            options: ['[slot]', '(slot)', '@slot', '_slot'],
            correctIndex: 2,
            explanation: '@slotで並列ルートのスロットを定義します。layoutでpropsとして受け取り、複数のコンポーネントを同時にレンダリングできます。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          ルーティングの高度な機能を理解したら、次は<strong>データフェッチングパターン</strong>を学びましょう。
          Server ActionsやAPI Routesを使った効率的なデータ操作を習得します。
        </p>
      </section>
    </div>
  )
}
