import { useEffect } from 'react';

interface IFaviconHandler {
    isApiAlive: boolean;
}

const FaviconHandler = ({isApiAlive}: IFaviconHandler) => {
    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = isApiAlive ? '/green.ico' : '/red.ico';
        }
    }, [isApiAlive]);

    return null;
};

export default FaviconHandler;
