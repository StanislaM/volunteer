import { TMissionStatuses } from "./staticData";

export interface IMissionCard {
    id: string;
    title: string;
    descr: string;
    host: {
        name: string;
        img: string;
    };
    info: {
        location: string;
        date: string;
        participants: number;
    };
}

export interface ICategoryCard {
    id: string;
    icon: string;
    name: string;
    url: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IAccountInfo {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    region: string;
    password: string;
    repeatPassword: string;
}

export interface IGetVolunteerRoleData {
    organizationName: string;
    isSolo: boolean;
    activities: number[];
}

export interface IVolunteerData {
    isSolo: boolean;
    organizationName: string;
    validated: boolean;
    activities: number[];
}

export interface INewMissionData {
    name: string;
    description: string;
    status: string;
    location: string;
    date: string;
    activities: number[];
}

export interface IMissionFullInfo {
    name: string;
    description: string;
    date: string;
    location: string;
    participantsCount: number;
    status: string;
    activities: {
        id: number;
        name: string;
    }[];
    volunteer: {
        organizationName: string;
    };
}
