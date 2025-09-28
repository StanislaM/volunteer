import { useState } from "react";
import { ICreatePollData } from "@/shared/types";

const validatePollData = (data: ICreatePollData) => {
    const errors: Record<string, string> = {};

    if (data.title.length < 3 || data.title.length > 255) {
        errors.title = "Заголовок повинен містити від 3 до 255 символів";
    }

    if (data.questions.length < 2 || data.questions.length > 10) {
        errors.questions = "Повинно бути від 2 до 10 варіантів відповідей";
    }

    for (let i = 0; i < data.questions.length; i++) {
        if (data.questions[i].length < 3 || data.questions[i].length > 255) {
            errors.questions = `Варіант ${i + 1} повинен містити від 3 до 255 символів`;
            break;
        }
    }

    const uniqueQuestions = new Set(data.questions);
    if (uniqueQuestions.size !== data.questions.length) {
        errors.questions = "Варіанти відповідей повинні бути унікальними";
    }

    return errors;
};

export const usePollForm = (initialData?: Partial<ICreatePollData>) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [questions, setQuestions] = useState<string[]>(
        initialData?.questions || ["", ""],
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const data: ICreatePollData = { title, questions };
        const validationErrors = validatePollData(data);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const reset = () => {
        setTitle("");
        setQuestions(["", ""]);
        setErrors({});
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

    const getFormData = (): ICreatePollData => ({
        title,
        questions: questions.filter((q) => q.trim() !== ""),
    });

    return {
        title,
        setTitle,
        questions,
        setQuestions,
        errors,
        validate,
        reset,
        addQuestion,
        removeQuestion,
        updateQuestion,
        getFormData,
    };
};
