import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || session.role !== 'student') redirect('/login');
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <Header userName={user?.name} userLevel={user?.level || undefined} role="student" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">个人设置</h1>
        <p className="text-text-secondary mb-8">管理您的账户信息和偏好设置</p>
        
        <div className="max-w-3xl">
          <div className="bg-white rounded-xl border border-border-light p-6 mb-6">
            <h2 className="text-xl font-bold text-text-main mb-4">基本信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">学号</label>
                <input
                  type="text"
                  value={user?.studentId}
                  disabled
                  className="w-full px-4 py-2 border border-border-light rounded-lg bg-slate-50 text-text-main"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">姓名</label>
                <input
                  type="text"
                  value={user?.name}
                  disabled
                  className="w-full px-4 py-2 border border-border-light rounded-lg bg-slate-50 text-text-main"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">邮箱</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  placeholder="请设置邮箱"
                  className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-6 mb-6">
            <h2 className="text-xl font-bold text-text-main mb-4">学习偏好</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-text-main">邮件通知</p>
                  <p className="text-sm text-text-secondary">接收课程更新和作业提醒</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-text-main">AI助手建议</p>
                  <p className="text-sm text-text-secondary">根据学习进度自动推荐内容</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20" />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-6">
            <h2 className="text-xl font-bold text-text-main mb-4">账户安全</h2>
            <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
              修改密码
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
