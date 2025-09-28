import axios from "axios";
import { IPoll, ICreatePollData, IUpdatePollData } from "@/shared/types";

const BASE_URL = "/api/event";

export const pollApi = {
    getPoll: async (eventId: string): Promise<IPoll | null> => {
        try {
            const response = await axios.get(`${BASE_URL}/${eventId}/poll`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    },

    createPoll: async (
        eventId: string,
        pollData: ICreatePollData,
    ): Promise<IPoll> => {
        const response = await axios.post(
            `${BASE_URL}/${eventId}/poll`,
            pollData,
            { withCredentials: true },
        );
        return response.data;
    },

    updatePoll: async (
        eventId: string,
        pollData: IUpdatePollData,
    ): Promise<IPoll> => {
        const response = await axios.patch(
            `${BASE_URL}/${eventId}/poll`,
            pollData,
            { withCredentials: true },
        );
        return response.data;
    },

    deletePoll: async (eventId: string): Promise<void> => {
        await axios.delete(`${BASE_URL}/${eventId}/poll`, {
            withCredentials: true,
        });
    },

    vote: async (eventId: string, optionIndex: number): Promise<IPoll> => {
        const response = await axios.post(
            `${BASE_URL}/${eventId}/poll/${optionIndex}`,
            {},
            { withCredentials: true },
        );
        return response.data;
    },
};

import {
    IComment,
    ICreateCommentData,
    IUpdateCommentData,
    ReactionType,
} from "@/shared/types";

export const commentApi = {
    getComments: async (eventId: string): Promise<IComment[]> => {
        const response = await axios.get(`${BASE_URL}/${eventId}/comment`, {
            withCredentials: true,
        });
        return response.data;
    },

    createComment: async (
        eventId: string,
        commentData: ICreateCommentData,
    ): Promise<IComment> => {
        const response = await axios.post(
            `${BASE_URL}/${eventId}/comment`,
            commentData,
            { withCredentials: true },
        );
        return response.data;
    },

    updateComment: async (
        eventId: string,
        commentId: number,
        commentData: IUpdateCommentData,
    ): Promise<IComment> => {
        const response = await axios.patch(
            `${BASE_URL}/${eventId}/comment/${commentId}`,
            commentData,
            { withCredentials: true },
        );
        return response.data;
    },

    deleteComment: async (
        eventId: string,
        commentId: number,
    ): Promise<void> => {
        await axios.delete(`${BASE_URL}/${eventId}/comment/${commentId}`, {
            withCredentials: true,
        });
    },

    setReaction: async (
        eventId: string,
        commentId: number,
        reaction: ReactionType,
    ): Promise<IComment> => {
        const response = await axios.post(
            `${BASE_URL}/${eventId}/comment/${commentId}/${reaction}`,
            {},
            { withCredentials: true },
        );
        return response.data;
    },
};

export const validatePollData = (data: ICreatePollData | IUpdatePollData) => {
    const errors: Record<string, string> = {};

    if (data.title !== undefined) {
        if (data.title.length < 3 || data.title.length > 255) {
            errors.title = "Заголовок повинен містити від 3 до 255 символів";
        }
    }

    if (data.questions !== undefined) {
        if (data.questions.length < 2 || data.questions.length > 10) {
            errors.questions = "Повинно бути від 2 до 10 варіантів відповідей";
        }

        for (let i = 0; i < data.questions.length; i++) {
            if (
                data.questions[i].length < 3 ||
                data.questions[i].length > 255
            ) {
                errors.questions = `Варіант ${i + 1} повинен містити від 3 до 255 символів`;
                break;
            }
        }

        const uniqueQuestions = new Set(data.questions);
        if (uniqueQuestions.size !== data.questions.length) {
            errors.questions = "Варіанти відповідей повинні бути унікальними";
        }
    }

    return errors;
};

export const validateCommentData = (
    data: ICreateCommentData | IUpdateCommentData,
) => {
    const errors: Record<string, string> = {};

    if (data.content.length < 3 || data.content.length > 2000) {
        errors.content = "Коментар повинен містити від 3 до 2000 символів";
    }

    return errors;
};

export const formatCommentDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatEventDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });
};
