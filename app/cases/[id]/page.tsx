import { prisma } from '@/lib/prisma/client';
import { mockCases } from '@/lib/mock/data';
import Link from 'next/link';

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let caseItem = await prisma.case.findUnique({ where: { id } });
  
  if (!caseItem) {
    const mockCase = mockCases.find(c => c.id === id) || mockCases[0];
    caseItem = {
      ...mockCase,
      content: `
        <h2>案例背景</h2>
        <p>本案例展示了如何在真实业务场景中应用数据挖掘技术...</p>
        
        <h2>问题描述</h2>
        <p>企业面临的主要挑战是...</p>
        
        <h2>解决方案</h2>
        <p>我们采用了以下方法...</p>
        
        <h2>实施效果</h2>
        <p>通过数据挖掘技术的应用，实现了...</p>
      `,
      tags: mockCase.tags ? mockCase.tags.join(', ') : '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Parse tags if stored as JSON string
  let tags: string[] = [];
  try {
    tags = typeof caseItem.tags === 'string' ? JSON.parse(caseItem.tags) : [];
  } catch {
    tags = [];
  }

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-blue-100 bg-white/90 backdrop-blur-md px-4 sm:px-10 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/cases">
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </Link>
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="text-text-main text-lg font-bold">课程思政案例库</h2>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-border-light overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-8xl text-primary">cases</span>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              {caseItem.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                  {caseItem.category}
                </span>
              )}
              {caseItem.difficulty && (
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  caseItem.difficulty === '高级' ? 'bg-red-100 text-red-700' :
                  caseItem.difficulty === '中级' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {caseItem.difficulty}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-text-main mb-4">{caseItem.title}</h1>
            
            {caseItem.description && (
              <p className="text-lg text-text-secondary mb-6">{caseItem.description}</p>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: caseItem.content }} />
            </div>

            <div className="mt-8 pt-8 border-t border-border-light flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  {caseItem.views} 次浏览
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium">
                  收藏案例
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  下载资源
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
