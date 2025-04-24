import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { AuthenticatedLayout } from '@/layouts/authenticated-layout';
import { EngagementType } from '@/types/enums';
import { Restaurant } from '@/types/resources';
import { router } from '@inertiajs/react';
import { BookmarkIcon, HeartIcon, StarIcon } from 'lucide-react';
import { toast } from 'sonner';

type RestaurantPageProps = {
    restaurant: Restaurant;
    liked: boolean;
    favorited: boolean;
    bookmarked: boolean;
};

export default function RestaurantPage({ restaurant, liked, favorited, bookmarked }: RestaurantPageProps) {
    function addEngagement(type: EngagementType) {
        router.post(
            route('engagements.store', { restaurant_id: restaurant.id, type: type }),
            {},
            {
                onSuccess: () => toast('Je ervaring met dit restaurant is opgeslagen.'),
            },
        );
    }

    function removeEngagement(type: EngagementType) {
        router.delete(route('engagements.destroy', { restaurant_id: restaurant.id, type: type }), {
            onSuccess: () => toast('Je ervaring met dit restaurant is opgeslagen.'),
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="flex h-full flex-col">
                <div className="relative flex-grow overflow-y-scroll">
                    {/*<Button variant="outline" className="absolute top-5 right-5 z-10 size-10 rounded-full">*/}
                    {/*    <ShareIcon />*/}
                    {/*</Button>*/}
                    <Carousel>
                        <CarouselContent>
                            {restaurant.images.map((image, imageIdx) => (
                                <CarouselItem key={imageIdx}>
                                    <img alt={restaurant.name} className="h-60 w-full object-cover" src={image.full_url} />
                                </CarouselItem>
                            ))}
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
                <div className="border-border flex gap-x-2 border-t p-2">
                    <Button
                        className="flex-grow"
                        variant={liked ? 'destructive' : 'default'}
                        onClick={() => (liked ? removeEngagement(EngagementType.Like) : addEngagement(EngagementType.Like))}
                    >
                        <HeartIcon />
                        {liked ? 'Verwijder like' : 'Dit was leuk'}
                    </Button>

                    <Button
                        className=""
                        variant={favorited ? 'secondary' : 'outline'}
                        onClick={() => (favorited ? removeEngagement(EngagementType.Favorite) : addEngagement(EngagementType.Favorite))}
                    >
                        <StarIcon />
                        {favorited ? 'Verwijder favoriet' : 'Dit was top'}
                    </Button>

                    <Button
                        className=""
                        variant={bookmarked ? 'secondary' : 'outline'}
                        onClick={() => (bookmarked ? removeEngagement(EngagementType.Bookmark) : addEngagement(EngagementType.Bookmark))}
                    >
                        <BookmarkIcon />
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
