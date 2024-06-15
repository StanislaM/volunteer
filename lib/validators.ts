import {
    missionStatuses,
    regions,
    TMissionStatuses,
    TRegions,
} from "@/shared/staticData";
import {
    IGetVolunteerRoleData,
    INewMissionData,
    IRegisterData,
} from "@/shared/types";

export const validateRegisterFormData = (data: IRegisterData) => {
    const errors: Partial<IRegisterData> = {};

    if (/\d/.test(data.firstName) || data.firstName.length < 3) {
        errors.firstName = "Неправильне ім'я";
    }

    if (/\d/.test(data.lastName) || data.lastName.length < 3) {
        errors.lastName = "Неправильне прізвище";
    }

    if (
        !data.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
        errors.email = "Неправильна пошта";
    }

    if (regions.indexOf(data.region as TRegions) === -1) {
        errors.region = "Неправильний регіон";
    }

    const validatePassword = (pass: string) => {
        return (
            /[A-Z]/.test(pass) &&
            /[a-z]/.test(pass) &&
            /[0-9]/.test(pass) &&
            pass.length > 8
        );
    };

    if (!validatePassword(data.password)) {
        errors.password =
            "Пароль має бути завдовжки не менше 8 символів, використовуючи хоча б одну велику літеру, маленьку літеру та цифру";
    }

    if (data.password !== data.repeatPassword) {
        errors.repeatPassword = "Паролі не співпадають";
    }

    return errors;
};

export const validateVolunteerRequestFormData = (
    data: IGetVolunteerRoleData,
) => {
    const errors: Partial<IGetVolunteerRoleData> = {};

    if (data.organizationName.length < 3) {
        errors.organizationName = "Неправильна назва";
    }

    return errors;
};

export const validateNewMissionFormData = (data: INewMissionData) => {
    const errors: Partial<INewMissionData> = {};

    if (data.name.length < 6) {
        errors.name = "Назва занадто коротка";
    }

    if (data.description.length < 16) {
        errors.description = "Опис занадто короткий";
    }

    if (data.location.length < 3) {
        errors.location = "Неправильне місце";
    }

    if (missionStatuses.indexOf(data.status as TMissionStatuses) === -1) {
        errors.status = "Неправильний статус";
    }

    return errors;
};
