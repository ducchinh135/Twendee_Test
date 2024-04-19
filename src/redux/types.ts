export type Name = {
    title: string;
    first: string;
    last: string;
};

export type Picture = {
    thumbnail: string;
};

export type Login = {
    username: string;
};

export type User = {
    name: Name;
    login: Login;
    picture: Picture;
};

export type RandomUserResponse = {
    results: User[];
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
};
