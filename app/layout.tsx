import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "混合式教学平台",
  description: "智慧教育平台 - 混合式教学生态系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
