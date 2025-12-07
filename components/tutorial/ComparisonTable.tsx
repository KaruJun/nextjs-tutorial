interface ComparisonRow {
  concept: string
  laravel: string
  nextjs: string
}

interface ComparisonTableProps {
  title?: string
  rows: ComparisonRow[]
}

export function ComparisonTable({ title, rows }: ComparisonTableProps) {
  return (
    <div className="my-6">
      {title && (
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          {title}
        </h4>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold border border-gray-200 dark:border-gray-700">
                概念
              </th>
              <th className="px-4 py-3 text-left font-semibold border border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-2">
                  <span className="text-red-500">🔴</span> Laravel
                </span>
              </th>
              <th className="px-4 py-3 text-left font-semibold border border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-2">
                  <span className="text-black dark:text-white">▲</span> Next.js
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}
              >
                <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 font-medium">
                  {row.concept}
                </td>
                <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 font-mono text-sm">
                  {row.laravel}
                </td>
                <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 font-mono text-sm">
                  {row.nextjs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
