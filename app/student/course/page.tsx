import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { mockModules } from '@/lib/mock/data';
import { redirect } from 'next/navigation';

export default async function StudentCoursePage() {
  const session = await getSession();
  
  if (!session || session.role !== 'student') {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  const course = {
    code: 'CS-401',
    name: '数据挖掘导论',
    instructor: '张教授',
    semester: '2024 秋季',
    progress: 35,
  };

  return (
    <div className="bg-page-bg text-text-main font-display overflow-x-hidden min-h-screen flex flex-col">
      <Header userName={user?.name} userLevel={user?.level || undefined} role="student" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <a className="text-text-secondary hover:text-primary transition-colors" href="#">首页</a>
          <span className="text-text-secondary material-symbols-outlined text-sm">chevron_right</span>
          <a className="text-text-secondary hover:text-primary transition-colors" href="#">我的课程</a>
          <span className="text-text-secondary material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-text-main font-medium">{course.name}</span>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl p-6 lg:p-8 relative overflow-hidden group shadow-lg shadow-blue-900/10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="lg:col-span-8 flex flex-col justify-between gap-6 z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 rounded bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{course.code}</span>
                <span className="px-2 py-1 rounded bg-green-400/20 text-green-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{course.semester}</span>
              </div>
              <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">{course.name}</h1>
              <p className="text-blue-100 text-base sm:text-lg">
                掌握从数据中提炼知识的艺术。<br className="hidden sm:block" />
                讲师：<span className="text-white font-medium">{course.instructor}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex justify-between items-end">
                <p className="text-white text-sm font-medium">课程进度</p>
                <p className="text-white text-sm font-bold">已完成 {course.progress}%</p>
              </div>
              <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: `${course.progress}%` }} />
              </div>
              <p className="text-blue-100 text-xs mt-1">下一节：<span className="text-white font-medium">决策树与熵</span></p>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end gap-4 z-10">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl h-14 px-8 bg-white hover:bg-blue-50 text-primary text-lg font-bold shadow-lg transition-all transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-[28px]">play_circle</span>
              <span>继续学习</span>
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-blue-800/40 border border-white/20 hover:bg-blue-800/60 text-white text-sm font-medium transition-colors backdrop-blur-md">
                <span className="material-symbols-outlined text-[20px]">download</span>
                课程大纲
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-blue-800/40 border border-white/20 hover:bg-blue-800/60 text-white text-sm font-medium transition-colors backdrop-blur-md">
                <span className="material-symbols-outlined text-[20px]">share</span>
                分享
              </button>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-text-main text-xl font-bold">课程模块</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white border border-border-light text-text-secondary hover:text-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 rounded-lg bg-primary text-white shadow-md shadow-blue-500/20">
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>

            {/* Module Cards */}
            {mockModules.map((module) => (
              <div
                key={module.id}
                className={`bg-surface-light rounded-xl p-0 overflow-hidden ${
                  module.status === 'in_progress'
                    ? 'border-2 border-primary shadow-lg shadow-blue-500/10'
                    : module.status === 'locked'
                    ? 'border border-border-light opacity-80'
                    : 'border border-border-light hover:border-blue-300 transition-colors shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-32 md:h-auto bg-slate-50 relative shrink-0 border-r border-border-light">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {module.status === 'completed' && (
                        <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
                      )}
                      {module.status === 'in_progress' && (
                        <button className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                          <span className="material-symbols-outlined text-primary text-3xl">play_arrow</span>
                        </button>
                      )}
                      {module.status === 'locked' && (
                        <span className="material-symbols-outlined text-slate-300 text-4xl">lock</span>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/80 backdrop-blur rounded text-xs font-mono text-slate-600 shadow-sm">
                      {module.week}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-center flex-1 gap-2">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-bold text-lg ${module.status === 'locked' ? 'text-slate-400' : 'text-text-main'}`}>
                        {module.title}
                      </h4>
                      <span
                        className={`text-xs font-bold uppercase border px-2 py-1 rounded ${
                          module.status === 'completed'
                            ? 'text-green-600 border-green-200 bg-green-50'
                            : module.status === 'in_progress'
                            ? 'text-primary border-primary/20 bg-blue-50'
                            : 'text-slate-400 border-slate-200 bg-slate-50'
                        }`}
                      >
                        {module.status === 'completed' ? '已完成' : module.status === 'in_progress' ? '进行中' : '未解锁'}
                      </span>
                    </div>
                    <p className={`text-sm line-clamp-2 ${module.status === 'locked' ? 'text-slate-400' : 'text-text-secondary'}`}>
                      {module.description}
                    </p>
                    {module.status === 'in_progress' && module.progress && (
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${module.progress}%` }} />
                      </div>
                    )}
                    {module.status === 'locked' ? (
                      <p className="text-xs text-slate-400 mt-1">完成模块{parseInt(module.id) - 1}后解锁</p>
                    ) : (
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <span className="material-symbols-outlined text-sm">movie</span>
                          {module.videoCount} 个视频
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <span className="material-symbols-outlined text-sm">quiz</span>
                          {module.quizCount} 次测验
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <span className="material-symbols-outlined text-sm">folder_open</span>
                          学习资料
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* AI Assistant Card */}
            <div className="bg-gradient-to-b from-blue-400 to-indigo-500 rounded-2xl p-[1px] shadow-lg shadow-blue-500/15">
              <div className="bg-white rounded-[15px] p-5 h-full flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center animate-pulse shadow-md">
                      <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                    </div>
                    <div>
                      <h4 className="text-text-main font-bold text-sm">AI 助教</h4>
                      <p className="text-xs text-text-secondary">在线 • 随时提供帮助</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 min-h-[100px] flex items-center justify-center text-center border border-slate-100">
                  <p className="text-text-secondary text-sm italic">"被熵的计算难住了？我可以为你生成一道练习题。"</p>
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white border border-border-light rounded-lg text-sm text-text-main px-3 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                    placeholder="输入问题..."
                    type="text"
                  />
                  <button className="bg-primary hover:bg-blue-600 text-white rounded-lg p-2 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Points Card */}
            <div className="bg-surface-light rounded-xl p-5 border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-text-main font-bold">积分评价</h4>
                <button className="text-primary text-xs font-bold hover:underline">查看详情</button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative size-16">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-yellow-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-text-main text-xs font-bold block">{user?.points || 850}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-secondary text-xs">总积分</span>
                  <span className="text-text-main font-bold text-lg">前 10%</span>
                  <span className="text-green-600 text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">trending_up</span> 本周 +50
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">视频互动</span>
                    <span className="text-text-main font-medium">高</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">测验正确率</span>
                    <span className="text-text-main font-medium">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <a className="bg-surface-light p-4 rounded-xl border border-border-light hover:bg-blue-50 hover:border-blue-200 transition-all group shadow-sm" href="/cases">
                <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-orange-500">library_books</span>
                </div>
                <p className="text-text-main font-bold text-sm">案例资源库</p>
                <p className="text-text-secondary text-xs">案例研究与数据集</p>
              </a>
              <a className="bg-surface-light p-4 rounded-xl border border-border-light hover:bg-blue-50 hover:border-blue-200 transition-all group shadow-sm" href="/student/dashboard">
                <div className="bg-cyan-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-cyan-600">analytics</span>
                </div>
                <p className="text-text-main font-bold text-sm">行为数据</p>
                <p className="text-text-secondary text-xs">行为模式分析</p>
              </a>
            </div>

            {/* Announcements */}
            <div className="bg-surface-light rounded-xl border border-border-light p-5 shadow-sm">
              <h4 className="text-text-main font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">campaign</span>
                公告通知
              </h4>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-3">
                  <p className="text-text-main text-sm font-medium">作业 1 截止</p>
                  <p className="text-text-secondary text-xs mt-1">明天, 23:59</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3">
                  <p className="text-text-main text-sm font-medium">新增案例研究</p>
                  <p className="text-text-secondary text-xs mt-1">零售购物篮分析</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
