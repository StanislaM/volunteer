import { useState, useEffect, useCallback } from "react";
import {
    IComment,
    ICreateCommentData,
    IUpdateCommentData,
    ReactionType,
} from "@/shared/types";
import axios from "axios";

export const useComments = (eventId: string) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/event/${eventId}/comment`, {
                withCredentials: true,
            });
            setComments(response.data);
        } catch (err) {
            setError("Помилка завантаження коментарів");
            console.error("Error fetching comments:", err);
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    const createComment = useCallback(
        async (commentData: ICreateCommentData) => {
            setError(null);
            try {
                const newComment = await axios.post(
                    `/api/event/${eventId}/comment`,
                    commentData,
                    {
                        withCredentials: true,
                    },
                );
                await fetchComments();
                return newComment.data;
            } catch (err) {
                setError("Помилка створення коментаря");
                throw err;
            }
        },
        [eventId, fetchComments],
    );

    const updateComment = useCallback(
        async (commentId: number, commentData: IUpdateCommentData) => {
            setError(null);
            try {
                const response = await axios.patch(
                    `/api/event/${eventId}/comment/${commentId}`,
                    commentData,
                    {
                        withCredentials: true,
                    },
                );
                await fetchComments();
                return response.data;
            } catch (err) {
                setError("Помилка оновлення коментаря");
                throw err;
            }
        },
        [eventId, fetchComments],
    );

    const deleteComment = useCallback(
        async (commentId: number) => {
            setError(null);
            try {
                await axios.delete(
                    `/api/event/${eventId}/comment/${commentId}`,
                    {
                        withCredentials: true,
                    },
                );
                await fetchComments();
            } catch (err) {
                setError("Помилка видалення коментаря");
                throw err;
            }
        },
        [eventId, fetchComments],
    );

    const setReaction = useCallback(
        async (commentId: number, reaction: ReactionType) => {
            setError(null);
            try {
                await axios.post(
                    `/api/event/${eventId}/comment/${commentId}/${reaction}`,
                    {},
                    {
                        withCredentials: true,
                    },
                );
                await fetchComments();
            } catch (err) {
                setError("Помилка реакції");
                throw err;
            }
        },
        [eventId, fetchComments],
    );

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {
        comments,
        isLoading,
        error,
        refetch: fetchComments,
        createComment,
        updateComment,
        deleteComment,
        setReaction,
    };
};
