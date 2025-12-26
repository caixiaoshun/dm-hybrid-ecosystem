import { prisma } from '@/lib/prisma/client';
import { mockCases } from '@/lib/mock/data';
import Link from 'next/link';

export default async function CasesPage() {
  const cases = await prisma.case.findMany({ take: 20 });
  const displayCases = cases.length > 0 ? cases : mockCases;

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-blue-100 bg-white/90 backdrop-blur-md px-4 sm:px-10 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="text-text-main text-lg font-bold">课程思政案例库</h2>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 text-primary hover:text-primary-dark font-medium">登录</button>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">课程思政案例库</h1>
          <p className="text-xl text-text-secondary">探索优质教学案例，提升教学质量</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCases.map((caseItem) => (
            <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
              <div className="bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">cases</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">{caseItem.category}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      caseItem.difficulty === '高级' ? 'bg-red-100 text-red-700' :
                      caseItem.difficulty === '中级' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {caseItem.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{caseItem.title}</h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{caseItem.description}</p>
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      {caseItem.views} 次浏览
                    </span>
                    <span className="text-primary font-medium">查看详情 →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
