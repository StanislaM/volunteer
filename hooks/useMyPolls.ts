import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IPoll } from "@/shared/types";
import axios from "axios";

export interface IPollWithEvent extends IPoll {
    event: {
        id: number;
        name: string;
        date: string;
        status: string;
    };
}

export const useMyPolls = () => {
    const { volunteer } = useSelector((state: RootState) => state.user);
    const [polls, setPolls] = useState<IPollWithEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMyPolls = useCallback(async () => {
        if (!volunteer?.id) {
            setError("Доступ заборонено");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const eventsResponse = await axios.post(
                "/api/event/my/0",
                { search: "", activities: [] },
                { withCredentials: true },
            );

            const userEvents = eventsResponse.data;
            const pollsWithEvents: IPollWithEvent[] = [];

            for (const event of userEvents) {
                try {
                    const pollResponse = await axios.get(
                        `/api/event/${event.id}/poll`,
                        { withCredentials: true },
                    );

                    if (pollResponse.data) {
                        pollsWithEvents.push({
                            ...pollResponse.data,
                            event: {
                                id: event.id,
                                name: event.name,
                                date: event.date,
                                status: event.status,
                            },
                        });
                    }
                } catch (pollError) {
                    continue;
                }
            }

            setPolls(pollsWithEvents);
        } catch (err) {
            setError("Помилка завантаження опитувань");
            console.error("Error fetching polls:", err);
        } finally {
            setIsLoading(false);
        }
    }, [volunteer?.id]);

    const deletePoll = useCallback(async (eventId: number) => {
        try {
            await axios.delete(`/api/event/${eventId}/poll`, {
                withCredentials: true,
            });

            setPolls((prevPolls) =>
                prevPolls.filter((poll) => poll.event.id !== eventId),
            );
            return true;
        } catch (error) {
            console.error("Помилка видалення опитування:", error);
            return false;
        }
    }, []);

    const getPollStats = useCallback((poll: IPoll) => {
        const totalVotes = poll.responded.reduce(
            (sum, count) => sum + count,
            0,
        );
        const mostPopularIndex = poll.responded.indexOf(
            Math.max(...poll.responded),
        );
        const mostPopularOption = poll.questions[mostPopularIndex];

        return {
            totalVotes,
            mostPopularOption,
            mostPopularVotes: poll.responded[mostPopularIndex],
            averageVotesPerOption: totalVotes / poll.questions.length,
        };
    }, []);

    const getPercentage = useCallback((votes: number, total: number) => {
        return total > 0 ? Math.round((votes / total) * 100) : 0;
    }, []);

    useEffect(() => {
        fetchMyPolls();
    }, [fetchMyPolls]);

    return {
        polls,
        isLoading,
        error,
        refetch: fetchMyPolls,
        deletePoll,
        getPollStats,
        getPercentage,
    };
};
