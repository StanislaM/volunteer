import { useMemo } from "react";
import { IPoll } from "@/shared/types";

export const usePollStatistics = (poll: IPoll) => {
    return useMemo(() => {
        const totalVotes = poll.responded.reduce(
            (sum, count) => sum + count,
            0,
        );

        const statistics = poll.questions.map((question, index) => {
            const votes = poll.responded[index];
            const percentage =
                totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

            return {
                question,
                votes,
                percentage,
                index,
            };
        });

        const sortedStatistics = [...statistics].sort(
            (a, b) => b.votes - a.votes,
        );

        const mostPopular = sortedStatistics[0];
        const leastPopular = sortedStatistics[sortedStatistics.length - 1];

        return {
            totalVotes,
            statistics,
            sortedStatistics,
            mostPopular,
            leastPopular,
            averageVotesPerOption: totalVotes / poll.questions.length,
            participationRate: totalVotes > 0 ? 100 : 0,
        };
    }, [poll]);
};
