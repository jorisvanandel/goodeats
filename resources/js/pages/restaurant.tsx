import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { BookmarkIcon, HeartIcon, LinkIcon, ShareIcon } from 'lucide-react';
import { Restaurant } from '@/types/resources';

type RestaurantPageProps = {
    restaurant: Restaurant;
}

export default function RestaurantPage({ restaurant }: RestaurantPageProps) {
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
                    <div className="space-y-4 p-4">
                        <div className="flex items-center justify-between">
                            <TextHeading size="xl">{restaurant.name}</TextHeading>
                            <Button size="sm" variant="outline">
                                <LinkIcon />
                                Bekijk website
                            </Button>
                        </div>
                        <div>
                            <TextHeading>Locatie</TextHeading>
                            <TextParagraph>{restaurant.address}</TextParagraph>
                            <Skeleton className="mt-2 h-32" />
                        </div>
                        <div className="mt-5">
                            <TextHeading size="sm">Wat je vrienden er van vinden</TextHeading>
                            <ul className="mt-3 grid gap-2">
                                <li className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <TextParagraph>Sophie de Ruiter wilt hier heen</TextParagraph>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <TextParagraph>Kees van der Sprek vond dit fantastisch</TextParagraph>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <TextParagraph>Joris van Andel is hier geweest</TextParagraph>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <TextParagraph>Kevin vand er Gugten wilt hier heen.</TextParagraph>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-border grid grid-cols-2 gap-3 border-t p-2">
                    <Button variant="secondary">
                        <BookmarkIcon />
                        Hier wil ik heen
                    </Button>
                    <Button>
                        <HeartIcon />
                        Dit was top
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
