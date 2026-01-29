
import { GoogleGenAI, Type } from "@google/genai";
import { RESTAURANTS } from "../data/mockData";

export const getSmartFoodRecommendation = async (userPrompt: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not available yet.");
    return "系统检测到 API Key 尚未设置，请点击下方的设置按钮。";
  }

  try {
    // 每次调用时创建新实例，确保使用最新的 API Key
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants: ${userPrompt}. Based on our restaurants: ${JSON.stringify(RESTAURANTS.map(r => ({ name: r.name, menu: r.menu.map(m => m.name) })))}`,
      config: {
        systemInstruction: "You are a helpful food delivery assistant. Suggest specific items from the available menu data. Return a short, friendly message in Chinese.",
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("AI Error:", error);
    if (error.message?.includes("entity was not found")) {
      return "ERROR_KEY_NOT_FOUND";
    }
    return "哎呀，思考得有点累了，建议您看看首页的‘今日大牌’哦！";
  }
};

export const analyzeFoodMood = async (imageB64: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "请先配置 API 服务。";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: imageB64,
              mimeType: "image/jpeg",
            },
          },
          {
            text: "根据这张图片的心情，推荐一种类型的餐食（如：辣的、甜点、健康的）。用中文简短回答。",
          },
        ],
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "看起来你现在需要一点美食慰藉！";
  }
};
