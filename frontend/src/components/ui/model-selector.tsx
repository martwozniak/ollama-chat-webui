import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface IModel {
    selectedModel: string;
    selectModel: (modelName: string) => void;
    models: { name: string; description: string }[];
    isApiAlive: boolean;
}

export const ModelSelector = ({
    selectedModel,
    selectModel,
    models,
                                  isApiAlive
                              }: IModel) => {

    return (
        <Select value={selectedModel} onValueChange={selectModel} className="w-full mb-2" disabled={models.length === 0 || !isApiAlive}>
            <SelectTrigger>
                <SelectValue placeholder={models.length > 0 ? "Select a model" : "No models"}/>
            </SelectTrigger>
            <SelectContent>
                {models.map((model) => (
                    <SelectItem key={model.name} value={model.name}>
                        {model.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
