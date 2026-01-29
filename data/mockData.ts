
import { Restaurant } from '../types';

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

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'res_1',
    name: '望湘园 (中关村店)',
    logo: 'https://picsum.photos/200/200?random=1',
    rating: 4.8,
    deliveryTime: 30,
    minOrder: 20,
    deliveryFee: 5,
    categories: ['湘菜', '热炒'],
    distance: '1.2km',
    promotion: '满30减10',
    menu: [
      { id: 'f1', name: '剁椒鱼头', price: 68, description: '经典湘菜，鲜辣过瘾', image: 'https://picsum.photos/400/300?random=10', category: '招牌菜', sales: 1200, rating: 4.9 },
      { id: 'f2', name: '小炒黄牛肉', price: 48, description: '肉质鲜嫩，镬气十足', image: 'https://picsum.photos/400/300?random=11', category: '招牌菜', sales: 800, rating: 4.8 },
      { id: 'f3', name: '手撕包菜', price: 22, description: '清脆爽口', image: 'https://picsum.photos/400/300?random=12', category: '时蔬', sales: 500, rating: 4.7 },
    ]
  },
  {
    id: 'res_2',
    name: '麦当劳 (双榆树店)',
    logo: 'https://picsum.photos/200/200?random=2',
    rating: 4.7,
    deliveryTime: 25,
    minOrder: 0,
    deliveryFee: 9,
    categories: ['汉堡', '西式快餐'],
    distance: '800m',
    promotion: '新用户立减15',
    menu: [
      { id: 'f4', name: '巨无霸套餐', price: 35, description: '经典美味，双层牛肉', image: 'https://picsum.photos/400/300?random=13', category: '超值套餐', sales: 3000, rating: 4.9 },
      { id: 'f5', name: '板烧鸡腿堡', price: 21, description: '整块鸡腿排', image: 'https://picsum.photos/400/300?random=14', category: '单点', sales: 2500, rating: 4.8 },
      { id: 'f6', name: '麦辣鸡翅', price: 12, description: '金黄酥脆', image: 'https://picsum.photos/400/300?random=15', category: '小食', sales: 5000, rating: 4.9 },
    ]
  },
  {
    id: 'res_3',
    name: '喜茶 (三里屯店)',
    logo: 'https://picsum.photos/200/200?random=3',
    rating: 4.9,
    deliveryTime: 40,
    minOrder: 15,
    deliveryFee: 4,
    categories: ['奶茶', '果茶'],
    distance: '3.5km',
    promotion: '买一送一',
    menu: [
      { id: 'f7', name: '多肉葡萄', price: 28, description: '颗颗手剥葡萄', image: 'https://picsum.photos/400/300?random=16', category: '人气推荐', sales: 4500, rating: 5.0 },
      { id: 'f8', name: '芝芝莓莓', price: 30, description: '新鲜草莓+浓郁奶盖', image: 'https://picsum.photos/400/300?random=17', category: '人气推荐', sales: 3200, rating: 4.9 },
    ]
  }
];
