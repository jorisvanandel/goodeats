import { AddVisitEngagementDrawer } from '@/components/add-visit-engagement-drawer';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { AuthenticatedLayout, AuthenticatedLayoutBackButton } from '@/layouts/authenticated-layout';
import { EngagementType } from '@/types/enums';
import { Restaurant } from '@/types/resources';
import { router } from '@inertiajs/react';
import { BookmarkIcon, CheckIcon, HeartIcon, ImageOffIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type RestaurantPageProps = {
    restaurant: Restaurant;
    visited: boolean;
    bookmarked: boolean;
};

export default function RestaurantPage({ restaurant, visited, bookmarked }: RestaurantPageProps) {
    function addBookmark() {
        router.post(
            route('engagements.store', { restaurant_id: restaurant.id, type: EngagementType.Bookmark }),
            {},
            {
                onSuccess: () => toast('Je hebt aangegeven dat je hier nog heen wilt.'),
            },
        );
    }

    function removeBookmark() {
        router.delete(route('engagements.destroy', { restaurant_id: restaurant.id, type: EngagementType.Bookmark }), {
            onSuccess: () => toast('Je hebt aangegeven dat je hier niet meer heen wilt.'),
        });
    }

    function removeVisit() {
        router.delete(route('engagements.destroy', { restaurant_id: restaurant.id, type: EngagementType.Visit }), {
            onSuccess: () => toast('Je hebt aangegeven dat je hier niet meer heen wilt.'),
        });
    }

    const [addVisitDrawerOpen, setAddVisitDrawerOpen] = useState<boolean>(false);

    return (
        <AuthenticatedLayout>
            <AuthenticatedLayoutBackButton />
            <div className="flex h-full flex-col">
                <div className="relative flex-grow overflow-y-scroll">
                    {/*<Button variant="outline" className="absolute top-5 right-5 z-10 size-10 rounded-full">*/}
                    {/*    <ShareIcon />*/}
                    {/*</Button>*/}
                    <Carousel>
                        <CarouselContent>
                            {restaurant.images.map((image, imageIdx) => (
                                <CarouselItem key={imageIdx}>
                                    <img alt={restaurant.name} className="h-60 w-full object-cover" src={image.full_url} loading="lazy" />
                                </CarouselItem>
                            ))}
                            {restaurant.images.length === 0 && (
                                <CarouselItem>
                                    <div className="bg-accent flex h-60 w-full items-center justify-center">
                                        <ImageOffIcon className="text-muted-foreground size-12" />
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                    </Carousel>
                    <div className="p-4">
                        <div>
                            <TextHeading size="xl">{restaurant.name}</TextHeading>
                            {/*<Button className="mt-2" size="sm" variant="outline">*/}
                            {/*    <LinkIcon />*/}
                            {/*    Bekijk website*/}
                            {/*</Button>*/}
                        </div>
                        <div className="mt-6">
                            <TextHeading>Locatie</TextHeading>
                            <TextParagraph variant="muted">{restaurant.address}</TextParagraph>
                        </div>
                    </div>
                </div>
                <div className="border-border grid gap-y-2 border-t p-2">
                    <Button variant={visited ? 'outline' : 'default'} onClick={() => (visited ? removeVisit() : setAddVisitDrawerOpen(true))}>
                        {visited ? <CheckIcon /> : <HeartIcon />}
                        Ben ik geweest
                    </Button>

                    <Button
                        disabled={visited}
                        variant={bookmarked ? 'outline' : 'secondary'}
                        onClick={() => (bookmarked ? removeBookmark() : addBookmark())}
                    >
                        {bookmarked ? <CheckIcon /> : <BookmarkIcon />}
                        Wil ik naar toe
                    </Button>
                </div>
            </div>

            <AddVisitEngagementDrawer open={addVisitDrawerOpen} onOpenChange={setAddVisitDrawerOpen} restaurant={restaurant} />
        </AuthenticatedLayout>
    );
}
