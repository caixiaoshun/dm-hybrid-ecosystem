'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  userName?: string;
  userLevel?: string;
  role?: 'student' | 'teacher';
}

export default function Header({ userName = '用户', userLevel, role = 'student' }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-blue-100 bg-white/90 backdrop-blur-md px-4 sm:px-10 py-3 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em]">智教 AI</h2>
        </div>
        <div className="hidden md:flex items-center gap-9">
          {role === 'student' ? (
            <>
              <Link href="/student/course" className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors">
                我的课程
              </Link>
              <Link href="/student/resources" className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors">
                资源库
              </Link>
              <Link href="/student/dashboard" className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors">
                学习数据
              </Link>
              <Link href="/student/ai" className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors">
                AI助手
              </Link>
            </>
          ) : (
            <>
              <Link href="/teacher/behavior" className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors">
                学生行为
              </Link>
              <Link href="/teacher/intervention" className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors">
                作业干预
              </Link>
            </>
          )}
          <Link href="/cases" className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors">
            案例库
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-4 sm:gap-8">
        <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-light bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="text-text-secondary flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
              placeholder="搜索资源..."
            />
          </div>
        </label>
        <div className="flex gap-2">
          <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 hover:bg-blue-50 text-text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <Link href={role === 'student' ? '/student/settings' : '#'}>
            <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 hover:bg-blue-50 text-text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-text-main">{userName}</p>
            {userLevel && <p className="text-xs text-primary">{userLevel}</p>}
          </div>
          <div className="relative group">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer">
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {userName.charAt(0)}
              </div>
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
