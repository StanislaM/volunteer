import { useState } from "react";
import { ICreateCommentData, IUpdateCommentData } from "@/shared/types";

const validateCommentData = (data: ICreateCommentData | IUpdateCommentData) => {
    const errors: Record<string, string> = {};
    if (data.content.length < 3 || data.content.length > 2000) {
        errors.content = "Коментар повинен містити від 3 до 2000 символів";
    }
    return errors;
};

export const useCommentForm = (initialContent = "") => {
    const [content, setContent] = useState(initialContent);
    const [replyToId, setReplyToId] = useState<number | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const data: ICreateCommentData = { content };
        const validationErrors = validateCommentData(data);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const reset = () => {
        setContent("");
        setReplyToId(null);
        setErrors({});
    };

    const startReply = (commentId: number) => {
        setReplyToId(commentId);
        setContent("");
        setErrors({});
    };

    const cancelReply = () => {
        setReplyToId(null);
    };

    const getFormData = (): ICreateCommentData => ({
        content,
        ...(replyToId && { replyTo: replyToId }),
    });

    const getUpdateData = (): IUpdateCommentData => ({
        content,
    });

    return {
        content,
        setContent,
        replyToId,
        setReplyToId,
        errors,
        validate,
        reset,
        startReply,
        cancelReply,
        getFormData,
        getUpdateData,
    };
};
