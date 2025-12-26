import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma/client';
import Header from '@/components/layout/Header';
import { mockResources } from '@/lib/mock/data';
import { redirect } from 'next/navigation';

export default async function ResourcesPage() {
  const session = await getSession();
  if (!session || session.role !== 'student') redirect('/login');
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const resources = await prisma.resource.findMany({ take: 20 });
  const displayResources = resources.length > 0 ? resources : mockResources;

  return (
    <div className="bg-page-bg min-h-screen flex flex-col">
      <Header userName={user?.name} userLevel={user?.level || undefined} role="student" />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">线上资源库</h1>
        <p className="text-text-secondary mb-8">浏览和学习课程相关资源</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl border border-border-light p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-3 rounded-lg ${resource.type === 'video' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  <span className="material-symbols-outlined text-2xl">
                    {resource.type === 'video' ? 'play_circle' : 'description'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-main">{resource.title}</h3>
                  <p className="text-sm text-text-secondary">{resource.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{resource.duration}</span>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">查看</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
