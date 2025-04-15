import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { HeartIcon, ShareIcon, TrashIcon } from 'lucide-react';
import { Restaurant } from '@/types/resources';
import { router } from '@inertiajs/react'
import { toast } from 'sonner';

type RestaurantPageProps = {
    restaurant: Restaurant;
    liked: boolean;
}

export default function RestaurantPage({ restaurant, liked }: RestaurantPageProps) {
    function addLike() {
        router.post(route('likes.store', { restaurant_id: restaurant.id }), {}, {
            onSuccess: () => toast('Je hebt dit restaurant aan je lijst toegevoegd!')
        })
    }

    function removeLike() {
        router.delete(route('likes.destroy', { restaurant_id: restaurant.id }), {
            onSuccess: () => toast('Je hebt dit restaurant van je lijst gehaald.')
        })
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
                                        src="https://scontent.frtm1-1.fna.fbcdn.net/v/t39.30808-6/484913549_1184638113663160_3905320551823377024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XTis-n9_ZuIQ7kNvwHxe6Mm&_nc_oc=AdmELph6ElgUIKYfOYqbWQG1YnNlGnMUAYNRiH14a50vUw8TY0c66DPXbaRn-4HtItY&_nc_zt=23&_nc_ht=scontent.frtm1-1.fna&_nc_gid=iPPFqUGy_iQAIgCjk7Emxw&oh=00_AfHUC-dJiosnUF4mbxsY-0SyfivzEtk7QXj6zSu6VcNA5A&oe=67FED828"
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
                <div className="border-border border-t p-2">
                    {liked ? (
                        <Button className="w-full" variant="destructive" onClick={removeLike}>
                            <TrashIcon />
                            Verwijder dit restaurant van mijn lijst
                        </Button>
                    ) : (
                        <Button className="w-full" onClick={addLike}>
                            <HeartIcon />
                            Voeg dit restaurant toe aan mijn lijst
                        </Button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
