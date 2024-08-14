import { useState, useEffect } from 'react';
import {BACKEND_URL} from "@/utils/constants.ts";

interface IModel {
    name: string;
    description: string;
}

const useFetchModels = () => {
    const [models, setModels] = useState<IModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const fetchModels = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/ollama/models`);
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const data = await response.json();
            setModels(data.models);
            if (data.models.length > 0 && !selectedModel) {
                setSelectedModel(data.models[0].name);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
            setError('Failed to load models. Please try again later.');
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    const selectModel = (modelName: string) => {
        setSelectedModel(modelName);
        fetchModels();
    };

    return { models, selectedModel, selectModel, error };
};

export default useFetchModels;
