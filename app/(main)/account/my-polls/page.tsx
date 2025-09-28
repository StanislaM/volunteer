"use client";

import React from "react";
import { useRouter } from "next/navigation";
import H from "@/components/ui/H";
import Button from "@/components/ui/Button";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import BarChartIcon from "@/components/icons/BarChartIcon";
import PenIcon from "@/components/icons/PenIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import { useMyPolls } from "@/hooks/useMyPolls";
import { usePollStatistics } from "@/hooks/usePollStatistics";
import { IPollWithEvent } from "@/hooks/useMyPolls";

const MyPollsPageOptimized = () => {
    const router = useRouter();
    const { polls, isLoading, error, deletePoll, getPercentage } = useMyPolls();

    const handleDeletePoll = async (eventId: number) => {
        if (!confirm("Ви впевнені, що хочете видалити це опитування?")) return;
        await deletePoll(eventId);
    };

    const navigateToEvent = (eventId: number) => {
        router.push(`/mission/${eventId}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
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
            <H type="h2" className="mb-8 text-center">
                Мої опитування
            </H>

            {error && (
                <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    {error}
                </div>
            )}

            {polls.length === 0 && !error && (
                <EmptyPollsState
                    onCreateEvent={() => router.push("/account/create-mission")}
                />
            )}

            {polls.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {polls.map((poll) => (
                        <PollCard
                            key={poll.id}
                            poll={poll}
                            onNavigate={() => navigateToEvent(poll.event.id)}
                            onDelete={() => handleDeletePoll(poll.event.id)}
                            formatDate={formatDate}
                            getPercentage={getPercentage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface EmptyPollsStateProps {
    onCreateEvent: () => void;
}

const EmptyPollsState: React.FC<EmptyPollsStateProps> = ({ onCreateEvent }) => (
    <div className="py-12 text-center">
        <BarChartIcon size={64} className="mx-auto mb-4 text-gray-400" />
        <H type="h3" className="mb-4 text-gray-500">
            У вас поки немає опитувань
        </H>
        <p className="mb-6 text-gray-400">
            Створіть подію та додайте до неї опитування для збору думок
            учасників
        </p>
        <Button onClick={onCreateEvent}>Створити нову подію</Button>
    </div>
);

interface PollCardProps {
    poll: IPollWithEvent;
    onNavigate: () => void;
    onDelete: () => void;
    formatDate: (date: string) => string;
    getPercentage: (votes: number, total: number) => number;
}

const PollCard: React.FC<PollCardProps> = React.memo(
    ({ poll, onNavigate, onDelete, formatDate, getPercentage }) => {
        const pollStats = usePollStatistics(poll);

        return (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="mb-1 text-lg font-semibold text-gray-dark">
                            {poll.title}
                        </h3>
                        <p className="text-sm text-gray-medium">
                            {poll.event.name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {formatDate(poll.event.date)}
                        </p>
                    </div>

                    <div className="ml-2 flex gap-1">
                        <Button
                            size="sm"
                            onClick={onNavigate}
                            title="Перейти до події"
                        >
                            <PenIcon />
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={onDelete}
                            title="Видалити опитування"
                        >
                            <XMarkIcon />
                        </Button>
                    </div>
                </div>

                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">
                                Всього голосів:
                            </span>
                            <div className="font-semibold text-gray-dark">
                                {pollStats.totalVotes}
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-500">Варіантів:</span>
                            <div className="font-semibold text-gray-dark">
                                {poll.questions.length}
                            </div>
                        </div>
                    </div>

                    {pollStats.mostPopular && pollStats.totalVotes > 0 && (
                        <div className="mt-3 border-t border-gray-200 pt-3">
                            <span className="text-xs text-gray-500">
                                Лідирує:
                            </span>
                            <div className="truncate text-sm font-medium text-gray-dark">
                                {pollStats.mostPopular.question}
                            </div>
                            <div className="text-xs text-gray-500">
                                {pollStats.mostPopular.votes} голосів (
                                {pollStats.mostPopular.percentage}%)
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4 space-y-2">
                    {pollStats.sortedStatistics.slice(0, 3).map((stat) => (
                        <div key={stat.index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="truncate pr-2 font-medium">
                                    {stat.question.length > 20
                                        ? `${stat.question.slice(0, 20)}...`
                                        : stat.question}
                                </span>
                                <span className="flex-shrink-0 text-gray-500">
                                    {stat.percentage}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-1.5 rounded-full bg-blue-500 transition-all"
                                    style={{ width: `${stat.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="text-xs text-gray-500">
                        {pollStats.averageVotesPerOption > 0 && (
                            <span>
                                ~{Math.round(pollStats.averageVotesPerOption)}{" "}
                                середнє
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`rounded-full px-2 py-1 text-xs ${
                                poll.event.status === "Активно"
                                    ? "bg-green-100 text-green-800"
                                    : poll.event.status === "Завершено"
                                      ? "bg-gray-100 text-gray-600"
                                      : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                            {poll.event.status}
                        </span>
                        {poll.edited && (
                            <span className="text-xs text-gray-400">
                                (ред.)
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

PollCard.displayName = "PollCard";

export default MyPollsPageOptimized;
