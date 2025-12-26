'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是你的AI助教，有什么我可以帮助你的吗？你可以问我关于课程的任何问题。',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply + (data.usingMock ? ' (使用模拟回复)' : ''),
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我遇到了一些问题。请稍后再试。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-main text-text-main font-display antialiased overflow-hidden h-screen flex">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-border-light bg-surface-white h-full shadow-sm z-10">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-white text-[20px]">school</span>
            </div>
            <h1 className="text-text-main text-lg font-bold tracking-tight">智慧教育平台</h1>
          </div>
          <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-primary hover:bg-primary-hover transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20 group">
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
            <span>新对话</span>
          </button>
        </div>
        <div className="px-4 py-2 flex flex-col gap-1">
          <Link href="/student/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-active transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="text-sm font-medium">仪表盘</span>
          </Link>
          <Link href="/student/course" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-active transition-colors">
            <span className="material-symbols-outlined text-[20px]">library_books</span>
            <span className="text-sm font-medium">我的课程</span>
          </Link>
          <Link href="/student/ai" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-active text-primary shadow-sm ring-1 ring-primary/10">
            <span className="material-symbols-outlined text-[20px] fill-current">smart_toy</span>
            <span className="text-sm font-medium">AI 助手</span>
          </Link>
        </div>
        <div className="h-px bg-border-light mx-6 my-2" />
        <div className="px-4 py-2">
          <div className="relative group/search">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within/search:text-primary text-[20px]">search</span>
            </div>
            <input className="block w-full rounded-lg border-none bg-surface-active py-2.5 pl-10 pr-3 text-sm text-text-main placeholder-text-secondary focus:ring-1 focus:ring-primary focus:bg-white transition-all" placeholder="搜索对话..." type="text" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">今天</h3>
            <button className="flex items-center gap-3 px-3 py-3 rounded-lg bg-surface-active/60 hover:bg-surface-active transition-colors w-full text-left group">
              <span className="material-symbols-outlined text-primary text-[20px]">chat_bubble_outline</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-main truncate">当前对话</p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-background-main relative">
        <header className="flex-shrink-0 h-16 border-b border-border-light flex items-center justify-between px-8 bg-surface-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-2.5 rounded-full bg-green-500 absolute top-0 right-0 border-2 border-surface-white" />
              <span className="material-symbols-outlined text-primary text-[28px]">smart_toy</span>
            </div>
            <div>
              <h2 className="text-text-main text-base font-bold leading-none">EduBot 助手</h2>
              <span className="text-xs text-green-600 font-medium">在线 • 个性化学习</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-surface-active rounded-lg transition-colors" title="历史记录">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
            <Link href="/student/settings">
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-surface-active rounded-lg transition-colors" title="设置">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </Link>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scroll-smooth">
          <div className="flex justify-center">
            <span className="text-xs font-medium text-text-secondary bg-surface-active border border-border-light px-3 py-1 rounded-full">
              今天, {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 max-w-3xl message-anim ${
                message.role === 'user' ? 'flex-row-reverse ml-auto' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                message.role === 'assistant'
                  ? 'bg-primary/10 border border-primary/20 shadow-sm'
                  : 'bg-primary text-white shadow-md shadow-blue-500/20'
              }`}>
                <span className="material-symbols-outlined text-[20px]">
                  {message.role === 'assistant' ? 'smart_toy' : 'person'}
                </span>
              </div>
              <div className={`flex flex-col gap-2 flex-1 ${message.role === 'user' ? 'items-end' : ''}`}>
                <div className="flex items-baseline gap-2">
                  {message.role === 'user' && <span className="text-xs text-text-secondary">{message.timestamp}</span>}
                  <span className="text-sm font-bold text-text-main">
                    {message.role === 'assistant' ? 'EduBot' : '你'}
                  </span>
                  {message.role === 'assistant' && <span className="text-xs text-text-secondary">{message.timestamp}</span>}
                </div>
                <div className={`p-4 rounded-2xl leading-relaxed ${
                  message.role === 'assistant'
                    ? 'bg-surface-white text-text-main/90 rounded-tl-none border border-border-light shadow-sm'
                    : 'bg-primary text-white rounded-tr-none shadow-md shadow-blue-500/20'
                }`}>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 max-w-3xl message-anim">
              <div className="flex-shrink-0 size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-text-main">EduBot</span>
                  <span className="text-xs text-text-secondary">正在输入...</span>
                </div>
                <div className="bg-surface-white text-text-main/90 p-4 rounded-2xl rounded-tl-none border border-border-light shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-border-light p-4 sm:p-6 bg-surface-white/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white border border-border-light rounded-2xl p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-text-main placeholder-text-secondary px-3 text-base"
                placeholder="输入消息..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
              />
              <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span className="hidden sm:inline">发送</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
