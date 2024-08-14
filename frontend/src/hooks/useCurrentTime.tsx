import { useState, useEffect } from 'react';
import {formatTime} from "@/utils/formatTime.ts";
import {BACKEND_URL} from "@/utils/constants.ts";

const useCurrentTime = (interval = 6000) => {
    const url = `${BACKEND_URL}/time`;
    const [currentTimeFormatted, setCurrentTimeFormatted] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCurrentTime = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentTime(data.currentTime);
            setCurrentTimeFormatted(formatTime(data.currentTime));
        } catch (err) {
            const data = new Date();
            setCurrentTimeFormatted(formatTime(data));
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentTime(); // Initial fetch
        const intervalId = setInterval(fetchCurrentTime, interval); // Subsequent fetches

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [url, interval]);

    return { currentTimeFormatted, currentTime, loading, error };
};

export default useCurrentTime;
