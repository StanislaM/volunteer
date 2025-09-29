"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ICreatePollData, IUpdatePollData } from "@/shared/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import PenIcon from "@/components/icons/PenIcon";
import ConfirmIcon from "@/components/icons/ConfirmIcon";
import { usePoll } from "@/hooks/usePoll";

interface Props {
    eventId: string;
    eventOwnerId: number;
}

const Poll: React.FC<Props> = ({ eventId, eventOwnerId }) => {
    const { volunteer } = useSelector((state: RootState) => state.user);
    const { poll, isLoading, createPoll, updatePoll, deletePoll, vote } =
        usePoll(eventId);

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<string[]>(["", ""]);
    const [titleError, setTitleError] = useState("");
    const [questionsError, setQuestionsError] = useState("");

    const canManagePoll = volunteer?.id === eventOwnerId;

    useEffect(() => {
        if (poll) {
            setIsCreating(false);
            setIsEditing(false);
        }
    }, [poll]);

    const clearErrors = () => {
        setTitleError("");
        setQuestionsError("");
    };

    const validateForm = (): boolean => {
        clearErrors();
        let isValid = true;

        if (title.length < 3 || title.length > 255) {
            setTitleError("Заголовок повинен містити від 3 до 255 символів");
            isValid = false;
        }

        if (questions.length < 2 || questions.length > 10) {
            setQuestionsError("Повинно бути від 2 до 10 варіантів відповідей");
            isValid = false;
        }

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].length < 3 || questions[i].length > 255) {
                setQuestionsError(
                    `Варіант ${i + 1} повинен містити від 3 до 255 символів`,
                );
                isValid = false;
                break;
            }
        }

        const uniqueQuestions = new Set(questions);
        if (uniqueQuestions.size !== questions.length) {
            setQuestionsError("Варіанти відповідей повинні бути унікальними");
            isValid = false;
        }

        return isValid;
    };

    const handleCreatePoll = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const pollData: ICreatePollData = { title, questions };
            await createPoll(pollData);
            resetForm();
            setIsCreating(false);
        } catch (error) {
            console.error("Помилка створення опитування:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdatePoll = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const pollData: IUpdatePollData = { title, questions };
            await updatePoll(pollData);
            resetForm();
            setIsEditing(false);
        } catch (error) {
            console.error("Помилка оновлення опитування:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePoll = async () => {
        if (!confirm("Ви впевнені, що хочете видалити опитування?")) return;

        try {
            await deletePoll();
        } catch (error) {
            console.error("Помилка видалення опитування:", error);
        }
    };

    const handleVote = async (optionIndex: number) => {
        setIsVoting(true);
        try {
            await vote(optionIndex);
        } catch (error) {
            console.error("Помилка голосування:", error);
        } finally {
            setIsVoting(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setQuestions(["", ""]);
        clearErrors();
    };

    const startCreating = () => {
        resetForm();
        setIsCreating(true);
    };

    const startEditing = () => {
        if (poll) {
            setTitle(poll.title);
            setQuestions([...poll.questions]);
            setIsEditing(true);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        resetForm();
    };

    const cancelCreating = () => {
        setIsCreating(false);
        resetForm();
    };

    const addQuestion = () => {
        if (questions.length < 10) {
            setQuestions([...questions, ""]);
        }
    };

    const removeQuestion = (index: number) => {
        if (questions.length > 2) {
            setQuestions(questions.filter((_, i) => i !== index));
        }
    };

    const updateQuestion = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const getTotalVotes = () => {
        return poll?.responded.reduce((sum, count) => sum + count, 0) || 0;
    };

    const getPercentage = (votes: number) => {
        const total = getTotalVotes();
        return total > 0 ? Math.round((votes / total) * 100) : 0;
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
                    Опитування
                </h3>
                {canManagePoll && poll && !isEditing && (
                    <div className="flex gap-2">
                        <Button size="sm" onClick={startEditing}>
                            <PenIcon />
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={handleDeletePoll}
                        >
                            <XMarkIcon />
                        </Button>
                    </div>
                )}
            </div>

            {!poll && !isCreating && canManagePoll && (
                <div className="py-8 text-center">
                    <p className="mb-4 text-gray-medium">
                        Опитування не створено
                    </p>
                    <Button onClick={startCreating}>Створити опитування</Button>
                </div>
            )}

            {!poll && !isCreating && !canManagePoll && (
                <div className="py-8 text-center">
                    <p className="text-gray-medium">Опитування не створено</p>
                </div>
            )}

            {(isCreating || isEditing) && (
                <div className="space-y-4">
                    <div>
                        <Label>Заголовок опитування</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введіть заголовок опитування"
                            error={titleError}
                        />
                    </div>

                    <div>
                        <Label>Варіанти відповідей</Label>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-2 flex gap-2">
                                <Input
                                    value={question}
                                    onChange={(e) =>
                                        updateQuestion(index, e.target.value)
                                    }
                                    placeholder={`Варіант ${index + 1}`}
                                />
                                {questions.length > 2 && (
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => removeQuestion(index)}
                                    >
                                        <XMarkIcon />
                                    </Button>
                                )}
                            </div>
                        ))}
                        {questionsError && (
                            <p className="mt-1 text-sm text-red-500">
                                {questionsError}
                            </p>
                        )}

                        {questions.length < 10 && (
                            <Button
                                size="sm"
                                onClick={addQuestion}
                                className="mt-2"
                            >
                                <PlusIcon />
                                Додати варіант
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={
                                isEditing ? handleUpdatePoll : handleCreatePoll
                            }
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <SpinnerIcon /> : <ConfirmIcon />}
                            {isEditing ? "Зберегти" : "Створити"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={isEditing ? cancelEditing : cancelCreating}
                            disabled={isSubmitting}
                        >
                            Скасувати
                        </Button>
                    </div>
                </div>
            )}

            {poll && !isEditing && (
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-dark">
                        {poll.title}
                        {poll.edited && (
                            <span className="ml-2 text-sm text-gray-medium">
                                (відредаговано)
                            </span>
                        )}
                    </h4>

                    <div className="space-y-3">
                        {poll.questions.map((question, index) => {
                            const votes = poll.responded[index];
                            const percentage = getPercentage(votes);
                            const isUserVote = poll.vote === index;

                            return (
                                <div
                                    key={index}
                                    className={`relative cursor-pointer rounded-lg border-2 p-3 transition-colors ${
                                        isUserVote
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() =>
                                        !isVoting && handleVote(index)
                                    }
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-medium">
                                            {question}
                                        </span>
                                        <span className="text-sm text-gray-medium">
                                            {votes} голосів ({percentage}%)
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-2 rounded-full transition-all ${
                                                isUserVote
                                                    ? "bg-blue-500"
                                                    : "bg-gray-400"
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center text-sm text-gray-medium">
                        Всього голосів: {getTotalVotes()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Poll;
