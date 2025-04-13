export interface Model {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Restaurant extends Model {
    name: string;
    city: 'amsterdam' | 'utrecht'; // @TODO: Improve typing here
    address: string;
}

export interface User extends Model {
    name: string;
    email: string;
    username: string;
}
