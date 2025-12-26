'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeTerms) {
      setError('请阅读并同意用户协议和隐私政策');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: formData.studentId,
          name: formData.name,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '注册失败');
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 text-slate-900 min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
      <header className="w-full border-b border-blue-100/50 bg-white/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900">智教AI云</h2>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
          <span className="text-slate-500">已有账号？</span>
          <Link href="/login" className="text-primary hover:text-blue-700 transition-colors">立即登录</Link>
        </div>
      </header>
      <div className="flex-1 flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:flex flex-col gap-8 pr-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">AI 驱动教育未来</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight text-slate-900">
                开启您的<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">AI赋能学习之旅</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                构建 "案例资源 — 行为数据 — 积分评价 — 精准干预" 一体化支撑机制，为您提供个性化、智能化的学习体验。
              </p>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-blue-100 bg-white shadow-2xl shadow-blue-900/10">
              <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaYBKT0lS4FxFSfmIZYmVCEY7Pt6S3rOkd6uuEO1Uw_9PHhHJ_HcsDvtaF2hgw1lAX6Med609opdFLsYwBIDMZ1-rXc1-07RYogH8Vn_tNqGjnuCI2BRnrjtJxlrPAYcVJWIIgOhqY4PXJZ2HFQ4SycYFd7sndHP3_2Igi0EOrLBRWiPmrKdgToe3cd1RlU749z271W-0uw8Msf1SKRmAZ5RWwuLbjMmKeXrQbbNh06qcF_5GkJh3DtthFy9dRy9z2kDgZjl6IMWQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#eff6ff] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 p-4 rounded-lg bg-white/80 backdrop-blur-md border border-white/50 text-slate-900 shadow-sm">
                <div className="bg-primary rounded-full p-2 flex items-center justify-center shadow-md shadow-blue-500/30">
                  <span className="material-symbols-outlined text-white">analytics</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">精准干预模型</p>
                  <p className="text-xs text-slate-500">实时分析学习行为数据</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[520px] mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-blue-50 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl font-bold text-slate-900">创建新账号</h2>
                <p className="text-slate-500 text-sm">填写以下信息以注册智教AI云平台。</p>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">用户名</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-12"
                      placeholder="请输入用户名"
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      required
                    />
                    <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">电子邮箱</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-12"
                      placeholder="example@email.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">设置密码</label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-12"
                        placeholder="请输入密码"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                      </div>
                      <button
                        className="absolute right-3.5 text-slate-400 hover:text-primary transition-colors flex items-center cursor-pointer"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">确认密码</label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-12"
                        placeholder="再次输入密码"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-gray-50"
                      id="terms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    />
                  </div>
                  <label className="text-sm text-slate-500 leading-tight" htmlFor="terms">
                    我已阅读并同意 <a className="text-primary hover:underline font-medium" href="#">用户协议</a> 和 <a className="text-primary hover:underline font-medium" href="#">隐私政策</a>
                  </label>
                </div>
                <button
                  className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-blue-700 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/30"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? '注册中...' : '立即注册'}
                </button>
                <div className="sm:hidden mt-4 text-center text-sm text-slate-500">
                  已有账号？ <Link href="/login" className="text-primary font-medium">去登录</Link>
                </div>
              </form>
            </div>
            <div className="mt-8 flex justify-center gap-6 text-sm text-slate-400">
              <a className="hover:text-primary transition-colors" href="#">帮助中心</a>
              <a className="hover:text-primary transition-colors" href="#">关于我们</a>
              <a className="hover:text-primary transition-colors" href="#">版权声明</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
