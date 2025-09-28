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
