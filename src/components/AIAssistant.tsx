import { AnimatePresence, motion } from "motion/react";
import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
} from "react";
import { askAssistant, getSuggestedQuestions } from "../services/geminiService";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import aiIcon from "../assets/icons/ai.svg";
import closeIcon from "../assets/icons/close.svg";
import sendIcon from "../assets/icons/send.svg";
import type { Message } from "../services/geminiService";
import {
    WELCOME_MESSAGE,
    GUIDE_STORAGE_KEY,
    GUIDE_STEPS,
} from "../constants/aiAssistant";

export const AIAssistant = () => {
    // =======================STATE=======================
    const [isOpen, setIsOpen] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // =======================USE EFFECTS=======================
    useEffect(() => {
        if (localStorage.getItem(GUIDE_STORAGE_KEY)) return;
        const timer = setTimeout(() => setShowGuide(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // =======================FUNCTIONS=======================
    const dismissGuide = () => {
        setShowGuide(false);
        localStorage.setItem(GUIDE_STORAGE_KEY, "1");
    };

    const openAssistant = () => {
        dismissGuide();
        setIsOpen(true);
    };

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isTyping) return;

        const history = messages
            .filter((message) => message.id !== "welcome")
            .map((message) => ({ role: message.role, text: message.text }));

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            text: trimmed,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const reply = await askAssistant(trimmed, history);
            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    text: reply.text,
                    suggestions: reply.suggestions,
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    text: "Something went wrong. Please try again in a moment.",
                    suggestions: getSuggestedQuestions().slice(0, 3),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        void sendMessage(input);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void sendMessage(input);
        }
    };

    // =======================RENDER=======================
    return (
        <>
            <div className="fixed bottom-6 right-6 z-70 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {showGuide && !isOpen && (
                        <motion.aside
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="w-[min(100vw-2rem,20rem)] rounded-2xl border shadow-xl p-4"
                            style={{
                                backgroundColor: "var(--surface)",
                                borderColor: "var(--border-subtle)",
                            }}
                            role="status"
                            aria-live="polite"
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                                        style={{ backgroundColor: "var(--accent)" }}
                                    >
                                        <img src={aiIcon} className="w-4 h-4" alt="" aria-hidden />
                                    </div>
                                    <h3 className="font-semibold text-sm text-(--text-dark) leading-tight">
                                        Meet the AI assistant
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={dismissGuide}
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-(--text-dark)/60 hover:bg-(--border-subtle) transition-colors shrink-0"
                                    aria-label="Dismiss guide"
                                >
                                    <img
                                        src={closeIcon}
                                        className="w-3.5 h-3.5 opacity-60"
                                        alt=""
                                        aria-hidden
                                    />
                                </button>
                            </div>
                            <ol className="space-y-2 mb-4 pl-4 list-decimal text-xs text-(--text-dark)/80 leading-relaxed">
                                {GUIDE_STEPS.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={openAssistant}
                                    className="flex-1 rounded-full px-3 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: "var(--accent)" }}
                                >
                                    Open chat
                                </button>
                                <button
                                    type="button"
                                    onClick={dismissGuide}
                                    className="rounded-full px-3 py-2 text-xs font-medium text-(--text-dark)/70 border hover:text-(--text-dark) transition-colors"
                                    style={{
                                        backgroundColor: "var(--surface-muted)",
                                        borderColor: "var(--border-subtle)",
                                    }}
                                >
                                    Got it
                                </button>
                            </div>
                            <div
                                className="absolute -bottom-2 right-7 w-4 h-4 rotate-45 border-r border-b"
                                style={{
                                    backgroundColor: "var(--surface)",
                                    borderColor: "var(--border-subtle)",
                                }}
                                aria-hidden
                            />
                        </motion.aside>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.section
                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-[min(100vw-2rem,24rem)] h-[min(70vh,32rem)] rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
                            style={{
                                backgroundColor: "var(--surface)",
                                borderColor: "var(--border-subtle)",
                            }}
                            role="dialog"
                            aria-label="AI Assistant"
                        >
                            <header
                                className="flex items-center justify-between px-5 py-4 border-b"
                                style={{ borderColor: "var(--border-subtle)" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                                        style={{ backgroundColor: "var(--accent)" }}
                                    >
                                        <img src={aiIcon} className="w-5 h-5" alt="" aria-hidden />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-(--text-dark) leading-tight">
                                            AI Assistant
                                        </h2>
                                        <p className="text-xs text-(--text-dark)/60">
                                            Ask about Chhorvorn
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-(--text-dark)/70 hover:bg-(--border-subtle) transition-colors"
                                    aria-label="Close assistant"
                                >
                                    <img
                                        src={closeIcon}
                                        className="w-4 h-4 opacity-70"
                                        alt=""
                                        aria-hidden
                                    />
                                </button>
                            </header>

                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className="max-w-[85%] space-y-2">
                                            <div
                                                className={`markdown-content px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                                        ? "rounded-br-md text-white"
                                                        : "rounded-bl-md text-(--text-dark)"
                                                    }`}
                                                style={{
                                                    backgroundColor:
                                                        message.role === "user"
                                                            ? "var(--accent)"
                                                            : "var(--surface-muted)",
                                                    border:
                                                        message.role === "assistant"
                                                            ? "1px solid var(--border-subtle)"
                                                            : undefined,
                                                }}
                                            >
                                                <Markdown remarkPlugins={[remarkGfm]}>
                                                    {message.text}
                                                </Markdown>
                                            </div>
                                            {message.suggestions && message.suggestions.length > 0 && messages.length === 1 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {message.suggestions.map((suggestion) => (
                                                        <button
                                                            key={suggestion}
                                                            type="button"
                                                            onClick={() => void sendMessage(suggestion)}
                                                            className="text-xs px-3 py-1.5 rounded-full border text-(--text-dark)/80 hover:text-(--accent) hover:border-(--accent)/40 transition-colors"
                                                            style={{
                                                                backgroundColor: "var(--surface-muted)",
                                                                borderColor: "var(--border-subtle)",
                                                            }}
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div
                                            className="px-4 py-3 rounded-2xl rounded-bl-md border text-sm text-(--text-dark)/70"
                                            style={{
                                                backgroundColor: "var(--surface-muted)",
                                                borderColor: "var(--border-subtle)",
                                            }}
                                        >
                                            <span className="inline-flex gap-1 items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-(--text-dark)/40 animate-bounce [animation-delay:0ms]" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-(--text-dark)/40 animate-bounce [animation-delay:150ms]" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-(--text-dark)/40 animate-bounce [animation-delay:300ms]" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-4 border-t flex gap-2"
                                style={{ borderColor: "var(--border-subtle)" }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    placeholder="Ask a question..."
                                    disabled={isTyping}
                                    className="flex-1 rounded-full px-4 py-2.5 text-sm text-(--text-dark) placeholder:text-(--text-dark)/45 outline-none border focus:ring-2 focus:ring-(--accent)/30 disabled:opacity-60"
                                    style={{
                                        backgroundColor: "var(--surface-muted)",
                                        borderColor: "var(--border-subtle)",
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: "var(--accent)" }}
                                    aria-label="Send message"
                                >
                                    <img src={sendIcon} className="w-4 h-4" alt="" aria-hidden />
                                </button>
                            </form>
                        </motion.section>
                    )}
                </AnimatePresence>

                <div className="relative">
                    {showGuide && !isOpen && (
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: "var(--accent)" }}
                            initial={{ opacity: 0.5, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.6 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            aria-hidden
                        />
                    )}
                    <motion.button
                        type="button"
                        onClick={() => {
                            if (!isOpen) dismissGuide();
                            setIsOpen((open) => !open);
                        }}
                        className="relative w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                        style={{ backgroundColor: "var(--accent)" }}
                        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
                        aria-expanded={isOpen}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.img
                                    key="close"
                                    src={closeIcon}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-6 h-6 brightness-0 invert"
                                    alt=""
                                    aria-hidden
                                />
                            ) : (
                                <motion.img
                                    key="open"
                                    src={aiIcon}
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-6 h-6"
                                    alt=""
                                    aria-hidden
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </>
    );
};
