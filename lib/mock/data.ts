export const mockCourses = [
  {
    id: '1',
    code: 'CS-401',
    name: '数据挖掘导论',
    description: '掌握从数据中提炼知识的艺术',
    instructor: '张教授',
    semester: '2024 秋季',
    progress: 35,
  },
  {
    id: '2',
    code: 'CS-301',
    name: '机器学习基础',
    description: '探索人工智能的核心技术',
    instructor: '李教授',
    semester: '2024 秋季',
    progress: 60,
  },
];

export const mockModules = [
  {
    id: '1',
    title: '模块一：数据预处理',
    description: '理解数据类型、数据质量、数据清洗（处理缺失值、噪声数据）以及数据集成。',
    status: 'completed',
    week: '第 1-2 周',
    videoCount: 5,
    quizCount: 1,
  },
  {
    id: '2',
    title: '模块二：分类算法',
    description: '决策树归纳、贝叶斯分类方法、基于规则的分类。',
    status: 'in_progress',
    week: '第 3-4 周',
    progress: 45,
    videoCount: 6,
    quizCount: 2,
  },
  {
    id: '3',
    title: '模块三：关联分析',
    description: '频繁项集挖掘方法、Apriori 算法、生成关联规则。',
    status: 'locked',
    week: '第 5-6 周',
    videoCount: 4,
    quizCount: 1,
  },
];

export const mockResources = [
  {
    id: '1',
    title: '数据预处理技术',
    description: '数据清洗、集成与变换方法',
    type: 'video',
    duration: '45分钟',
    thumbnail: '',
  },
  {
    id: '2',
    title: '决策树算法详解',
    description: 'ID3、C4.5和CART算法原理',
    type: 'document',
    duration: '20页',
    thumbnail: '',
  },
  {
    id: '3',
    title: '关联规则挖掘实践',
    description: 'Apriori算法与FP-Growth算法',
    type: 'video',
    duration: '60分钟',
    thumbnail: '',
  },
  {
    id: '4',
    title: 'Python数据挖掘库介绍',
    description: 'NumPy, Pandas, Scikit-learn使用指南',
    type: 'document',
    duration: '30页',
    thumbnail: '',
  },
];

export const mockCases = [
  {
    id: '1',
    title: '零售购物篮分析案例',
    description: '使用关联规则挖掘分析超市购物数据',
    category: '关联分析',
    tags: ['关联规则', '零售', '数据挖掘'],
    difficulty: '中级',
    views: 1250,
  },
  {
    id: '2',
    title: '客户流失预测模型',
    description: '使用分类算法预测电信客户流失',
    category: '分类预测',
    tags: ['分类', '预测', '客户管理'],
    difficulty: '高级',
    views: 890,
  },
  {
    id: '3',
    title: '社交网络社区发现',
    description: '基于图算法的社区检测',
    category: '聚类分析',
    tags: ['聚类', '社交网络', '图算法'],
    difficulty: '高级',
    views: 670,
  },
];

export const mockBehaviorData = [
  {
    id: '1',
    studentId: '20210001',
    studentName: '陈艾力',
    loginCount: 42,
    videoProgress: 85,
    quizScore: 92,
    interactionLevel: '高',
    lastActive: '2小时前',
  },
  {
    id: '2',
    studentId: '20210002',
    studentName: '李明',
    loginCount: 38,
    videoProgress: 75,
    quizScore: 88,
    interactionLevel: '中',
    lastActive: '1天前',
  },
  {
    id: '3',
    studentId: '20210003',
    studentName: '王芳',
    loginCount: 15,
    videoProgress: 40,
    quizScore: 65,
    interactionLevel: '低',
    lastActive: '3天前',
  },
];
