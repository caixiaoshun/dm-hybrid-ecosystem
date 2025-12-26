const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.chatHistory.deleteMany();
  await prisma.case.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const studentPassword = await bcrypt.hash('123456', 10);
  const teacherPassword = await bcrypt.hash('123456', 10);

  const student = await prisma.user.create({
    data: {
      studentId: '20210001',
      name: '陈艾力',
      password: studentPassword,
      role: 'student',
      email: 'student@example.com',
      level: '4级学者',
      points: 850,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      studentId: 'T001',
      name: '张教授',
      password: teacherPassword,
      role: 'teacher',
      email: 'teacher@example.com',
    },
  });

  console.log('Created users:', { student: student.studentId, teacher: teacher.studentId });

  // Create courses
  await prisma.course.createMany({
    data: [
      {
        code: 'CS-401',
        name: '数据挖掘导论',
        description: '掌握从数据中提炼知识的艺术',
        instructor: '张教授',
        semester: '2024 秋季',
        progress: 35,
      },
      {
        code: 'CS-301',
        name: '机器学习基础',
        description: '探索人工智能的核心技术',
        instructor: '李教授',
        semester: '2024 秋季',
        progress: 60,
      },
    ],
  });

  console.log('Created courses');

  // Create resources
  await prisma.resource.createMany({
    data: [
      {
        title: '数据预处理技术',
        description: '数据清洗、集成与变换方法',
        type: 'video',
        courseId: null,
        duration: '45分钟',
      },
      {
        title: '决策树算法详解',
        description: 'ID3、C4.5和CART算法原理',
        type: 'document',
        courseId: null,
        duration: '20页',
      },
      {
        title: '关联规则挖掘实践',
        description: 'Apriori算法与FP-Growth算法',
        type: 'video',
        courseId: null,
        duration: '60分钟',
      },
    ],
  });

  console.log('Created resources');

  // Create cases
  await prisma.case.createMany({
    data: [
      {
        title: '零售购物篮分析案例',
        description: '使用关联规则挖掘分析超市购物数据',
        content: '本案例展示如何使用Apriori算法分析超市购物篮数据，发现商品之间的关联规则...',
        category: '关联分析',
        tags: JSON.stringify(['关联规则', '零售', '数据挖掘']),
        difficulty: '中级',
        views: 1250,
      },
      {
        title: '客户流失预测模型',
        description: '使用分类算法预测电信客户流失',
        content: '本案例使用决策树和随机森林算法构建客户流失预测模型...',
        category: '分类预测',
        tags: JSON.stringify(['分类', '预测', '客户管理']),
        difficulty: '高级',
        views: 890,
      },
      {
        title: '社交网络社区发现',
        description: '基于图算法的社区检测',
        content: '本案例介绍如何使用聚类算法在社交网络中发现社区结构...',
        category: '聚类分析',
        tags: JSON.stringify(['聚类', '社交网络', '图算法']),
        difficulty: '高级',
        views: 670,
      },
    ],
  });

  console.log('Created cases');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
