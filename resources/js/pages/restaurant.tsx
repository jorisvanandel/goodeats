import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { EngagementType } from '@/types/enums';
import { Restaurant } from '@/types/resources';
import { router } from '@inertiajs/react';
import { BookmarkIcon, HeartIcon, ShareIcon, StarIcon } from 'lucide-react';
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
        <AuthenticatedLayout isPadded={false} showBackButton>
            <div className="flex h-full flex-col">
                <div className="relative flex-grow overflow-y-scroll">
                    <Button variant="outline" className="absolute top-5 right-5 z-10 size-10 rounded-full">
                        <ShareIcon />
                    </Button>
                    <Carousel>
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <img
                                        alt={restaurant.name}
                                        className="h-60 w-full object-cover"
                                        src="https://scontent.frtm1-1.fna.fbcdn.net/v/t39.30808-6/484913549_1184638113663160_3905320551823377024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=VTeinwe61q4Q7kNvwEtKVS7&_nc_oc=Adm3sfc3oM8h679l3E3Q_0Dz4S93--4LUXeidaWDkkNqH-HOxUJsEmbEPOvOoRHB7Iw&_nc_zt=23&_nc_ht=scontent.frtm1-1.fna&_nc_gid=8-ILENm5bEkecj2vFFV91w&oh=00_AfFR0q4M1MSDAHfudI9AfvWNzmHKWsfjGHbhW09BPml_YQ&oe=680EE268"
                                    />
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
