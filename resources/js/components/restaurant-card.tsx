import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { EngagedRestaurant, Restaurant } from '@/types/resources';
import { Link, router } from '@inertiajs/react';
import { BookmarkIcon, CheckIcon, HeartIcon, ImageOffIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EngagementType } from '@/types/enums';
import { toast } from 'sonner';

type RestaurantCardProps = {
    restaurant: EngagedRestaurant | Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    function addEngagement(type: EngagementType) {
        router.post(
            route('engagements.store', { restaurant_id: restaurant.id, type: type }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => toast.success('Je voorkeur voor dit restaurant is aangepast.'),
            },
        );
    }

    function removeEngagement(type: EngagementType) {
        router.delete(route('engagements.destroy', { restaurant_id: restaurant.id, type: type }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => toast.success('Je voorkeur voor dit restaurant is aangepast.'),
        });
    }

    return (
        <Card className="gap-0 overflow-hidden p-0">
            <Link href={route('restaurants.show', restaurant.id)}>
                <Carousel>
                    <CarouselContent>
                        {restaurant.images.map((image, imageIdx) => (
                            <CarouselItem key={imageIdx}>
                                <img alt={restaurant.name} className="h-40 w-full object-cover" src={image.preview_url} />
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
            <CardContent className="py-3 px-3">
                <TextHeading>{restaurant.name}</TextHeading>
                <TextParagraph variant="muted">{restaurant.address}</TextParagraph>
                {'bookmarked' in restaurant && 'visited' in restaurant && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button
                            size="sm"
                            variant={restaurant.visited ? 'outline' : 'default'}
                            onClick={() => (restaurant.visited ? removeEngagement(EngagementType.Visit) : addEngagement(EngagementType.Visit))}
                        >
                            {restaurant.visited ? <CheckIcon /> : <HeartIcon />}
                            Ben ik geweest
                        </Button>

                        <Button
                            size="sm"
                            variant={restaurant.bookmarked ? 'outline' : 'secondary'}
                            onClick={() => (restaurant.bookmarked ? removeEngagement(EngagementType.Bookmark) : addEngagement(EngagementType.Bookmark))}
                        >
                            {restaurant.bookmarked ? <CheckIcon /> : <BookmarkIcon />}
                            Wil ik naar toe
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
