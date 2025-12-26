import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { mockBehaviorData } from '@/lib/mock/data';
import { redirect } from 'next/navigation';

export default async function TeacherBehaviorPage() {
  const session = await getSession();
  if (!session || session.role !== 'teacher') redirect('/login');
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <Header userName={user?.name} role="teacher" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">学生行为数据</h1>
        <p className="text-text-secondary mb-8">分析学生学习行为和互动情况</p>
        
        <div className="bg-white rounded-xl border border-border-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">学号</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">姓名</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">登录次数</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">视频进度</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">测验得分</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">互动水平</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">最近活跃</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockBehaviorData.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-4 text-sm text-text-main">{student.studentId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-text-main">{student.studentName}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{student.loginCount}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${student.videoProgress}%` }} />
                        </div>
                        <span className="text-text-secondary">{student.videoProgress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{student.quizScore}%</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.interactionLevel === '高' ? 'bg-green-100 text-green-700' :
                        student.interactionLevel === '中' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.interactionLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{student.lastActive}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary hover:text-primary-dark font-medium">查看详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
