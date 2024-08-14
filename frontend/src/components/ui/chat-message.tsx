import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

interface IChatMessage {
    index: number | string;
    message: {
        type: 'user' | 'server';
        content: string;
    };
}

export const ChatMessage = ({
    index,
    message,
                            }:IChatMessage) => {
    return (
        <div key={index} className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}>
            {message.type === 'server' && (
                <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" alt="Server"/>
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
            )}
            <div className={`px-3 py-2 rounded-lg max-w-[70%] text-left ${
                message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
            }`}>
                <p>{message.content}</p>
            </div>
            {message.type === 'user' && (
                <Avatar className="w-8 h-8 ml-2">
                    <AvatarImage src="/placeholder-user.jpg" alt="You"/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};
