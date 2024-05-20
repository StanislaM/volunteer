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
