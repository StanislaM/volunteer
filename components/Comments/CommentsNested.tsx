"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IComment, ReactionType } from "@/shared/types";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import PenIcon from "@/components/icons/PenIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import ConfirmIcon from "@/components/icons/ConfirmIcon";
import { useComments } from "@/hooks/useComments";
import { useCommentForm } from "@/hooks/useCommentForm";
import { formatCommentDate } from "@/lib/utils/dateUtils";

interface Props {
    eventId: string;
}

interface CommentWithReplies extends IComment {
    replies: CommentWithReplies[];
}

const CommentsNested: React.FC<Props> = ({ eventId }) => {
    const { status } = useSelector((state: RootState) => state.user);
    const {
        comments,
        isLoading,
        createComment,
        updateComment,
        deleteComment,
        setReaction,
    } = useComments(eventId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [replyingToId, setReplyingToId] = useState<number | null>(null);

    const newCommentForm = useCommentForm();
    const editCommentForm = useCommentForm();
    const replyCommentForm = useCommentForm();

    const isLoggedIn = status === "authorized";

    const nestedComments = useMemo(() => {
        const commentMap = new Map<number, CommentWithReplies>();
        const rootComments: CommentWithReplies[] = [];

        comments.forEach((comment) => {
            commentMap.set(comment.id, { ...comment, replies: [] });
        });

        comments.forEach((comment) => {
            const commentWithReplies = commentMap.get(comment.id)!;

            if (comment.replyTo?.id) {
                const parentComment = commentMap.get(comment.replyTo.id);
                if (parentComment) {
                    parentComment.replies.push(commentWithReplies);
                }
            } else {
                rootComments.push(commentWithReplies);
            }
        });

        rootComments.sort(
            (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes),
        );

        const sortReplies = (comments: CommentWithReplies[]) => {
            comments.sort(
                (a, b) =>
                    new Date(a.creationTime).getTime() -
                    new Date(b.creationTime).getTime(),
            );
            comments.forEach((comment) => sortReplies(comment.replies));
        };

        rootComments.forEach((comment) => sortReplies(comment.replies));

        return rootComments;
    }, [comments]);

    const handleSubmitComment = useCallback(async () => {
        if (!newCommentForm.validate()) return;

        setIsSubmitting(true);
        try {
            await createComment(newCommentForm.getFormData());
            newCommentForm.reset();
        } catch (error) {
            console.error("Помилка створення коментаря:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [createComment, newCommentForm]);

    const handleSubmitReply = useCallback(async () => {
        if (!replyCommentForm.validate()) return;

        setIsSubmitting(true);
        try {
            await createComment(replyCommentForm.getFormData());
            replyCommentForm.reset();
            setReplyingToId(null);
        } catch (error) {
            console.error("Помилка створення відповіді:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [createComment, replyCommentForm]);

    const handleEditComment = useCallback(
        async (commentId: number) => {
            if (!editCommentForm.validate()) return;

            setIsSubmitting(true);
            try {
                await updateComment(commentId, editCommentForm.getUpdateData());
                setEditingId(null);
                editCommentForm.reset();
            } catch (error) {
                console.error("Помилка редагування коментаря:", error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [updateComment, editCommentForm],
    );

    const handleDeleteComment = useCallback(
        async (commentId: number) => {
            if (!confirm("Ви впевнені, що хочете видалити коментар?")) return;

            try {
                await deleteComment(commentId);
            } catch (error) {
                console.error("Помилка видалення коментаря:", error);
            }
        },
        [deleteComment],
    );

    const handleReaction = useCallback(
        async (commentId: number, reaction: ReactionType) => {
            try {
                await setReaction(commentId, reaction);
            } catch (error) {
                console.error("Помилка реакції:", error);
            }
        },
        [setReaction],
    );

    const startEdit = useCallback(
        (comment: IComment) => {
            setEditingId(comment.id);
            editCommentForm.setContent(comment.content);
        },
        [editCommentForm],
    );

    const cancelEdit = useCallback(() => {
        setEditingId(null);
        editCommentForm.reset();
    }, [editCommentForm]);

    const startReply = useCallback(
        (commentId: number) => {
            setReplyingToId(commentId);
            replyCommentForm.reset();
            replyCommentForm.startReply(commentId);
        },
        [replyCommentForm],
    );

    const cancelReply = useCallback(() => {
        setReplyingToId(null);
        replyCommentForm.reset();
    }, [replyCommentForm]);

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
                    <Textarea
                        value={newCommentForm.content}
                        onChange={(e) =>
                            newCommentForm.setContent(e.target.value)
                        }
                        placeholder="Написати коментар..."
                        error={newCommentForm.errors.content}
                        rows={3}
                    />

                    <div className="mt-3 flex gap-2">
                        <Button
                            onClick={handleSubmitComment}
                            disabled={
                                isSubmitting || !newCommentForm.content.trim()
                            }
                        >
                            {isSubmitting ? <SpinnerIcon /> : "Опублікувати"}
                        </Button>
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
                {nestedComments.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-gray-medium">
                            Коментарів поки немає
                        </p>
                    </div>
                ) : (
                    nestedComments.map((comment) => (
                        <CommentThread
                            key={comment.id}
                            comment={comment}
                            depth={0}
                            isLoggedIn={isLoggedIn}
                            editingId={editingId}
                            replyingToId={replyingToId}
                            isSubmitting={isSubmitting}
                            editCommentForm={editCommentForm}
                            replyCommentForm={replyCommentForm}
                            onStartEdit={startEdit}
                            onCancelEdit={cancelEdit}
                            onSaveEdit={handleEditComment}
                            onDelete={handleDeleteComment}
                            onReaction={handleReaction}
                            onStartReply={startReply}
                            onCancelReply={cancelReply}
                            onSubmitReply={handleSubmitReply}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

interface CommentThreadProps {
    comment: CommentWithReplies;
    depth: number;
    isLoggedIn: boolean;
    editingId: number | null;
    replyingToId: number | null;
    isSubmitting: boolean;
    editCommentForm: any;
    replyCommentForm: any;
    onStartEdit: (comment: IComment) => void;
    onCancelEdit: () => void;
    onSaveEdit: (commentId: number) => void;
    onDelete: (commentId: number) => void;
    onReaction: (commentId: number, reaction: ReactionType) => void;
    onStartReply: (commentId: number) => void;
    onCancelReply: () => void;
    onSubmitReply: () => void;
}

const CommentThread: React.FC<CommentThreadProps> = React.memo(
    ({
        comment,
        depth,
        isLoggedIn,
        editingId,
        replyingToId,
        isSubmitting,
        editCommentForm,
        replyCommentForm,
        onStartEdit,
        onCancelEdit,
        onSaveEdit,
        onDelete,
        onReaction,
        onStartReply,
        onCancelReply,
        onSubmitReply,
    }) => {
        const maxDepth = 5;
        const marginLeft = Math.min(depth, maxDepth) * 40;

        return (
            <div className="space-y-3">
                <div
                    className="rounded-lg border bg-white p-4"
                    style={{ marginLeft: `${marginLeft}px` }}
                >
                    <div className="mb-3 flex items-start justify-between">
                        <div>
                            <span className="font-medium text-gray-dark">
                                {comment.user.firstName} {comment.user.lastName}
                            </span>
                            <span className="ml-2 text-sm text-gray-medium">
                                {formatCommentDate(comment.creationTime)}
                                {comment.edited && " (відредаговано)"}
                            </span>
                        </div>

                        {isLoggedIn && (
                            <div className="flex gap-1">
                                <Button
                                    size="sm"
                                    onClick={() => onStartReply(comment.id)}
                                >
                                    Відповісти
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => onStartEdit(comment)}
                                >
                                    <PenIcon />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => onDelete(comment.id)}
                                >
                                    <XMarkIcon />
                                </Button>
                            </div>
                        )}
                    </div>

                    {editingId === comment.id ? (
                        <div className="space-y-3">
                            <Textarea
                                value={editCommentForm.content}
                                onChange={(e) =>
                                    editCommentForm.setContent(e.target.value)
                                }
                                error={editCommentForm.errors.content}
                                rows={3}
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => onSaveEdit(comment.id)}
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
                                    onClick={onCancelEdit}
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
                                onClick={() => onReaction(comment.id, "like")}
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
                                    onReaction(comment.id, "dislike")
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

                    {replyingToId === comment.id && (
                        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
                            <Textarea
                                value={replyCommentForm.content}
                                onChange={(e) =>
                                    replyCommentForm.setContent(e.target.value)
                                }
                                placeholder="Написати відповідь..."
                                error={replyCommentForm.errors.content}
                                rows={2}
                            />
                            <div className="mt-2 flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={onSubmitReply}
                                    disabled={
                                        isSubmitting ||
                                        !replyCommentForm.content.trim()
                                    }
                                >
                                    {isSubmitting ? (
                                        <SpinnerIcon />
                                    ) : (
                                        "Відповісти"
                                    )}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={onCancelReply}
                                >
                                    Скасувати
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {comment.replies.map((reply) => (
                    <CommentThread
                        key={reply.id}
                        comment={reply}
                        depth={depth + 1}
                        isLoggedIn={isLoggedIn}
                        editingId={editingId}
                        replyingToId={replyingToId}
                        isSubmitting={isSubmitting}
                        editCommentForm={editCommentForm}
                        replyCommentForm={replyCommentForm}
                        onStartEdit={onStartEdit}
                        onCancelEdit={onCancelEdit}
                        onSaveEdit={onSaveEdit}
                        onDelete={onDelete}
                        onReaction={onReaction}
                        onStartReply={onStartReply}
                        onCancelReply={onCancelReply}
                        onSubmitReply={onSubmitReply}
                    />
                ))}
            </div>
        );
    },
);

CommentThread.displayName = "CommentThread";

export default CommentsNested;
