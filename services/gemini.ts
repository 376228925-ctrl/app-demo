
import { GoogleGenAI, Type } from "@google/genai";
import { RESTAURANTS } from "../data/mockData";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

// 模拟地址搜索功能
export const searchAddresses = async (query: string) => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户搜索地址: "${query}"。请返回 5 个位于中国北京市的真实感地标或小区地址。`,
      config: {
        systemInstruction: "你是一个地理位置服务助手。请以 JSON 数组形式返回，每个对象包含 name (地标名), district (行政区，如海淀区), description (详细描述)。只返回 JSON。",
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Address Search Error:", error);
    return [];
  }
};

// 智能菜单筛选
export const searchMenuAI = async (restaurantName: string, menu: any[], query: string) => {
  const ai = getAI();
  if (!ai) return menu;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `在餐厅 "${restaurantName}" 的菜单中: ${JSON.stringify(menu.map(m => ({id: m.id, name: m.name, desc: m.description})))}。用户想吃: "${query}"。`,
      config: {
        systemInstruction: "分析用户需求，从菜单中挑选出最符合要求的菜品 ID 列表。以 JSON 数组形式返回 ID 字符串。只返回 JSON。",
        responseMimeType: "application/json",
      }
    });
    const recommendedIds = JSON.parse(response.text || "[]");
    return menu.filter(item => recommendedIds.includes(item.id));
  } catch (error) {
    return menu.filter(item => item.name.includes(query));
  }
};

export const getSmartFoodRecommendation = async (userPrompt: string) => {
  const ai = getAI();
  if (!ai) return "请先配置 API Key 以启用 AI 服务。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户需求: ${userPrompt}。当前可用餐厅: ${JSON.stringify(RESTAURANTS.map(r => ({ name: r.name, tags: r.categories })))}`,
      config: {
        systemInstruction: "你是一个资深美食达人。用亲切的口吻向用户推荐餐厅和菜品。如果是特定餐厅，请说明原因。保持简短。",
      }
    });
    return response.text;
  } catch (error) {
    return "我现在有点忙，建议看看首页的热门推荐哦！";
  }
};
