import { useState } from 'react';
import {BACKEND_URL} from "@/utils/constants.ts";

interface IMessage {
    type: 'user' | 'server';
    content: string;
}

const useSendMessage = (setQuery: React.Dispatch<React.SetStateAction<string>>) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async (query, selectedModel) => {
        if (!query.trim() || !selectedModel) {
            setError('Please enter a query and select a model');
            return;
        }
        setLoading(true);
        setError(null);

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: query }]);

        try {
            const response = await fetch(`${BACKEND_URL}/ollama/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify({ model: selectedModel, query }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            setMessages(prev => [...prev, { type: 'server', content: '' }]);
            setQuery('');
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.trim() !== '') {
                        try {
                            const data = JSON.parse(line);
                            accumulatedResponse += data.response;
                            setMessages(prev => {
                                const newMessages = [...prev];
                                newMessages[newMessages.length - 1] = {
                                    type: 'server',
                                    content: accumulatedResponse
                                };
                                return newMessages;
                            });
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                        }
                    }
                }
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            setMessages(prev => [...prev, { type: 'server', content: 'Sorry, an error occurred. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, loading, error, handleSend, setError };
};

export default useSendMessage;
