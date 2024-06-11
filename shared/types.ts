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
