import { City } from '@/types/enums';

export interface Model {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Media {
    full_url: string;
    preview_url: string;
}

export interface Restaurant extends Model {
    name: string;
    city: City;
    address: string;
    images: Media[];
}

export interface User extends Model {
    name: string | null;
    email: string;
    username: string;
    avatar: Media | null;
}
