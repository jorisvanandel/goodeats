import { RestaurantCard } from '@/components/restaurant-card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextParagraph } from '@/components/ui/text';
import { UserCard } from '@/components/user-card';
import { AuthenticatedLayout, AuthenticatedLayoutContent } from '@/layouts/authenticated-layout';
import { PaginatedCollection } from '@/types/pagination';
import { Restaurant, User } from '@/types/resources';
import { Deferred, router } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRoute } from 'ziggy-js';

type SearchPageProps = {
    restaurants: PaginatedCollection<Restaurant> | undefined;
    users: PaginatedCollection<User> | undefined;
};

export default function SearchPage({ restaurants, users }: SearchPageProps) {
    const route = useRoute();

    const [searchQuery, setSearchQuery] = useState<string>(route().params.query ?? '');
    const [loading, setLoading] = useState<boolean>(false);

    type SearchResultsType = 'users' | 'restaurants';

    const [searchResultsType, setSearchResultsType] = useState<SearchResultsType>((route().params.tab as SearchResultsType) ?? 'restaurants');

    const reloadSearchResults = useDebouncedCallback(() => {
        router.reload({
            only: [searchResultsType],
            data: { query: searchQuery },
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    }, 250);

    function onSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchQuery(value);
        reloadSearchResults();
    }

    function handleTabValueChange(type: SearchResultsType) {
        setSearchResultsType(type);

        router.get(
            window.location.href,
            { tab: type, query: undefined },
            {
                preserveState: true,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    }

    return (
        <AuthenticatedLayout title="Zoeken">
            <AuthenticatedLayoutContent>
                <div className="relative">
                    <SearchIcon className="text-muted-foreground absolute inset-y-0 ml-3 size-5.5 h-full" />
                    <Input value={searchQuery} onChange={onSearchQueryChange} className="pl-11" placeholder="Zoeken..." />
                </div>
                <Tabs
                    onValueChange={(value) => handleTabValueChange(value as SearchResultsType)}
                    value={searchResultsType}
                    className="mt-5"
                    defaultValue="restaurants"
                >
                    <TabsList className="w-full">
                        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                        <TabsTrigger value="users">Gebruikers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="restaurants">
                        <div className="mt-5 grid gap-4">
                            <Deferred
                                fallback={
                                    <>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <Skeleton key={idx} className="h-32" />
                                        ))}
                                    </>
                                }
                                data="restaurants"
                            >
                                <>
                                    {loading && (
                                        <>
                                            {Array.from({ length: 10 }, (_, idx) => (
                                                <Skeleton key={idx} className="h-32" />
                                            ))}
                                        </>
                                    )}
                                    {restaurants?.data.length === 0 && <TextParagraph>Geen resultaten gevonden.</TextParagraph>}
                                    <>{restaurants?.data.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</>
                                </>
                            </Deferred>
                        </div>
                    </TabsContent>
                    <TabsContent value="users">
                        <div className="mt-5 grid gap-4">
                            <Deferred
                                fallback={
                                    <>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <Skeleton key={idx} className="h-16" />
                                        ))}
                                    </>
                                }
                                data="users"
                            >
                                <>
                                    {loading && (
                                        <>
                                            {Array.from({ length: 10 }, (_, idx) => (
                                                <Skeleton key={idx} className="h-16" />
                                            ))}
                                        </>
                                    )}
                                    {users?.data.length === 0 ? (
                                        <TextParagraph>Geen resultaten gevonden.</TextParagraph>
                                    ) : (
                                        <div className="divide-divide divide-y">
                                            {users?.data.map((user) => <UserCard key={user.id} user={user} />)}
                                        </div>
                                    )}
                                </>
                            </Deferred>
                        </div>
                    </TabsContent>
                </Tabs>
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
