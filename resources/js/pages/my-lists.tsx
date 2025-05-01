import { RestaurantCard } from '@/components/restaurant-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextParagraph } from '@/components/ui/text';
import { AuthenticatedLayout, AuthenticatedLayoutContent, AuthenticatedLayoutTitle } from '@/layouts/authenticated-layout';
import { PaginatedCollection } from '@/types/pagination';
import { Restaurant } from '@/types/resources';
import { Deferred } from '@inertiajs/react';

type EngagementsPageProps = {
    visits: PaginatedCollection<Restaurant>;
    bookmarks: PaginatedCollection<Restaurant>;
};

export default function EngagementsPage({ visits, bookmarks }: EngagementsPageProps) {
    return (
        <AuthenticatedLayout title="Mijn lijsten">
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutTitle>Mijn lijsten</AuthenticatedLayoutTitle>

                <Tabs className="mt-5" defaultValue="visits">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="visits">Ben ik geweest</TabsTrigger>
                        <TabsTrigger value="bookmarks">Wil ik heen</TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-4 px-3" value="visits">
                        <div className="grid gap-4">
                            <Deferred
                                fallback={
                                    <>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <Skeleton key={idx} className="h-32" />
                                        ))}
                                    </>
                                }
                                data="visits"
                            >
                                <>
                                    {visits?.data.map((restaurant, restaurantIdx) => <RestaurantCard key={restaurantIdx} restaurant={restaurant} />)}
                                    {visits?.data.length === 0 && (
                                        <TextParagraph className="mx-auto max-w-sm text-center" variant="muted">
                                            Deze lijst is nog leeg!
                                        </TextParagraph>
                                    )}
                                </>
                            </Deferred>
                        </div>
                    </TabsContent>
                    <TabsContent className="mt-4 px-3" value="bookmarks">
                        <div className="grid gap-4">
                            <Deferred
                                fallback={
                                    <>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <Skeleton key={idx} className="h-32" />
                                        ))}
                                    </>
                                }
                                data="bookmarks"
                            >
                                <>
                                    {bookmarks?.data.map((restaurant, restaurantIdx) => (
                                        <RestaurantCard key={restaurantIdx} restaurant={restaurant} />
                                    ))}
                                    {bookmarks?.data.length === 0 && (
                                        <TextParagraph className="mx-auto max-w-sm text-center" variant="muted">
                                            Deze lijst is nog leeg!
                                        </TextParagraph>
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
