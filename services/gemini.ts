
import { GoogleGenAI, Type } from "@google/genai";
import { RESTAURANTS } from "../data/mockData";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

// 模拟地址搜索功能 - 针对中国区优化地名生成
export const searchAddresses = async (query: string) => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户正在搜索地址关键词: "${query}"。请作为地理信息系统生成 5 个位于中国北京市的真实感地标。`,
      config: {
        systemInstruction: "你是一个专业的 LBS 地理位置助理。请基于用户输入，返回一组北京地区的建筑、小区或办公楼列表。结果必须是 JSON 格式数组。属性包括: name (核心地标名), district (所属区，如朝阳区), description (补充描述，如具体街道或临近地铁口)。严禁输出任何 Markdown 标记或额外文字。",
        responseMimeType: "application/json",
      }
    });
    const text = response.text || "[]";
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch (error) {
    console.error("Address Search Error:", error);
    // 回退到静态 Mock
    return [
      { name: "中关村大厦", district: "海淀区", description: "海淀区中关村大街甲59号" },
      { name: "三里屯太古里", district: "朝阳区", description: "朝阳区三里屯路19号" }
    ];
  }
};

// 智能菜单筛选 - 核心逻辑升级
export const searchMenuAI = async (restaurantName: string, menu: any[], query: string) => {
  const ai = getAI();
  if (!ai) return menu;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `餐厅: "${restaurantName}"。完整菜单数据: ${JSON.stringify(menu.map(m => ({id: m.id, name: m.name, desc: m.description, category: m.category})))}。用户点餐偏好: "${query}"。`,
      config: {
        systemInstruction: "你是一个资深点餐助手。请分析用户的模糊偏好（如心情、口味、避雷等），从当前菜单中挑选最符合要求的菜品 ID。只返回一个纯 JSON 字符串数组，例如 ['f1', 'f3']。不要解释，不要输出其他文字。",
        responseMimeType: "application/json",
      }
    });
    const text = response.text || "[]";
    const recommendedIds = JSON.parse(text.replace(/```json|```/g, '').trim());
    return menu.filter(item => recommendedIds.includes(item.id));
  } catch (error) {
    console.warn("AI Menu Filter Fail, falling back to basic search");
    return menu.filter(item => item.name.includes(query) || item.description.includes(query));
  }
};

// 首页推荐语增强
export const getSmartFoodRecommendation = async (userPrompt: string) => {
  const ai = getAI();
  if (!ai) return "请点击右上角设置，配置您的 API Key 以激活智能美食助理。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户心情或偏好: "${userPrompt}"。备选餐厅信息: ${JSON.stringify(RESTAURANTS.map(r => ({ name: r.name, tags: r.categories, price: r.minOrder })))}`,
      config: {
        systemInstruction: "你是一个风趣且专业的外卖导购。请根据用户输入，从给定的餐厅中挑选 1-2 家最合适的，并给出一个让人垂涎欲滴的推荐理由。请使用中文，限制在 100 字以内。可以适当使用表情符号。",
      }
    });
    return response.text;
  } catch (error) {
    return "哎呀，网络波动挡住了我的美食雷达！不过我建议你看看那家 '望湘园'，今天的剁椒鱼头非常新鲜哦！";
  }
};
