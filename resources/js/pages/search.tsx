import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Link } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { Restaurant } from '@/types/resources';
import { PaginatedCollection } from '@/types/pagination';
import { router } from '@inertiajs/react'
import { useRoute } from 'ziggy-js';
import { useDebouncedCallback } from 'use-debounce';
import { Deferred } from '@inertiajs/react';
import { RestaurantCard } from '@/components/restaurant-card';

type SearchPageProps = {
    restaurants: PaginatedCollection<Restaurant>;
}
export default function SearchPage({ restaurants }: SearchPageProps) {
    const route = useRoute();

    const [searchQuery, setSearchQuery] = useState<string>(route().params.query ?? '');
    const [loading, setLoading] = useState<boolean>(false);

    const reloadRestaurants = useDebouncedCallback(() => {
        router.reload({
            only: ['restaurants'],
            data: { query: searchQuery },
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false)
        });
    }, 250);

    function onSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchQuery(value);
        reloadRestaurants();
    }

    return (
        <AuthenticatedLayout>
            <div className="relative">
                <SearchIcon className="text-muted-foreground absolute inset-y-0 ml-3 size-5.5 h-full" />
                <Input value={searchQuery} onChange={onSearchQueryChange} className="pl-11" placeholder="Zoek hier naar je favoriete restaurant..." />
            </div>
            <div className="mt-5 grid gap-y-3">
                <Deferred fallback={
                    <>
                        {Array.from({ length: 10 }, (_, idx) => <Skeleton key={idx} className="h-32" />)}
                    </>
                } data="restaurants">
                    <>
                        { loading && (
                            <>
                                {Array.from({ length: 10 }, (_, idx) => <Skeleton key={idx} className="h-32" />)}
                            </>
                        )}
                        {restaurants?.data.length === 0 && (
                            <TextParagraph>Geen resultaten gevonden.</TextParagraph>
                        )}
                        <>
                            {restaurants?.data.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                            ))}
                        </>
                    </>
                </Deferred>
            </div>
        </AuthenticatedLayout>
    );
}
