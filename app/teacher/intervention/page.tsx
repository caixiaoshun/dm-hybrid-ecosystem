import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { redirect } from 'next/navigation';

export default async function TeacherInterventionPage() {
  const session = await getSession();
  if (!session || session.role !== 'teacher') redirect('/login');
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  const interventions = [
    { id: '1', title: '作业1：数据预处理', deadline: '2024-12-30', submitted: 25, total: 30, status: '进行中' },
    { id: '2', title: '作业2：决策树实现', deadline: '2025-01-05', submitted: 18, total: 30, status: '进行中' },
    { id: '3', title: '作业3：关联规则挖掘', deadline: '2025-01-12', submitted: 0, total: 30, status: '未开始' },
  ];

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <Header userName={user?.name} role="teacher" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">作业与干预</h1>
        <p className="text-text-secondary mb-8">管理作业并进行学习干预</p>
        
        <div className="mb-6">
          <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              创建新作业
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {interventions.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-border-light p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-main mb-2">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      截止日期: {item.deadline}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === '进行中' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <button className="text-primary hover:text-primary-dark">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">提交进度</span>
                  <span className="font-medium text-text-main">{item.submitted} / {item.total}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(item.submitted / item.total) * 100}%` }} />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm">
                  查看提交
                </button>
                <button className="px-4 py-2 bg-slate-100 text-text-main rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
                  发送提醒
                </button>
                <button className="px-4 py-2 bg-slate-100 text-text-main rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
                  批量评分
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
