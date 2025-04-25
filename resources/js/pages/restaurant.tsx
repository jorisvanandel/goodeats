import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { AuthenticatedLayout, AuthenticatedLayoutBackButton } from '@/layouts/authenticated-layout';
import { EngagementType } from '@/types/enums';
import { Restaurant } from '@/types/resources';
import { router } from '@inertiajs/react';
import { BookmarkIcon, CheckIcon, HeartIcon, StarIcon } from 'lucide-react';
import { toast } from 'sonner';

type RestaurantPageProps = {
    restaurant: Restaurant;
    visited: boolean;
    bookmarked: boolean;
};

export default function RestaurantPage({ restaurant, visited, bookmarked }: RestaurantPageProps) {
    function addEngagement(type: EngagementType) {
        router.post(
            route('engagements.store', { restaurant_id: restaurant.id, type: type }),
            {},
            {
                onSuccess: () => toast('Je voorkeur voor dit restaurant is aangepast.'),
            },
        );
    }

    function removeEngagement(type: EngagementType) {
        router.delete(route('engagements.destroy', { restaurant_id: restaurant.id, type: type }), {
            onSuccess: () => toast('Je voorkeur voor dit restaurant is aangepast.'),
        });
    }

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
                <div className="border-border grid gap-y-2 border-t p-2">
                    <Button
                        variant={visited ? 'outline' : 'default'}
                        onClick={() => (visited ? removeEngagement(EngagementType.Visit) : addEngagement(EngagementType.Visit))}
                    >
                        {visited ? <CheckIcon /> : <HeartIcon />}
                        Ben ik geweest
                    </Button>

                    <Button
                        variant={bookmarked ? 'outline' : 'secondary'}
                        onClick={() => (bookmarked ? removeEngagement(EngagementType.Bookmark) : addEngagement(EngagementType.Bookmark))}
                    >
                        {bookmarked ? <CheckIcon /> : <BookmarkIcon />}
                        Wil ik naar toe
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
