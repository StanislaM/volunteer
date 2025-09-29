import { useState, useEffect, useCallback } from "react";
import { IPoll, ICreatePollData, IUpdatePollData } from "@/shared/types";
import axios from "axios";

export const usePoll = (eventId: string) => {
    const [poll, setPoll] = useState<IPoll | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPoll = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/event/${eventId}/poll`, {
                withCredentials: true,
            });
            setPoll(response.data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                setPoll(null);
            } else {
                setError("Помилка завантаження опитування");
                setPoll(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    const createPoll = useCallback(
        async (pollData: ICreatePollData) => {
            setError(null);
            try {
                const response = await axios.post(
                    `/api/event/${eventId}/poll`,
                    pollData,
                    {
                        withCredentials: true,
                    },
                );
                setPoll(response.data);
                return response.data;
            } catch (err) {
                setError("Помилка створення опитування");
                throw err;
            }
        },
        [eventId],
    );

    const updatePoll = useCallback(
        async (pollData: IUpdatePollData) => {
            setError(null);
            try {
                const response = await axios.patch(
                    `/api/event/${eventId}/poll`,
                    pollData,
                    {
                        withCredentials: true,
                    },
                );
                setPoll(response.data);
                return response.data;
            } catch (err) {
                setError("Помилка оновлення опитування");
                throw err;
            }
        },
        [eventId],
    );

    const deletePoll = useCallback(async () => {
        setError(null);
        try {
            await axios.delete(`/api/event/${eventId}/poll`, {
                withCredentials: true,
            });
            setPoll(null);
        } catch (err) {
            setError("Помилка видалення опитування");
            throw err;
        }
    }, [eventId]);

    const vote = useCallback(
        async (optionIndex: number) => {
            setError(null);
            try {
                const response = await axios.post(
                    `/api/event/${eventId}/poll/${optionIndex}`,
                    {},
                    {
                        withCredentials: true,
                    },
                );
                setPoll(response.data);
                return response.data;
            } catch (err) {
                setError("Помилка голосування");
                throw err;
            }
        },
        [eventId],
    );

    useEffect(() => {
        fetchPoll();
    }, [fetchPoll]);

    return {
        poll,
        isLoading,
        error,
        refetch: fetchPoll,
        createPoll,
        updatePoll,
        deletePoll,
        vote,
    };
};
