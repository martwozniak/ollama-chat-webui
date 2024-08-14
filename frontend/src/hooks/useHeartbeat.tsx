import { useState, useEffect } from 'react';
import {BACKEND_URL} from "@/utils/constants.ts";

const useApiHeartbeat = (interval = 5000) => {
    const url = `${BACKEND_URL}/heartbeat`;
    const [isApiAlive, setIsApiAlive] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkHeartbeat = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setIsApiAlive(data.status === 'API is alive');
        } catch (err) {
            setError(err);
            setIsApiAlive(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkHeartbeat(); // Initial check
        const intervalId = setInterval(checkHeartbeat, interval); // Subsequent checks

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [interval]);

    return { isApiAlive, loading, error };
};

export default useApiHeartbeat;
