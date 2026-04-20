import { setGlobalOptions } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Anthropic from "@anthropic-ai/sdk";

setGlobalOptions({ maxInstances: 10 });

const ANTHROPIC_API_KEY = defineSecret("ANTHROPIC_API_KEY");

export const gradeEntry = onCall(
  { secrets: [ANTHROPIC_API_KEY], cors: true, invoker: 'public' },
  async (request) => {
    const { koreanText, englishText } = request.data;

    if (!koreanText || !englishText) {
      throw new HttpsError("invalid-argument", "koreanText와 englishText가 필요합니다.");
    }

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: `한국어 원문: "${koreanText}"
사용자 영어 번역: "${englishText}"

위 번역을 100점 만점으로 채점하고, 개선이 필요한 부분 힌트 1개만 한국어로 알려줘.
반드시 아래 JSON 형식으로만 응답해. 다른 텍스트는 절대 포함하지 마.
{"score": 82, "hint": "시제가 어색해요. 과거형을 써보세요."}`,
        },
      ],
    });

    const text = (message.content[0] as { type: string; text: string }).text;

    try {
      const cleaned = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new HttpsError("internal", "AI 응답 파싱 실패: " + text);
    }
  }
);
