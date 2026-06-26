import { ApiError, GoogleGenAI, type Content } from "@google/genai";
import about from "../markdown/about.md?raw";
import projects from "../markdown/projects.md?raw";
import skills from "../markdown/skills.md?raw";

const RETRYABLE_STATUSES = new Set([429, 500, 503, 504]);

export const DEFAULT_MODEL = "gemini-2.0-flash";

export const MODEL_OPTIONS = [
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
];

export const MODEL_FALLBACK_ORDER = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash",
];

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const parseApiPayload = (message: string): { code?: number; status?: string; detail?: string } | null => {
    try {
        const parsed = JSON.parse(message) as {
            error?: { code?: number; message?: string; status?: string };
        };
        if (!parsed?.error) return null;
        return {
            code: parsed.error.code,
            status: parsed.error.status,
            detail: parsed.error.message,
        };
    } catch {
        return null;
    }
};

export const getErrorStatus = (err: unknown): number | null => {
    if (err instanceof ApiError) return err.status;
    if (err instanceof Error) {
        const payload = parseApiPayload(err.message);
        return payload?.code ?? null;
    }
    return null;
};

export const isRetryableError = (err: unknown): boolean => {
    const status = getErrorStatus(err);
    return status !== null && RETRYABLE_STATUSES.has(status);
};

export const formatGeminiError = (err: unknown): string => {
    if (err instanceof ApiError) {
        return friendlyMessage(err.status, err.message);
    }

    if (err instanceof Error) {
        const payload = parseApiPayload(err.message);
        if (payload?.code) {
            return friendlyMessage(payload.code, payload.detail ?? err.message);
        }
        return err.message;
    }

    return "Something went wrong. Please try again.";
};

const friendlyMessage = (status: number, detail: string): string => {
    switch (status) {
        case 429:
            return "Too many requests. Please wait a moment and try again.";
        case 503:
            return "The model is busy right now. Retrying with a fallback model usually helps — try again in a few seconds.";
        case 500:
        case 504:
            return "The AI service had a temporary issue. Please try again.";
        case 401:
        case 403:
            return "API key is invalid or not authorized. Check VITE_GEMINI_API_KEY in your .env file.";
        default:
            return detail || `Request failed (${status}).`;
    }
};

export const withRetries = async <T>(
    fn: () => Promise<T>,
    options: { attempts?: number; baseDelayMs?: number } = {}
): Promise<T> => {
    const { attempts = 3, baseDelayMs = 1000 } = options;
    let lastError: unknown;

    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (!isRetryableError(err) || attempt === attempts - 1) break;
            await sleep(baseDelayMs * (attempt + 1));
        }
    }

    throw lastError;
};

export const modelsToTry = (selectedModel: string): string[] => {
    const ordered = [
        selectedModel,
        ...MODEL_FALLBACK_ORDER.filter((id) => id !== selectedModel),
    ];
    return [...new Set(ordered)];
};

const SUGGESTED_QUESTIONS = [
    "Who is Chhorvorn?",
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
] as const;

const EXPERIENCE_CONTEXT = `
## Experience
- Royal University of Phnom Penh (2020–2024): Computer Science
- Mobile C&C (Cambodia) Co.,Ltd. — Frontend Developer Intern (2023, 3 months)
- Mobile C&C (Cambodia) Co.,Ltd. — Frontend Developer (2023–2026)
`;

const SYSTEM_INSTRUCTION = `You are the AI assistant on Moeun Chhorvorn's portfolio website.

Answer questions about Chhorvorn using only the portfolio context below. Be concise, friendly, and professional. Use short paragraphs or bullet points when helpful.

If asked something outside this context, politely say you can only help with questions about Chhorvorn's background, skills, projects, experience, and contact details.

Portfolio context:

${about}

${skills}

${projects}

${EXPERIENCE_CONTEXT}
`;

const getApiKey = (): string | undefined => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    return key?.trim() || undefined;
};

const toGeminiHistory = (messages: ChatMessage[]): Content[] => {
    return messages.map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.text }],
    }));
}

export const getSuggestedQuestions = (): string[] => {
    return [...SUGGESTED_QUESTIONS];
}

export const askAssistant = async (
    question: string,
    history: ChatMessage[] = []
): Promise<AssistantReply> => {
    const trimmed = question.trim();
    if (!trimmed) {
        return {
            text: "Ask me anything about Chhorvorn's background, skills, projects, or contact details.",
            suggestions: getSuggestedQuestions(),
        };
    }

    const apiKey = getApiKey();
    if (!apiKey) {
        return {
            text: "AI assistant is not configured yet. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server.",
            suggestions: getSuggestedQuestions(),
        };
    }

    const ai = new GoogleGenAI({ apiKey });
    const contents: Content[] = [
        ...toGeminiHistory(history),
        { role: "user", parts: [{ text: trimmed }] },
    ];

    let lastError: unknown;

    for (const model of modelsToTry(DEFAULT_MODEL)) {
        try {
            const response = await withRetries(() =>
                ai.models.generateContent({
                    model,
                    contents,
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                        temperature: 0.7,
                        maxOutputTokens: 512,
                    },
                })
            );

            const text = response.text?.trim();
            if (!text) {
                throw new Error("The model returned an empty response.");
            }

            return { text };
        } catch (err) {
            lastError = err;
        }
    }

    return {
        text: formatGeminiError(lastError),
        suggestions: getSuggestedQuestions().slice(0, 3),
    };
}

export type Message = {
    id: string;
    role: "user" | "assistant";
    text: string;
    suggestions?: string[];
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
    role: ChatRole;
    text: string;
};

export type AssistantReply = {
    text: string;
    suggestions?: string[];
};