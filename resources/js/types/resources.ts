import { City, EngagementType } from '@/types/enums';

export interface Model {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Restaurant extends Model {
    name: string;
    city: City;
    address: string;
    engagements?: {
        [EngagementType.Like]: boolean;
        [EngagementType.Favorite]: boolean;
        [EngagementType.Bookmark]: boolean;
    }
}

export interface User extends Model {
    name: string;
    email: string;
    username: string;
}
