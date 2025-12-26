'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: formData.studentId,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '登录失败');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (data.user.role === 'student') {
        router.push('/student/course');
      } else if (data.user.role === 'teacher') {
        router.push('/teacher/behavior');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 selection:text-primary bg-background-light font-display text-text-main antialiased">
      <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 lg:px-10 py-3 z-20 shadow-sm">
        <div className="flex items-center gap-4 text-slate-800">
          <div className="size-6 text-primary">
            <svg className="w-full h-full text-current" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">混合式教学平台</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm hidden sm:block">还没有账号？</span>
          <Link href="/register">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">注册</span>
            </button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 relative w-full bg-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-white" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          <div className="hidden md:flex md:w-5/12 relative flex-col justify-between p-10 bg-gradient-to-br from-primary to-blue-600">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50 via-transparent to-blue-900/60" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-6 border border-white/20 shadow-lg">
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">赋能教育创新</h3>
              <p className="text-blue-50 text-sm leading-relaxed opacity-90 font-medium">
                依托现代教育技术与生成式 AI，构建 "案例资源 — 行为数据 — 积分评价 — 精准干预" 一体化支撑机制。
              </p>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-xs text-blue-100">
                  <span className="text-white font-bold">5,000+</span> 师生正在使用
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight mb-2">欢迎回来</h1>
                <p className="text-slate-500 text-sm font-normal">请输入您的账号信息以登录混合式教学平台</p>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 text-base font-medium leading-normal">学号</label>
                  <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 focus:outline-0 focus:ring-0 border border-slate-300 bg-white border-r-0 h-12 px-4 placeholder:text-slate-400 text-base font-normal leading-normal transition-colors"
                      placeholder="请输入学号"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      required
                    />
                    <div className="text-slate-400 flex border border-slate-300 bg-slate-50 items-center justify-center px-4 rounded-r-lg border-l-0">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 text-base font-medium leading-normal">密码</label>
                  </div>
                  <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 focus:outline-0 focus:ring-0 border border-slate-300 bg-white border-r-0 h-12 px-4 placeholder:text-slate-400 text-base font-normal leading-normal transition-colors"
                      placeholder="••••••••"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <div className="text-slate-400 hover:text-slate-600 cursor-pointer flex border border-slate-300 bg-slate-50 items-center justify-center px-4 rounded-r-lg border-l-0 transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <label className="flex gap-x-3 items-center cursor-pointer group">
                    <input
                      className="custom-checkbox h-5 w-5 rounded border-slate-300 border-2 bg-white text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:border-primary focus:outline-none transition-colors shadow-sm"
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    />
                    <span className="text-slate-600 group-hover:text-slate-800 text-sm font-normal leading-normal transition-colors">记住我</span>
                  </label>
                  <a className="text-sm font-medium text-primary hover:text-primary-dark transition-colors" href="#">忘记密码？</a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-primary-dark text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md shadow-blue-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">{loading ? '登录中...' : '立即登录'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 text-center w-full pointer-events-none">
          <p className="text-slate-400 text-xs">© 2024 混合式教学平台 v2.0 | All Rights Reserved</p>
        </div>
      </main>
    </div>
  );
}
