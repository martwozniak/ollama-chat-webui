import {Button} from "@/components/ui/button.tsx";
import {Dispatch, SetStateAction} from "react";

interface ICloseButton {
    setError: Dispatch<SetStateAction<null>>;
}

export const CloseButton = ({setError}: ICloseButton) => {
    return (
        <Button variant="default" size="icon" className="text-primary-foreground hover:bg-primary/20" onClick={()=>{
            setError('You cannot exit this chat');
        }}>
            <XIcon className="w-5 h-5"/>
            <span className="sr-only">Close</span>
        </Button>
    );
};

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
