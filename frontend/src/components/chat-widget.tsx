import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState, useRef, useEffect} from "react";
import useFetchModels from "@/hooks/useFetchModels.tsx";
import useApiHeartbeat from "@/hooks/useHeartbeat.tsx";
import useSendMessage from "@/hooks/useSendMessage.tsx";
import ErrorModal from "@/components/ui/error-modal.tsx";
import {Loader} from "@/components/ui/loader.tsx";
import {Timer} from "@/components/ui/timer.tsx";
import {StatusDot} from "@/components/ui/status-dot.tsx";
import {ModelSelector} from "@/components/ui/model-selector.tsx";
import {CloseButton} from "@/components/ui/close-button.tsx";
import {ChatMessage} from "@/components/ui/chat-message.tsx";
import FaviconHandler from "@/components/favicon-handler.tsx";

export default function ChatWidget() {
    const { isApiAlive } = useApiHeartbeat(1000);
    const { models, selectedModel, selectModel, error: modelsError } = useFetchModels();
    const [query, setQuery] = useState('');
    const messagesEndRef = useRef(null);
    const { messages, loading, error, handleSend, setError } = useSendMessage(setQuery);
    const inputRef = useRef(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [messages, selectedModel]);

    useEffect(() => {
        if (error) {
            setIsErrorModalOpen(true);
        }
    }, [error]);

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setError(null);
    };

    return (
        <>
            <FaviconHandler isApiAlive={isApiAlive} />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={handleCloseErrorModal}
                errorMessage={error || modelsError || ""}
            />
        <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-background rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex gap-2">
                    <div className="relative">
                        <StatusDot isApiAlive={isApiAlive}/>
                        <h2 className="text-lg font-medium ml-5">Chat</h2>
                    </div>
                    <Timer isApiAlive={isApiAlive}/>
                </div>
                <div className='flex'>
                    <div>
                        <ModelSelector selectedModel={selectedModel} selectModel={selectModel} models={models} isApiAlive={isApiAlive}/>
                    </div>
                    <CloseButton setError={setError} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <ChatMessage index={`${index}-${message.type}`} message={message} />
                ))}
                <Loader loading={loading}/>
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center px-4 py-3 bg-muted rounded-b-lg">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={models.length === 0 ? "Install models in your local Ollama client" : "Type your message"}
                    className="flex-1 mr-2 rounded-lg border-none focus:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(query, selectedModel)}
                    disabled={loading || models.length === 0 || !isApiAlive}
                />
                <Button className="rounded-lg" onClick={() => handleSend(query, selectedModel)} disabled={loading || models.length === 0 || !isApiAlive}>
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
        </>
    )
}
