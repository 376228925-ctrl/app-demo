
import { GoogleGenAI, Type } from "@google/genai";
import { RESTAURANTS } from "../data/mockData";

// Always use named parameter for apiKey and obtain it from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartFoodRecommendation = async (userPrompt: string) => {
  try {
    // Basic text tasks use gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants: ${userPrompt}. Based on our restaurants: ${JSON.stringify(RESTAURANTS.map(r => ({ name: r.name, menu: r.menu.map(m => m.name) })))}`,
      config: {
        systemInstruction: "You are a helpful food delivery assistant. Suggest specific items from the available menu data. Return a short, friendly message in Chinese.",
      }
    });
    // Access response.text property directly
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "哎呀，思考得有点累了，建议您看看首页的‘今日大牌’哦！";
  }
};

export const analyzeFoodMood = async (imageB64: string) => {
  try {
    // For multimodal content, use contents: { parts: [...] } structure
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
    // Access response.text property directly
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "看起来你现在需要一点美食慰藉！";
  }
};