"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
    IComment,
    ICreateCommentData,
    IUpdateCommentData,
    ReactionType,
} from "@/shared/types";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import PenIcon from "@/components/icons/PenIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import ConfirmIcon from "@/components/icons/ConfirmIcon";
import axios from "axios";

interface Props {
    eventId: string;
}

const Comments: React.FC<Props> = ({ eventId }) => {
    const { status } = useSelector((state: RootState) => state.user);
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newComment, setNewComment] = useState("");
    const [newCommentError, setNewCommentError] = useState("");
    const [replyToId, setReplyToId] = useState<number | null>(null);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState("");
    const [editingError, setEditingError] = useState("");

    const isLoggedIn = status === "authorized";

    useEffect(() => {
        fetchComments();
    }, [eventId]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/event/${eventId}/comment`, {
                withCredentials: true,
            });
            setComments(response.data);
        } catch (error) {
            console.error("Помилка завантаження коментарів:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateComment = (content: string): boolean => {
        if (content.length < 3 || content.length > 2000) {
            const error = "Коментар повинен містити від 3 до 2000 символів";
            if (editingId) {
                setEditingError(error);
            } else {
                setNewCommentError(error);
            }
            return false;
        }
        return true;
    };

    const handleSubmitComment = async () => {
        if (!validateComment(newComment)) return;

        setIsSubmitting(true);
        try {
            const commentData: ICreateCommentData = {
                content: newComment,
                ...(replyToId && { replyTo: replyToId }),
            };

            await axios.post(`/api/event/${eventId}/comment`, commentData, {
                withCredentials: true,
            });

            setNewComment("");
            setNewCommentError("");
            setReplyToId(null);
            await fetchComments();
        } catch (error) {
            console.error("Помилка створення коментаря:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditComment = async (commentId: number) => {
        if (!validateComment(editingContent)) return;

        setIsSubmitting(true);
        try {
            const updateData: IUpdateCommentData = {
                content: editingContent,
            };

            await axios.patch(
                `/api/event/${eventId}/comment/${commentId}`,
                updateData,
                { withCredentials: true },
            );

            setEditingId(null);
            setEditingContent("");
            setEditingError("");
            await fetchComments();
        } catch (error) {
            console.error("Помилка редагування коментаря:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!confirm("Ви впевнені, що хочете видалити коментар?")) return;

        try {
            await axios.delete(`/api/event/${eventId}/comment/${commentId}`, {
                withCredentials: true,
            });
            await fetchComments();
        } catch (error) {
            console.error("Помилка видалення коментаря:", error);
        }
    };

    const handleReaction = async (
        commentId: number,
        reaction: ReactionType,
    ) => {
        try {
            await axios.post(
                `/api/event/${eventId}/comment/${commentId}/${reaction}`,
                {},
                { withCredentials: true },
            );
            await fetchComments();
        } catch (error) {
            console.error("Помилка реакції:", error);
        }
    };

    const startEdit = (comment: IComment) => {
        setEditingId(comment.id);
        setEditingContent(comment.content);
        setEditingError("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingContent("");
        setEditingError("");
    };

    const startReply = (commentId: number) => {
        setReplyToId(commentId);
        setNewComment("");
        setNewCommentError("");
    };

    const cancelReply = () => {
        setReplyToId(null);
        setNewComment("");
        setNewCommentError("");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getReplyToComment = (replyToId: number) => {
        return comments.find((comment) => comment.id === replyToId);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <SpinnerIcon />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-dark">
                    Коментарі ({comments.length})
                </h3>
            </div>

            {isLoggedIn && (
                <div className="mb-8 rounded-lg border bg-gray-50 p-4">
                    {replyToId && (
                        <div className="mb-3 rounded border border-blue-200 bg-blue-50 p-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-600">
                                    Відповідь на коментар:{" "}
                                    {getReplyToComment(
                                        replyToId,
                                    )?.content.slice(0, 50)}
                                    ...
                                </span>
                                <Button size="sm" onClick={cancelReply}>
                                    <XMarkIcon />
                                </Button>
                            </div>
                        </div>
                    )}

                    <Textarea
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                            setNewCommentError("");
                        }}
                        placeholder="Написати коментар..."
                        error={newCommentError}
                        rows={3}
                    />

                    <div className="mt-3 flex gap-2">
                        <Button
                            onClick={handleSubmitComment}
                            disabled={isSubmitting || !newComment.trim()}
                        >
                            {isSubmitting ? <SpinnerIcon /> : "Опублікувати"}
                        </Button>
                        {replyToId && (
                            <Button variant="outline" onClick={cancelReply}>
                                Скасувати
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {!isLoggedIn && (
                <div className="mb-8 rounded-lg border bg-gray-50 p-4 text-center">
                    <p className="text-gray-medium">
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Увійдіть
                        </a>
                        , щоб залишити коментар
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-gray-medium">
                            Коментарів поки немає
                        </p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-lg border bg-white p-4"
                        >
                            {comment.replyTo && (
                                <div className="mb-3 border-l-4 border-gray-300 bg-gray-50 p-2 text-sm text-gray-600">
                                    Відповідь на коментар #{comment.replyTo.id}
                                </div>
                            )}

                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <span className="font-medium text-gray-dark">
                                        {comment.user.firstName}{" "}
                                        {comment.user.lastName}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-medium">
                                        {formatDate(comment.creationTime)}
                                        {comment.edited && " (відредаговано)"}
                                    </span>
                                </div>

                                {isLoggedIn && (
                                    <div className="flex gap-1">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                startReply(comment.id)
                                            }
                                        >
                                            Відповісти
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => startEdit(comment)}
                                        >
                                            <PenIcon />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                        >
                                            <XMarkIcon />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {editingId === comment.id ? (
                                <div className="space-y-3">
                                    <Textarea
                                        value={editingContent}
                                        onChange={(e) => {
                                            setEditingContent(e.target.value);
                                            setEditingError("");
                                        }}
                                        error={editingError}
                                        rows={3}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                handleEditComment(comment.id)
                                            }
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <SpinnerIcon />
                                            ) : (
                                                <ConfirmIcon />
                                            )}
                                            Зберегти
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={cancelEdit}
                                        >
                                            Скасувати
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mb-3 whitespace-pre-wrap text-gray-dark">
                                    {comment.content}
                                </p>
                            )}

                            {isLoggedIn && editingId !== comment.id && (
                                <div className="flex items-center gap-4 border-t pt-2">
                                    <button
                                        onClick={() =>
                                            handleReaction(comment.id, "like")
                                        }
                                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                                            comment.reaction === "like"
                                                ? "bg-green-100 text-green-600"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        👍 {comment.likes}
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleReaction(
                                                comment.id,
                                                "dislike",
                                            )
                                        }
                                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                                            comment.reaction === "dislike"
                                                ? "bg-red-100 text-red-600"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        👎 {comment.dislikes}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;
