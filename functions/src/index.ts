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
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `한국어 원문: "${koreanText}"
사용자 영어 번역: "${englishText}"

위 번역을 100점 만점으로 채점하고, 아래 JSON 형식으로만 응답해. 다른 텍스트는 절대 포함하지 마.
- score: 점수 (숫자)
- hint: 가장 중요한 개선 힌트 1개 (한국어)
- correctedText: AI가 제안하는 자연스러운 영어 문장 전체
- corrections: 주요 수정 사항 배열, 각 항목은 { "original": "사용자 표현", "corrected": "더 나은 표현", "explanation": "이유 (한국어)" }

{"score": 82, "hint": "시제가 어색해요.", "correctedText": "After school, I went to a cafe.", "corrections": [{"original": "go", "corrected": "went", "explanation": "과거형"}]}`,
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
