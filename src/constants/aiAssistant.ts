import { getSuggestedQuestions, type Message } from "../services/geminiService";

export const WELCOME_MESSAGE: Message = {
    id: "welcome",
    role: "assistant",
    text: "Hi! I'm Chhorvorn's AI assistant. Ask me about his skills, experience, projects, or how to get in touch.",
    suggestions: getSuggestedQuestions(),
};

export const GUIDE_STORAGE_KEY = "portfolio-ai-guide-dismissed";

export const GUIDE_STEPS = [
    "Tap the button below to open the chat.",
    "Ask about skills, experience, projects, or contact info.",
    "Use the suggested questions to get started quickly.",
];