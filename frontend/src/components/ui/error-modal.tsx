import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string;
}

export default function ErrorModal({ isOpen, onClose, errorMessage }: ErrorModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Error</DialogTitle>
                    <DialogDescription>{errorMessage}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
