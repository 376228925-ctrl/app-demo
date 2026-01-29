
import { Restaurant, Coupon } from '../types';

export const CATEGORIES = [
  { id: '1', name: '美食', icon: '🍔' },
  { id: '2', name: '甜点饮品', icon: '🥤' },
  { id: '3', name: '超市便利', icon: '🏪' },
  { id: '4', name: '蔬果生鲜', icon: '🥬' },
  { id: '5', name: '大牌午餐', icon: '🍱' },
  { id: '6', name: '炸鸡牛奶', icon: '🍗' },
  { id: '7', name: '汉堡薯条', icon: '🍟' },
  { id: '8', name: '跑腿代购', icon: '🏃' },
];

export const INITIAL_COUPONS: Coupon[] = [
  { id: 'c1', title: '通用红包', amount: 10, minSpend: 30, expiry: '2025-12-31' },
  { id: 'c2', title: '下午茶专享', amount: 5, minSpend: 20, expiry: '2025-12-31' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'res_1',
    name: '望湘园 (中关村店)',
    logo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.8,
    deliveryTime: 30,
    minOrder: 20,
    deliveryFee: 5,
    categories: ['美食', '湘菜'],
    distance: '1.2km',
    promotion: '满30减10',
    menu: [
      { id: 'f1', name: '剁椒鱼头', price: 68, description: '经典湘菜，鲜辣过瘾', image: 'https://images.unsplash.com/photo-1547928576-a4a33237cea3?w=400', category: '招牌菜', sales: 1200, rating: 4.9 },
      { id: 'f2', name: '小炒黄牛肉', price: 48, description: '肉质鲜嫩，镬气十足', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400', category: '招牌菜', sales: 800, rating: 4.8 },
      { id: 'f3', name: '手撕包菜', price: 22, description: '清脆爽口', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', category: '时蔬', sales: 500, rating: 4.7 },
    ]
  },
  {
    id: 'res_2',
    name: '麦当劳 (双榆树店)',
    logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200',
    rating: 4.7,
    deliveryTime: 25,
    minOrder: 0,
    deliveryFee: 9,
    categories: ['美食', '汉堡薯条'],
    distance: '800m',
    promotion: '新用户立减15',
    menu: [
      { id: 'f4', name: '巨无霸套餐', price: 35, description: '经典美味，双层牛肉', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400', category: '超值套餐', sales: 3000, rating: 4.9 },
      { id: 'f5', name: '板烧鸡腿堡', price: 21, description: '整块鸡腿排', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', category: '单点', sales: 2500, rating: 4.8 },
    ]
  },
  {
    id: 'res_3',
    name: '喜茶 (三里屯店)',
    logo: 'https://images.unsplash.com/photo-1544787210-28272d9c058c?w=200',
    rating: 4.9,
    deliveryTime: 40,
    minOrder: 15,
    deliveryFee: 4,
    categories: ['甜点饮品'],
    distance: '3.5km',
    promotion: '买一送一',
    menu: [
      { id: 'f7', name: '多肉葡萄', price: 28, description: '颗颗手剥葡萄', image: 'https://images.unsplash.com/photo-1544787210-28272d9c058c?w=400', category: '人气推荐', sales: 4500, rating: 5.0 },
      { id: 'f8', name: '芝芝莓莓', price: 30, description: '新鲜草莓+浓郁奶盖', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400', category: '人气推荐', sales: 3200, rating: 4.9 },
    ]
  },
  {
    id: 'res_4',
    name: '盒马鲜生 (海淀店)',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    rating: 4.8,
    deliveryTime: 45,
    minOrder: 50,
    deliveryFee: 6,
    categories: ['蔬果生鲜', '超市便利'],
    distance: '2.1km',
    promotion: '海鲜特惠',
    menu: [
      { id: 'f10', name: '波士顿龙虾', price: 128, description: '肉质紧实，产地直采', image: 'https://images.unsplash.com/photo-1559739511-e1302244837a?w=400', category: '活海鲜', sales: 200, rating: 4.9 },
      { id: 'f11', name: '红颜草莓 500g', price: 39, description: '甜度爆表，现摘现发', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400', category: '时令水果', sales: 1500, rating: 4.8 },
    ]
  },
  {
    id: 'res_5',
    name: '眉州东坡 (中关村南路)',
    logo: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=200',
    rating: 4.6,
    deliveryTime: 35,
    minOrder: 30,
    deliveryFee: 5,
    categories: ['美食', '川菜'],
    distance: '1.5km',
    promotion: '家常菜特赏',
    menu: [
      { id: 'f12', name: '东坡肉', price: 58, description: '肥而不腻，入口即化', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400', category: '招牌', sales: 900, rating: 4.9 },
    ]
  },
  {
    id: 'res_6',
    name: '巴黎贝甜 (海淀店)',
    logo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200',
    rating: 4.7,
    deliveryTime: 20,
    minOrder: 15,
    deliveryFee: 3,
    categories: ['甜点饮品'],
    distance: '400m',
    promotion: '甜品买三免一',
    menu: [
      { id: 'f15', name: '芝士蛋糕', price: 28, description: '醇厚芝士，丝滑口感', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', category: '蛋糕', sales: 1100, rating: 4.8 },
    ]
  },
  {
    id: 'res_7',
    name: '全家便利店 (中关村)',
    logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200',
    rating: 4.8,
    deliveryTime: 15,
    minOrder: 10,
    deliveryFee: 2,
    categories: ['超市便利'],
    distance: '150m',
    promotion: '便当7折',
    menu: [
      { id: 'f20', name: '照烧鸡排饭', price: 15, description: '全家明星便当', image: 'https://images.unsplash.com/photo-1569058242253-92a9c71f9867?w=400', category: '便当', sales: 4000, rating: 4.7 },
    ]
  },
  {
    id: 'res_8',
    name: '和府捞面 (理想大厦店)',
    logo: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200',
    rating: 4.6,
    deliveryTime: 28,
    minOrder: 25,
    deliveryFee: 4,
    categories: ['美食', '大牌午餐'],
    distance: '900m',
    promotion: '书房里的面馆',
    menu: [
      { id: 'f25', name: '酸汤肥牛面', price: 36, description: '浓郁酸汤，劲道面条', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', category: '汤面', sales: 2200, rating: 4.8 },
    ]
  }
];
