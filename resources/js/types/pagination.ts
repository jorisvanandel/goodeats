export interface PaginationLinks {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
}

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedCollection<Type> {
    data: Type[];
    links: PaginationLinks;
    meta: PaginationMeta;
}
