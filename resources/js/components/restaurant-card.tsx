import { AddVisitEngagementDrawer } from '@/components/add-visit-engagement-drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { EngagementType } from '@/types/enums';
import { EngagedRestaurant, Restaurant } from '@/types/resources';
import { Link, router } from '@inertiajs/react';
import { BookmarkIcon, CheckIcon, HeartIcon, ImageOffIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type RestaurantCardProps = {
    restaurant: EngagedRestaurant | Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
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
        <>
            <Card className="gap-0 overflow-hidden p-0">
                <Link href={route('restaurants.show', restaurant.id)}>
                    <Carousel>
                        <CarouselContent>
                            {restaurant.images.map((image, imageIdx) => (
                                <CarouselItem key={imageIdx}>
                                    <img alt={restaurant.name} className="h-40 w-full object-cover" src={image.preview_url} loading={imageIdx > 0 ? "lazy" : "eager"} />
                                </CarouselItem>
                            ))}
                            {restaurant.images.length === 0 && (
                                <CarouselItem>
                                    <div className="bg-accent flex h-40 w-full items-center justify-center">
                                        <ImageOffIcon className="text-muted-foreground size-12" />
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                    </Carousel>
                </Link>
                <CardContent className="px-3 py-3">
                    <TextHeading>{restaurant.name}</TextHeading>
                    <TextParagraph variant="muted">{restaurant.address}</TextParagraph>
                    {'bookmarked' in restaurant && 'visited' in restaurant && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <Button
                                size="sm"
                                variant={restaurant.visited ? 'outline' : 'default'}
                                onClick={() => (restaurant.visited ? removeVisit() : setAddVisitDrawerOpen(true))}
                            >
                                {restaurant.visited ? <CheckIcon /> : <HeartIcon />}
                                Ben ik geweest
                            </Button>

                            <Button
                                size="sm"
                                variant={restaurant.bookmarked ? 'outline' : 'secondary'}
                                onClick={() => (restaurant.bookmarked ? removeBookmark() : addBookmark())}
                            >
                                {restaurant.bookmarked ? <CheckIcon /> : <BookmarkIcon />}
                                Wil ik naar toe
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
            <AddVisitEngagementDrawer restaurant={restaurant} open={addVisitDrawerOpen} onOpenChange={setAddVisitDrawerOpen} />
        </>
    );
}
