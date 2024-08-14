import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import useCurrentTime from "@/hooks/useCurrentTime.tsx";

interface ITimer {
    isApiAlive: boolean;
}

export const Timer = ({isApiAlive}: ITimer) => {
    const { currentTimeFormatted } = useCurrentTime(1000);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="bg-primary-foreground/20 px-2 py-1 rounded-md text-sm font-medium">{currentTimeFormatted}</div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isApiAlive ? 'Server time' : 'User time'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
