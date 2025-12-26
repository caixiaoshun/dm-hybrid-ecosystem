import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'student') redirect('/login');
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <Header userName={user?.name} userLevel={user?.level || undefined} role="student" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">学习行为与积分仪表盘</h1>
        <p className="text-text-secondary mb-8">跟踪您的学习进度和成就</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-border-light p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-blue-500 text-3xl">school</span>
              <div>
                <p className="text-text-secondary text-sm">总积分</p>
                <p className="text-2xl font-bold text-text-main">{user?.points || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-green-500 text-3xl">trending_up</span>
              <div>
                <p className="text-text-secondary text-sm">本周增长</p>
                <p className="text-2xl font-bold text-green-600">+50</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-purple-500 text-3xl">quiz</span>
              <div>
                <p className="text-text-secondary text-sm">测验正确率</p>
                <p className="text-2xl font-bold text-text-main">92%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-orange-500 text-3xl">workspace_premium</span>
              <div>
                <p className="text-text-secondary text-sm">排名</p>
                <p className="text-2xl font-bold text-text-main">前 10%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border-light p-6">
            <h2 className="text-xl font-bold text-text-main mb-4">学习时长统计</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>视频学习</span>
                  <span className="font-medium">12.5 小时</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>在线测验</span>
                  <span className="font-medium">8.3 小时</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>讨论参与</span>
                  <span className="font-medium">5.2 小时</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '31%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-6">
            <h2 className="text-xl font-bold text-text-main mb-4">最近活动</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="material-symbols-outlined text-blue-600">video_library</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-main">完成视频学习</p>
                  <p className="text-xs text-text-secondary">模块二：分类算法 • 2小时前</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="material-symbols-outlined text-green-600">quiz</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-main">完成测验</p>
                  <p className="text-xs text-text-secondary">决策树算法测验 • 得分: 92% • 5小时前</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="material-symbols-outlined text-purple-600">forum</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-main">参与讨论</p>
                  <p className="text-xs text-text-secondary">关于Apriori算法的讨论 • 1天前</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
