import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.GEMINI_API_KEY;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use("/api/", rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, apiKeyConfigured: Boolean(API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(503).json({ error: "সার্ভারে GEMINI_API_KEY সেট করা হয়নি।" });
    }
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    if (!message) return res.status(400).json({ error: "প্রশ্ন লিখে পাঠাও।" });
    if (message.length > 4000) {
      return res.status(413).json({ error: "প্রশ্নটি বেশি বড়। অনুগ্রহ করে ৪০০০ অক্ষরের মধ্যে রাখো।" });
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: "তুমি AYAN AI Assistant, একজন সহায়ক AI। ব্যবহারকারীর ভাষা অনুসারে উত্তর দাও, সাধারণত বাংলা। সহজ, ভদ্র ও পরিষ্কারভাবে ব্যাখ্যা করো।"
      }
    });

    const reply = result.text;
    if (!reply) return res.status(502).json({ error: "AI থেকে খালি উত্তর এসেছে। আবার চেষ্টা করো।" });
    return res.json({ reply });
  } catch (error) {
    console.error("Gemini request failed:", error?.message || error);
    return res.status(502).json({
      error: "Gemini API থেকে উত্তর পাওয়া যায়নি। API key, model availability এবং usage limits পরীক্ষা করো।"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AYAN AI Assistant চলছে port ${PORT}-এ`);
});
