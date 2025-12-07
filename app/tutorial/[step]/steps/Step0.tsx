'use client'

import { CodeBlock, Alert, ComparisonTable, Quiz } from '@/components/tutorial'
import { ArrowRight, Globe, Server, Smartphone } from 'lucide-react'

export default function Step0Content() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2>Next.jsとは？</h2>
        <p>
          Next.jsは、<strong>Reactをベースにしたフルスタックフレームワーク</strong>です。
          単なるReactのラッパーではなく、サーバーサイドレンダリング、ルーティング、
          データフェッチングなどの機能を統合的に提供します。
        </p>

        <Alert type="tip" title="Laravelエンジニアへ">
          LaravelでいうところのBladeテンプレート＋ルーティング＋コントローラーを、
          Reactコンポーネントで統一的に扱えるようになったと考えてください。
        </Alert>
      </section>

      {/* React vs Next.js */}
      <section>
        <h2>ReactとNext.jsの違い</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Smartphone className="w-5 h-5 text-blue-500" />
              React（素の状態）
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• クライアントサイドのみで動作</li>
              <li>• ルーティングは別途ライブラリが必要</li>
              <li>• SEOに弱い（初期HTMLが空）</li>
              <li>• ビルド設定を自分で行う必要あり</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Globe className="w-5 h-5 text-green-500" />
              Next.js
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• サーバーサイド＋クライアントサイド</li>
              <li>• ファイルベースルーティング内蔵</li>
              <li>• SEOに強い（サーバーでHTML生成）</li>
              <li>• ゼロコンフィグで本番環境対応</li>
            </ul>
          </div>
        </div>

        <Alert type="info" title="重要な違い">
          Reactは「UIライブラリ」、Next.jsは「フレームワーク」です。
          LaravelがPHPのフレームワークであるように、Next.jsはReactのフレームワークです。
        </Alert>
      </section>

      {/* Why Next.js */}
      <section>
        <h2>なぜNext.jsを使うのか？</h2>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl">🚀</div>
            <div>
              <h4 className="font-semibold">パフォーマンス</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                サーバーサイドレンダリングにより初期表示が高速。
                自動コード分割でバンドルサイズを最適化。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl">🔍</div>
            <div>
              <h4 className="font-semibold">SEO対策</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                サーバーで完全なHTMLを生成するため、
                検索エンジンがコンテンツを正しく認識できる。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl">🛠</div>
            <div>
              <h4 className="font-semibold">開発体験</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ファイルベースルーティング、ホットリロード、TypeScriptサポートなど
                開発に必要な機能が標準装備。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl">☁️</div>
            <div>
              <h4 className="font-semibold">デプロイの簡単さ</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vercel、AWS、Docker等、様々な環境に簡単にデプロイ可能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pages Router vs App Router */}
      <section>
        <h2>Pages Router vs App Router</h2>

        <p>
          Next.jsには2つのルーティングシステムがあります。
          <strong>このチュートリアルではApp Router</strong>を使用します。
        </p>

        <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">歴史的背景</h4>
          <div className="text-sm space-y-2">
            <p>
              <strong>Pages Router（2016年〜）</strong>: Next.jsの初期からあるルーティング。
              <code className="px-1 bg-gray-100 dark:bg-gray-800 rounded">pages/</code>ディレクトリを使用。
            </p>
            <p>
              <strong>App Router（2023年〜）</strong>: Next.js 13で導入された新しいルーティング。
              <code className="px-1 bg-gray-100 dark:bg-gray-800 rounded">app/</code>ディレクトリを使用。
              React Server Componentsに対応。
            </p>
          </div>
        </div>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">特徴</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Pages Router</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">App Router ✅</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ディレクトリ</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">pages/</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">app/</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Server Components</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">❌</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">✅</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">レイアウト</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">_app.tsx のみ</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">ネストされたレイアウト</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">データフェッチ</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">getServerSideProps等</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">async/await コンポーネント</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">推奨</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">レガシー</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-semibold text-green-600 dark:text-green-400">推奨</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert type="warning" title="ネット記事を読むときの注意">
          古い記事ではPages Routerの書き方が紹介されていることが多いです。
          <code className="px-1 bg-gray-100 dark:bg-gray-800 rounded">getServerSideProps</code>や
          <code className="px-1 bg-gray-100 dark:bg-gray-800 rounded">pages/</code>ディレクトリが
          出てきたらPages Routerの記事です。App Routerでは使いません。
        </Alert>
      </section>

      {/* SPA vs SSR */}
      <section>
        <h2>従来のSPAとの比較</h2>

        <p>
          従来のReact SPA（シングルページアプリケーション）と
          Next.jsの動作の違いを図解で見てみましょう。
        </p>

        {/* Traditional SPA Flow */}
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-4">従来のSPA（React単体）</h4>
          <div className="flex items-center justify-between text-sm overflow-x-auto">
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[100px]">
              <div className="text-2xl mb-1">👤</div>
              <div>ブラウザ</div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[120px]">
              <div className="text-2xl mb-1">📄</div>
              <div>空のHTML</div>
              <div className="text-xs text-gray-500">+大きなJS</div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[100px]">
              <div className="text-2xl mb-1">⚙️</div>
              <div>JS実行</div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[100px]">
              <div className="text-2xl mb-1">🎨</div>
              <div>画面表示</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            ⚠️ JSが実行されるまで画面が真っ白（SEOに不利）
          </p>
        </div>

        {/* Next.js SSR Flow */}
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold mb-4">Next.js（サーバーサイドレンダリング）</h4>
          <div className="flex items-center justify-between text-sm overflow-x-auto">
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[100px]">
              <div className="text-2xl mb-1">👤</div>
              <div>ブラウザ</div>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-blue-100 dark:bg-blue-800 rounded border border-blue-300 min-w-[120px]">
              <div className="text-2xl mb-1">🖥️</div>
              <div>サーバー</div>
              <div className="text-xs text-blue-600 dark:text-blue-300">HTML生成</div>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[120px]">
              <div className="text-2xl mb-1">📄</div>
              <div>完全なHTML</div>
              <div className="text-xs text-gray-500">+小さなJS</div>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-400 shrink-0 mx-2" />
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border min-w-[100px]">
              <div className="text-2xl mb-1">🎨</div>
              <div>即座に表示</div>
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-3 text-center">
            ✅ HTMLがすぐ表示される（SEOに有利、表示速度が速い）
          </p>
        </div>
      </section>

      {/* Laravel Comparison */}
      <ComparisonTable
        title="LaravelとNext.jsの対比"
        rows={[
          { concept: 'ルーティング', laravel: 'routes/web.php', nextjs: 'app/ディレクトリ構造' },
          { concept: 'テンプレート', laravel: 'Blade (.blade.php)', nextjs: 'React (JSX/TSX)' },
          { concept: 'サーバー処理', laravel: 'Controller', nextjs: 'Server Component' },
          { concept: 'API', laravel: 'routes/api.php', nextjs: 'app/api/route.ts' },
          { concept: 'ミドルウェア', laravel: 'app/Http/Middleware', nextjs: 'middleware.ts' },
          { concept: '状態管理', laravel: 'Session', nextjs: 'React State / Cookie' },
        ]}
      />

      {/* Key Concepts Preview */}
      <section>
        <h2>これから学ぶ重要な概念</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">
              React Server Components (RSC)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              サーバーでのみ実行されるコンポーネント。
              DBアクセスやAPIキーを安全に使える。
            </p>
          </div>

          <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
            <h4 className="font-semibold text-green-700 dark:text-green-300">
              Client Components
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ブラウザで実行されるコンポーネント。
              useState、イベントハンドラを使う場合に必要。
            </p>
          </div>

          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300">
              ハイドレーション
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              サーバーで生成したHTMLに、クライアントでインタラクティブ性を付与する処理。
            </p>
          </div>

          <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300">
              Server Actions
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              フォーム送信をサーバーサイドで直接処理する機能。
              API Routeを書かずにDBを更新できる。
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <Quiz
        stepId={0}
        questions={[
          {
            question: 'Next.jsは何のフレームワークですか？',
            options: ['Vue.js', 'React', 'Angular', 'Svelte'],
            correctIndex: 1,
            explanation: 'Next.jsはReactをベースにしたフルスタックフレームワークです。ReactのコンポーネントをそのままNext.jsで使用できます。'
          },
          {
            question: 'App Routerで使用するディレクトリはどれですか？',
            options: ['pages/', 'src/', 'app/', 'routes/'],
            correctIndex: 2,
            explanation: 'App Routerではapp/ディレクトリを使用します。pages/はPages Router（レガシー）で使用するディレクトリです。'
          },
          {
            question: 'Next.jsがSEOに強い理由は？',
            options: [
              'JavaScriptを使わないから',
              'サーバーで完全なHTMLを生成するから',
              '検索エンジン専用のページを作るから',
              'CSSが軽量だから'
            ],
            correctIndex: 1,
            explanation: 'Next.jsはサーバーサイドレンダリングにより、完全なHTMLをサーバーで生成します。これにより検索エンジンがコンテンツを正しく認識できます。'
          }
        ]}
      />

      {/* Next Steps */}
      <section>
        <h2>次のステップ</h2>
        <p>
          基本的な概念を理解したら、次はプロジェクトの構造を見ていきましょう。
          <code className="px-1 bg-gray-100 dark:bg-gray-800 rounded">app/</code>
          ディレクトリの中身と、ファイルベースルーティングの仕組みを学びます。
        </p>
      </section>
    </div>
  )
}
